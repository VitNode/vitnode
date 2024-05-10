ALTER TABLE "core_groups" ADD COLUMN "files_allow_upload" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "core_groups" ADD COLUMN "files_total_max_storage" integer DEFAULT 500000 NOT NULL;--> statement-breakpoint
ALTER TABLE "core_groups" ADD COLUMN "files_max_storage_for_submit" integer DEFAULT 10000 NOT NULL;