DO $$ BEGIN
 CREATE TYPE "actions" AS ENUM('lock', 'unlock');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_forums" (
	"id" serial PRIMARY KEY NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"parent_id" integer DEFAULT 0 NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"can_all_view" boolean DEFAULT true NOT NULL,
	"can_all_read" boolean DEFAULT true NOT NULL,
	"can_all_create" boolean DEFAULT true NOT NULL,
	"can_all_reply" boolean DEFAULT true NOT NULL,
	"can_all_download_files" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_forums_description" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_forums_name" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_forums_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"forum_id" integer,
	"group_id" integer,
	"can_view" boolean DEFAULT false NOT NULL,
	"can_read" boolean DEFAULT false NOT NULL,
	"can_create" boolean DEFAULT false NOT NULL,
	"can_reply" boolean DEFAULT false NOT NULL,
	"can_download_files" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"topic_id" integer,
	"user_id" integer,
	"ip_address" varchar(45),
	"created" timestamp DEFAULT now() NOT NULL,
	"update" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_posts_content" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer,
	"language_code" varchar NOT NULL,
	"value" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_topics" (
	"id" serial PRIMARY KEY NOT NULL,
	"forum_id" integer NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"ip_address" varchar(45),
	"locked" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_topics_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"ip_address" varchar(45) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL,
	"action" "actions" NOT NULL,
	"topic_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "forum_topics_titles" (
	"id" serial PRIMARY KEY NOT NULL,
	"item_id" integer NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_forums_parent_id_idx" ON "forum_forums" ("parent_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_forums_description_item_id_idx" ON "forum_forums_description" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_forums_description_language_code_idx" ON "forum_forums_description" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_forums_name_item_id_idx" ON "forum_forums_name" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_forums_name_language_code_idx" ON "forum_forums_name" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_forums_permissions_forum_id_idx" ON "forum_forums_permissions" ("forum_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_forums_permissions_group_id_idx" ON "forum_forums_permissions" ("group_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_posts_topic_id_idx" ON "forum_posts" ("topic_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_posts_user_id_idx" ON "forum_posts" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_posts_content_item_id_idx" ON "forum_posts_content" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_posts_content_language_code_idx" ON "forum_posts_content" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_topics_forum_id_idx" ON "forum_topics" ("forum_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_topics_logs_user_id_idx" ON "forum_topics_logs" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_topics_logs_topic_id_idx" ON "forum_topics_logs" ("topic_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_topics_titles_item_id_idx" ON "forum_topics_titles" ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "forum_topics_titles_language_code_idx" ON "forum_topics_titles" ("language_code");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_forums_description" ADD CONSTRAINT "forum_forums_description_item_id_forum_forums_id_fk" FOREIGN KEY ("item_id") REFERENCES "forum_forums"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_forums_description" ADD CONSTRAINT "forum_forums_description_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_forums_name" ADD CONSTRAINT "forum_forums_name_item_id_forum_forums_id_fk" FOREIGN KEY ("item_id") REFERENCES "forum_forums"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_forums_name" ADD CONSTRAINT "forum_forums_name_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_forums_permissions" ADD CONSTRAINT "forum_forums_permissions_forum_id_forum_forums_id_fk" FOREIGN KEY ("forum_id") REFERENCES "forum_forums"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_forums_permissions" ADD CONSTRAINT "forum_forums_permissions_group_id_core_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "core_groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_topic_id_forum_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "forum_topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_posts" ADD CONSTRAINT "forum_posts_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_posts_content" ADD CONSTRAINT "forum_posts_content_item_id_forum_posts_id_fk" FOREIGN KEY ("item_id") REFERENCES "forum_posts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_posts_content" ADD CONSTRAINT "forum_posts_content_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_topics" ADD CONSTRAINT "forum_topics_forum_id_forum_forums_id_fk" FOREIGN KEY ("forum_id") REFERENCES "forum_forums"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_topics_logs" ADD CONSTRAINT "forum_topics_logs_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_topics_logs" ADD CONSTRAINT "forum_topics_logs_topic_id_forum_topics_id_fk" FOREIGN KEY ("topic_id") REFERENCES "forum_topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_topics_titles" ADD CONSTRAINT "forum_topics_titles_item_id_forum_topics_id_fk" FOREIGN KEY ("item_id") REFERENCES "forum_topics"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "forum_topics_titles" ADD CONSTRAINT "forum_topics_titles_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
