CREATE TABLE "ContestQuestions" (
	"id" serial PRIMARY KEY NOT NULL,
	"contest_id" integer NOT NULL,
	"question_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ContestRegistrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"contest_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Contests" ADD COLUMN "start_time" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "Contests" ADD COLUMN "end_time" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "Contests" ADD COLUMN "created_by" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "ContestQuestions" ADD CONSTRAINT "ContestQuestions_contest_id_Contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."Contests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ContestQuestions" ADD CONSTRAINT "ContestQuestions_question_id_Questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."Questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ContestRegistrations" ADD CONSTRAINT "ContestRegistrations_user_id_Users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ContestRegistrations" ADD CONSTRAINT "ContestRegistrations_contest_id_Contests_id_fk" FOREIGN KEY ("contest_id") REFERENCES "public"."Contests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Contests" ADD CONSTRAINT "Contests_created_by_Users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."Users"("id") ON DELETE cascade ON UPDATE no action;