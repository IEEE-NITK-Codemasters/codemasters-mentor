// @deno-types="npm:@types/express@4"
import express, { NextFunction, Request, Response } from "npm:express@4.18.2";
import { requestBody } from "./types/run_request_body.ts"
import { createClient } from 'redis'

const redis = createClient()
const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;

// const reqLogger = function (req, _res, next) {
//     console.info(`${req.method} request to "${req.url}" by ${req.hostname}`);
//     next();
// };

await redis.connect();
// app.use(reqLogger);
app.use(express.json());
app.post("/run", async (req, res) => {
    const userId: string = "jflaj";
    let RequestBody: requestBody = req.body;

    RequestBody['userId'] = userId;
    await redis.LPUSH( 'mylist', JSON.stringify(RequestBody) );

    console.log(RequestBody)
    res.status(200).send(userId);
});

// app.get("/users/:id", (req, res) => {
//     const idx = Number(req.params.id);
//     for (const user of demoData.users) {
//         if (user.id === idx) {
//             res.status(200).json(user);
//         }
//     }
//     res.status(400).json({ msg: "User not found" });
// });

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});

//import { db } from "./db/db.ts";
// import {Users} from "./db/schema.ts"

// async function insertUser() {
//     await db.insert(Users).values({
//         name: "Alice Johnson",
//         email: "alice.johnson@example.com",
//         password: "securepassword",
//     });
//     console.log("User inserted successfully!");
// }

// insertUser().catch(console.error);

