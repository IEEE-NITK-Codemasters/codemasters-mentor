import express from "express";
import cors from 'cors'
import questionRoutes from "./routes/questionRoutes.ts";
import submissionRoutes from "./routes/submissionRoutes.ts";
import authRoutes from "./routes/authRoutes.ts";

const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;


app.use(express.json());
app.use(cors(
    {
        origin: Deno.env.get("FRONTEND_URL") || "http://localhost:5173",
        credentials: true,
    }
))
app.use('/question', questionRoutes)
app.use('/submissions', submissionRoutes)
app.use('/auth',authRoutes)

// app.use(authMiddleware)

app.listen(port, () => {
    console.log(`Listening on ${port} ...`);
});


