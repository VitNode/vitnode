WITH normalized AS (
	SELECT "id", "email", lower(btrim("email")) AS "normalized" FROM "core_users"
), split AS (
	SELECT
		"id",
		"email",
		"normalized",
		CASE WHEN length("normalized") - length(replace("normalized", '@', '')) = 1
			THEN split_part("normalized", '@', 1) END AS "localPart",
		CASE WHEN length("normalized") - length(replace("normalized", '@', '')) = 1
			THEN split_part("normalized", '@', 2) END AS "domain"
	FROM normalized
), canonical AS (
	SELECT
		"id",
		"email",
		CASE
			WHEN "localPart" IS NULL OR "localPart" = '' OR "domain" = '' OR left("localPart", 1) = '"'
				THEN "normalized"
			WHEN "domain" IN ('gmail.com', 'googlemail.com')
				THEN CASE
					WHEN replace(split_part("localPart", '+', 1), '.', '') = '' THEN "normalized"
					ELSE replace(split_part("localPart", '+', 1), '.', '') || '@gmail.com'
				END
			WHEN "domain" IN (
				'fastmail.com', 'fastmail.fm', 'gmx.com', 'gmx.de', 'gmx.net',
				'icloud.com', 'mac.com', 'me.com', 'pm.me', 'proton.me',
				'protonmail.com', 'yandex.com', 'yandex.ru', 'zoho.com'
			) OR "domain" ~ '^(outlook|hotmail|live|msn)\.[a-z]{2,}(\.[a-z]{2,})?$'
				THEN CASE
					WHEN split_part("localPart", '+', 1) = '' THEN "normalized"
					ELSE split_part("localPart", '+', 1) || '@' || "domain"
				END
			ELSE "normalized"
		END AS "canonical"
	FROM split
)
UPDATE "core_users" AS u SET "email" = c."canonical"
FROM canonical c
WHERE c."id" = u."id"
	AND c."canonical" <> u."email"
	AND NOT EXISTS (
		SELECT 1 FROM "core_users" taken
		WHERE taken."email" = c."canonical" AND taken."id" <> c."id"
	)
	AND NOT EXISTS (
		SELECT 1 FROM canonical rival
		WHERE rival."canonical" = c."canonical" AND rival."id" < c."id"
	);
