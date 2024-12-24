import { pgEnum } from "drizzle-orm/pg-core"

export const difficultyEnum = pgEnum("difficultyEnum", ["Easy", "Medium", "Hard"]);
