CREATE TABLE IF NOT EXISTS "blog_categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_categories_description" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" serial NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar(150) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blog_categories_title" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_id" serial NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blog_articles" ADD COLUMN "category_id" integer;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_category_id_idx" ON "blog_articles" ("category_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_articles" ADD CONSTRAINT "blog_articles_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_description" ADD CONSTRAINT "blog_categories_description_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_description" ADD CONSTRAINT "blog_categories_description_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_title" ADD CONSTRAINT "blog_categories_title_category_id_blog_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "blog_categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "blog_categories_title" ADD CONSTRAINT "blog_categories_title_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
