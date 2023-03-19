//API Delete Post
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = client;
  if (req.method === "DELETE") {
    //GET Auth Users Posts
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please Sign" });
    }
    try {
      const postId = req.body;
      const result = await prisma.post.delete({ where: { id: postId } });

      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: `Error has occured whil Deleting a post` });
    }
  }
}
