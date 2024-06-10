DROP INDEX IF EXISTS "core_admin_permissions_group_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_admin_permissions_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_admin_sessions_login_token_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_admin_sessions_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_files_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_files_using_file_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_groups_names_item_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_groups_names_language_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_languages_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_languages_name_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_moderators_permissions_group_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_moderators_permissions_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_nav_parent_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_nav_description_item_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_nav_description_language_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_nav_name_item_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_nav_name_language_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_plugins_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_plugins_name_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_sessions_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_sessions_known_devices_ip_address_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_users_name_seo_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_users_name_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "core_users_email_idx";--> statement-breakpoint
ALTER TABLE "core_users" ADD COLUMN "language" varchar(5) DEFAULT 'en' NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_permissions_group_id_idx" ON "core_admin_permissions" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_permissions_user_id_idx" ON "core_admin_permissions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_sessions_login_token_idx" ON "core_admin_sessions" USING btree ("login_token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_admin_sessions_user_id_idx" ON "core_admin_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_files_user_id_idx" ON "core_files" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_files_using_file_id_idx" ON "core_files_using" USING btree ("file_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_groups_names_item_id_idx" ON "core_groups_names" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_groups_names_language_code_idx" ON "core_groups_names" USING btree ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_languages_code_idx" ON "core_languages" USING btree ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_languages_name_idx" ON "core_languages" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_moderators_permissions_group_id_idx" ON "core_moderators_permissions" USING btree ("group_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_moderators_permissions_user_id_idx" ON "core_moderators_permissions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_parent_id_idx" ON "core_nav" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_description_item_id_idx" ON "core_nav_description" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_description_language_code_idx" ON "core_nav_description" USING btree ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_name_item_id_idx" ON "core_nav_name" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_nav_name_language_code_idx" ON "core_nav_name" USING btree ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_plugins_code_idx" ON "core_plugins" USING btree ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_plugins_name_idx" ON "core_plugins" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_sessions_user_id_idx" ON "core_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_sessions_known_devices_ip_address_idx" ON "core_sessions_known_devices" USING btree ("ip_address");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_users_name_seo_idx" ON "core_users" USING btree ("name_seo");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_users_name_idx" ON "core_users" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_users_email_idx" ON "core_users" USING btree ("email");