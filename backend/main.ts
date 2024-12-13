import { db } from "./db/db.ts";
import {users} from "./db/schema.ts"

async function insertUser() {
    await db.insert(users).values({
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        password: "securepassword",
    });
    console.log("User inserted successfully!");
}

insertUser().catch(console.error);
