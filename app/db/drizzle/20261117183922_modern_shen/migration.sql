ALTER TABLE "clients" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "clients" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();