//API Add Post
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Please Sign in to make a post" });
    }
    const title: string = req.body.title;
    //get user
    const prismaUser = await client.user.findUnique({
      where: { email: session?.user?.email! },
    });

    //check title
    if (title.length > 300)
      return res.status(403).json({ message: "Please write a shorter post" });
    if (!title.length)
      return res
        .status(403)
        .json({ message: "Please do not leave this empty" });

    //create Post
    try {
      const result = await client.post.create({
        data: {
          title,
          userId: prismaUser?.id!,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: `Error has occured whilst making a post` });
    }
  }
}
