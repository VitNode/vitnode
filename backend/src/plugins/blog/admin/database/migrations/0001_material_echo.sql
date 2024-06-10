DROP INDEX IF EXISTS "blog_articles_author_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_articles_category_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_articles_content_item_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_articles_content_language_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_articles_title_item_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_articles_title_language_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_categories_description_item_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_categories_description_language_code_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_categories_name_item_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "blog_categories_name_language_code_idx";--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_author_id_idx" ON "blog_articles" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_category_id_idx" ON "blog_articles" USING btree ("category_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_content_item_id_idx" ON "blog_articles_content" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_content_language_code_idx" ON "blog_articles_content" USING btree ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_title_item_id_idx" ON "blog_articles_title" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_articles_title_language_code_idx" ON "blog_articles_title" USING btree ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_description_item_id_idx" ON "blog_categories_description" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_description_language_code_idx" ON "blog_categories_description" USING btree ("language_code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_name_item_id_idx" ON "blog_categories_name" USING btree ("item_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "blog_categories_name_language_code_idx" ON "blog_categories_name" USING btree ("language_code");