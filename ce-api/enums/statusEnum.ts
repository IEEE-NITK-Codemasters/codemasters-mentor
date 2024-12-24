import { pgEnum } from "drizzle-orm/pg-core"

export const statusEnum = pgEnum("statusEnum", ["accepted", "rejected", "time_limit_exceeded", "memory_limit_exceeded", "compile_time_error", "run_time_error"]);