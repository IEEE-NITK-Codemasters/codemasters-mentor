ALTER TYPE "public"."statusEnum" ADD VALUE 'pending';--> statement-breakpoint
ALTER TABLE "Submissions" ALTER COLUMN "output" DROP NOT NULL;