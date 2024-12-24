import { db } from "./db/db.ts"
import { Users } from "./db/schema.ts"
import { Questions } from "./db/schema.ts"
import { user } from "./types/userType.ts"

// const newUser = { name: 'exampleUser', email: 'example@example.com', password: 'securePassword' };
// const insertUser = async (user: user) => {
//     await db.insert(Users).values(user);
// }
// insertUser(newUser);

// const seeUser = async () => {
//     const result = await db
//         .select()
//         .from(Users);
//     console.log(result);
// }
// seeUser();

// const sampleQuestion = {
//     title: "Two Sum",
//     id: 1,
//     difficulty: 'Easy',
//     topics: ["Array", "Hash Table"],
//     description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

// You may assume that each input would have exactly one solution, and you may not use the same element twice.

// Example 1:
// Input: nums = [2,7,11,15], target = 9
// Output: [0,1]
// Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

// Example 2:
// Input: nums = [3,2,4], target = 6
// Output: [1,2]`,
//     testcase: `
//     2
//     4
//     2 7 11 15 9
//     3
//     3 2 4 6
//     `,
//     expected_output: `
//     0 1
//     1 2
//     `
// };

// const insertQuestion = async (sampleQuestion: any) => {
//     await db.insert(Questions).values(sampleQuestion);
// }
// insertQuestion(sampleQuestion);

