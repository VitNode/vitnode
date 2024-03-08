CREATE TABLE IF NOT EXISTS "core_plugins_versions" (
	"id" serial PRIMARY KEY NOT NULL,
	"plugin_id" integer NOT NULL,
	"version" varchar(255) NOT NULL,
	"version_code" integer,
	"updated" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "core_plugins" ADD COLUMN "position" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_plugins_versions_plugin_id_idx" ON "core_plugins_versions" ("plugin_id");