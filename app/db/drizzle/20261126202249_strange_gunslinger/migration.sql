CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"eventName" varchar(255) NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "webhooks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"client_id" uuid NOT NULL,
	"webhookUrl" text NOT NULL UNIQUE,
	"enabled" boolean DEFAULT true NOT NULL,
	"eventsSubscribed" uuid[] DEFAULT '{}'::uuid[] NOT NULL,
	"secrect" uuid DEFAULT gen_random_uuid() NOT NULL,
	"description" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "webhooks" ADD CONSTRAINT "webhooks_client_id_clients_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE CASCADE;