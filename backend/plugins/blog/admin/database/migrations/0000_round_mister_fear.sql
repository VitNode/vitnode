CREATE TABLE IF NOT EXISTS "blog_articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"author_id" integer,
	"category_id" integer,
	"created" timestamp DEFAULT now() NOT NULL,
	"update" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(45)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_articles_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer,
	"language_code" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_articles_title" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer,
	"language_code" varchar NOT NULL,
	"value" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"color" varchar(30) DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_categories_description" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer,
	"language_code" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_categories_name" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer,
	"language_code" varchar NOT NULL,
	"value" varchar(100) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles" ADD CONSTRAINT "blog_articles_author_id_core_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles" ADD CONSTRAINT "blog_articles_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_content" ADD CONSTRAINT "blog_articles_content_item_id_blog_articles_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."blog_articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_content" ADD CONSTRAINT "blog_articles_content_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_title" ADD CONSTRAINT "blog_articles_title_item_id_blog_articles_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."blog_articles"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles_title" ADD CONSTRAINT "blog_articles_title_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_description" ADD CONSTRAINT "blog_categories_description_item_id_blog_categories_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_description" ADD CONSTRAINT "blog_categories_description_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_name" ADD CONSTRAINT "blog_categories_name_item_id_blog_categories_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."blog_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_name" ADD CONSTRAINT "blog_categories_name_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "public"."core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_author_id_idx" ON "blog_articles" ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_category_id_idx" ON "blog_articles" ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_content_item_id_idx" ON "blog_articles_content" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_content_language_code_idx" ON "blog_articles_content" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_title_item_id_idx" ON "blog_articles_title" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_title_language_code_idx" ON "blog_articles_title" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_description_item_id_idx" ON "blog_categories_description" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_description_language_code_idx" ON "blog_categories_description" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_name_item_id_idx" ON "blog_categories_name" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_name_language_code_idx" ON "blog_categories_name" ("language_code");