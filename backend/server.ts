import dotenv from "dotenv";
dotenv.config();
import { prisma } from "./lib/prisma";
import { clerkClient, requireAuth, getAuth, clerkMiddleware } from '@clerk/express'



import express from "express";
import cors from "cors";
import { Signin } from "./services/auth.service";
const app = express();

app.use(cors());
app.use(express.json());

app.use(clerkMiddleware())
app.get('/protected', requireAuth(), async (req, res) => {
  // Use `getAuth()` to get the user's `userId`
  const { userId } = getAuth(req)

  // Use Clerk's JS Backend SDK to get the user's User object
  const user = await clerkClient.users.getUser(userId as string)

  return res.json({ user })
})


const result = await prisma.user.findMany();
console.log(result);

app.get("/", (req, res) => {
    res.send("register now!");
});

app.post("/api/user", Signin);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
