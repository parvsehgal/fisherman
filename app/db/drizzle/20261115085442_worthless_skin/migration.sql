CREATE TABLE "clients" (
	"id" uuid,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"passwordHash" varchar(255) NOT NULL
);
--> statement-breakpoint
DROP TABLE "users";