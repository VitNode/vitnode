CREATE TABLE IF NOT EXISTS "core_admin_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer,
	"user_id" integer,
	"unrestricted" boolean DEFAULT false NOT NULL,
	"created" integer NOT NULL,
	"updated" integer NOT NULL,
	"protected" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_admin_sessions" (
	"login_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"last_seen" integer NOT NULL,
	"expires" integer NOT NULL,
	"device_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_files" (
	"id" serial PRIMARY KEY NOT NULL,
	"extension" varchar(32) NOT NULL,
	"name" varchar(255) NOT NULL,
	"url" varchar(255) NOT NULL,
	"user_id" integer NOT NULL,
	"created" integer NOT NULL,
	"file_size" integer NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"description" text,
	"module" varchar(255),
	"module_id" varchar(255),
	"mimetype" varchar(255)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_files_avatars" (
	"id" serial PRIMARY KEY NOT NULL,
	"dir_folder" varchar(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"created" integer NOT NULL,
	"file_size" integer NOT NULL,
	"mimetype" varchar(255) NOT NULL,
	"extension" varchar(32) NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"created" integer NOT NULL,
	"updated" integer NOT NULL,
	"protected" boolean DEFAULT false NOT NULL,
	"default" boolean DEFAULT false NOT NULL,
	"root" boolean DEFAULT false NOT NULL,
	"guest" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_groups_names" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_members" (
	"id" serial PRIMARY KEY NOT NULL,
	"joined" integer NOT NULL,
	"posts" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_languages" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(32) NOT NULL,
	"name" varchar(255) NOT NULL,
	"timezone" varchar(255) DEFAULT 'UTC' NOT NULL,
	"protected" boolean DEFAULT false NOT NULL,
	"default" boolean DEFAULT false NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"created" integer NOT NULL,
	CONSTRAINT "core_languages_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_moderators_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"group_id" integer,
	"user_id" integer,
	"unrestricted" boolean DEFAULT false NOT NULL,
	"created" integer NOT NULL,
	"updated" integer NOT NULL,
	"protected" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_nav" (
	"id" serial PRIMARY KEY NOT NULL,
	"href" varchar(255) NOT NULL,
	"external" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"parent_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_nav_description" (
	"id" serial PRIMARY KEY NOT NULL,
	"nav_id" serial NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_nav_name" (
	"id" serial PRIMARY KEY NOT NULL,
	"nav_id" serial NOT NULL,
	"language_code" varchar NOT NULL,
	"value" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_plugins" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(255),
	"version" varchar(255),
	"version_code" integer,
	"enabled" boolean DEFAULT true NOT NULL,
	"created" integer NOT NULL,
	"support_url" varchar(255),
	"protected" boolean DEFAULT false NOT NULL,
	"author" varchar(100) NOT NULL,
	"author_url" varchar(255) NOT NULL,
	"default" boolean DEFAULT false NOT NULL,
	"position" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_plugins_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"plugin_id" integer NOT NULL,
	"version" varchar(255) NOT NULL,
	"version_code" integer,
	"updated" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_sessions" (
	"login_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"last_seen" integer NOT NULL,
	"expires" integer NOT NULL,
	"device_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_sessions_known_devices" (
	"id" serial PRIMARY KEY NOT NULL,
	"ip_address" varchar(255),
	"user_agent" text NOT NULL,
	"uagent_browser" varchar(200) NOT NULL,
	"uagent_version" varchar(100) NOT NULL,
	"uagent_os" varchar(100) NOT NULL,
	"uagent_device_vendor" varchar(200),
	"uagent_device_type" varchar(200),
	"uagent_device_model" varchar(200),
	"last_seen" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_themes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"version" varchar(255),
	"version_code" integer,
	"created" integer NOT NULL,
	"support_url" varchar(255),
	"protected" boolean DEFAULT false NOT NULL,
	"author" varchar(50) NOT NULL,
	"author_url" varchar(255) NOT NULL,
	"default" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "core_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name_seo" varchar(255),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text NOT NULL,
	"joined" integer NOT NULL,
	"posts" integer DEFAULT 0 NOT NULL,
	"newsletter" boolean DEFAULT false NOT NULL,
	"avatar_color" varchar(6) NOT NULL,
	"group_id" integer,
	CONSTRAINT "core_users_name_seo_unique" UNIQUE("name_seo"),
	CONSTRAINT "core_users_name_unique" UNIQUE("name"),
	CONSTRAINT "core_users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_permissions_group_id_idx" ON "core_admin_permissions" ("group_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_permissions_user_id_idx" ON "core_admin_permissions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_sessions_login_token_idx" ON "core_admin_sessions" ("login_token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_sessions_user_id_idx" ON "core_admin_sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_files_user_id_idx" ON "core_files" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_groups_names_group_id_idx" ON "core_groups_names" ("group_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_groups_names_language_code_idx" ON "core_groups_names" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_languages_code_idx" ON "core_languages" ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_languages_name_idx" ON "core_languages" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_moderators_permissions_group_id_idx" ON "core_moderators_permissions" ("group_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_moderators_permissions_user_id_idx" ON "core_moderators_permissions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_parent_id_idx" ON "core_nav" ("parent_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_description_nav_id_idx" ON "core_nav_description" ("nav_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_description_language_code_idx" ON "core_nav_description" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_name_nav_id_idx" ON "core_nav_name" ("nav_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_name_language_code_idx" ON "core_nav_name" ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_plugins_code_idx" ON "core_plugins" ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_plugins_name_idx" ON "core_plugins" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_plugins_versions_plugin_id_idx" ON "core_plugins_versions" ("plugin_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_sessions_user_id_idx" ON "core_sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_users_name_seo_idx" ON "core_users" ("name_seo");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_users_name_idx" ON "core_users" ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_users_email_idx" ON "core_users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_admin_permissions" ADD CONSTRAINT "core_admin_permissions_group_id_core_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "core_groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_admin_permissions" ADD CONSTRAINT "core_admin_permissions_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_admin_sessions" ADD CONSTRAINT "core_admin_sessions_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_admin_sessions" ADD CONSTRAINT "core_admin_sessions_device_id_core_sessions_known_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "core_sessions_known_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_files" ADD CONSTRAINT "core_files_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_files_avatars" ADD CONSTRAINT "core_files_avatars_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_groups_names" ADD CONSTRAINT "core_groups_names_group_id_core_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "core_groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_groups_names" ADD CONSTRAINT "core_groups_names_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_moderators_permissions" ADD CONSTRAINT "core_moderators_permissions_group_id_core_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "core_groups"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_moderators_permissions" ADD CONSTRAINT "core_moderators_permissions_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_nav_description" ADD CONSTRAINT "core_nav_description_nav_id_core_nav_id_fk" FOREIGN KEY ("nav_id") REFERENCES "core_nav"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_nav_description" ADD CONSTRAINT "core_nav_description_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_nav_name" ADD CONSTRAINT "core_nav_name_nav_id_core_nav_id_fk" FOREIGN KEY ("nav_id") REFERENCES "core_nav"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_nav_name" ADD CONSTRAINT "core_nav_name_language_code_core_languages_code_fk" FOREIGN KEY ("language_code") REFERENCES "core_languages"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_sessions" ADD CONSTRAINT "core_sessions_user_id_core_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "core_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_sessions" ADD CONSTRAINT "core_sessions_device_id_core_sessions_known_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "core_sessions_known_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "core_users" ADD CONSTRAINT "core_users_group_id_core_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "core_groups"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
