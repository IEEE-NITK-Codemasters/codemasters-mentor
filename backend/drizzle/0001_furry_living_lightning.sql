CREATE TYPE "public"."statusEnum" AS ENUM('accepted', 'rejected');--> statement-breakpoint
ALTER TABLE "contests" RENAME TO "Contests";--> statement-breakpoint
ALTER TABLE "questions" RENAME TO "Questions";--> statement-breakpoint
ALTER TABLE "submissions" RENAME TO "Submissions";--> statement-breakpoint
ALTER TABLE "users" RENAME TO "Users";--> statement-breakpoint
ALTER TABLE "Submissions" RENAME COLUMN "status" TO "statusEnum";--> statement-breakpoint
ALTER TABLE "Users" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "Questions" DROP CONSTRAINT "questions_contest_id_contests_id_fk";
--> statement-breakpoint
ALTER TABLE "Submissions" DROP CONSTRAINT "submissions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "Submissions" DROP CONSTRAINT "submissions_contest_id_contests_id_fk";
--> statement-breakpoint
ALTER TABLE "Submissions" DROP CONSTRAINT "submissions_ques_id_questions_id_fk";
--> statement-breakpoint
ALTER TABLE "Submissions" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_contest_id_Contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."Contests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_contest_id_Contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."Contests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Submissions" ADD CONSTRAINT "Submissions_ques_id_Questions_id_fk" FOREIGN KEY ("ques_id") REFERENCES "public"."Questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Users" ADD CONSTRAINT "Users_email_unique" UNIQUE("email");