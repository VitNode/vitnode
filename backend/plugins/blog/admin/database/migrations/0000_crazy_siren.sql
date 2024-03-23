CREATE TABLE IF NOT EXISTS "blog_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer,
	"created" timestamp DEFAULT now() NOT NULL,
	"update" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_articles_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" integer,
	"language_code" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_articles_title" (
	"id" serial PRIMARY KEY NOT NULL,
	"article_id" integer,
	"language_code" varchar NOT NULL,
	"value" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_author_id_idx" ON "blog_articles" ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_content_article_id_idx" ON "blog_articles_content" ("article_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_content_language_code_idx" ON "blog_articles_content" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_title_article_id_idx" ON "blog_articles_title" ("article_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_title_language_code_idx" ON "blog_articles_title" ("language_code");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles" ADD CONSTRAINT "blog_articles_author_id_core_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_content" ADD CONSTRAINT "blog_articles_content_article_id_blog_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "blog_articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_content" ADD CONSTRAINT "blog_articles_content_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_title" ADD CONSTRAINT "blog_articles_title_article_id_blog_articles_id_fk" FOREIGN KEY ("article_id") REFERENCES "blog_articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_title" ADD CONSTRAINT "blog_articles_title_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
