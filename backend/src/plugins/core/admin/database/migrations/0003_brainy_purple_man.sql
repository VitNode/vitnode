ALTER TABLE "core_sessions_known_devices" ALTER COLUMN "ip_address" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "core_sessions" ADD COLUMN "created" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "core_users" ADD COLUMN "ip_address" varchar(255) NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "core_sessions_known_devices_ip_address_idx" ON "core_sessions_known_devices" ("ip_address");