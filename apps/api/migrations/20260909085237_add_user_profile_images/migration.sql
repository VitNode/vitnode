ALTER TABLE "core_roles" ADD COLUMN "allowUploadAvatar" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "core_roles" ADD COLUMN "maxAvatarSize" integer DEFAULT 2048 NOT NULL;--> statement-breakpoint
ALTER TABLE "core_roles" ADD COLUMN "allowUploadCover" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "core_roles" ADD COLUMN "maxCoverSize" integer DEFAULT 5120 NOT NULL;--> statement-breakpoint
ALTER TABLE "core_users" ADD COLUMN "avatarId" integer;--> statement-breakpoint
ALTER TABLE "core_users" ADD COLUMN "coverId" integer;--> statement-breakpoint
ALTER TABLE "core_users" ADD CONSTRAINT "core_users_avatarId_core_files_id_fkey" FOREIGN KEY ("avatarId") REFERENCES "core_files"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "core_users" ADD CONSTRAINT "core_users_coverId_core_files_id_fkey" FOREIGN KEY ("coverId") REFERENCES "core_files"("id") ON DELETE SET NULL;