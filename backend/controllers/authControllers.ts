import { and, eq } from "drizzle-orm/expressions";
import { Users } from "../../db/schema.ts";
import { db } from "../db/db.ts";
import { User } from "../types/UserType.ts";
import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { ExistingUser } from "../types/ExistingUser.ts";

// POST /auth/signup
export async function signup(req: Request, res: Response) {
  const newUser: User = req.body;
  try {
    const result = await db
      .select()
      .from(Users)
      .where(
        and(
          eq(Users.email, newUser.email),
        ),
      );

    if (result.length > 0) {
      return res.status(200).json({ msg: "user already exists" });
    }

    await db.insert(Users).values(newUser);
    return res.status(200).json({ msg: "user created ..." });
  } catch (err) {
    console.log(err);
    return res.status(403).json({ msg: "error creating user, try again..." });
  }
}

// POST /auth/signin
export async function signin(req: Request, res: Response) {
  const user = req.body;
      try {
          let existingUser: ExistingUser[] | ExistingUser = await db.select().from(Users).where(and(eq(user.email, Users.email))).limit(1)
          if (!existingUser) {
              return res.status(403).json({ msg: "user does not exist with this email" });
          }
          existingUser = existingUser[0]
  
          if (existingUser.password === user.password) {
              const token = jwt.sign({ userId: user.userId, email: user.email }, Deno.env.get("JWT_SECRET"));
              res.cookie("auth_token", token, {
                  httpOnly: true, // Prevent access via JavaScript
                  sameSite: "none",
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                  secure: true, 
              });
              return res.status(200).json({msg: "login successfull..."})
          }
          else {
              return res.status(403).json({ msg: "invalid password" });
          }
      }
      catch(err) {
          console.log(err)
          return res.status(403).json({ msg: 'error with servers' });
      }
}
