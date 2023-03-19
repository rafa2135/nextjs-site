//API auth get Post
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = client;
  if (req.method === "GET") {
    //GET Auth Users Posts
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: "Please Sign" });
    }
    try {
      const data = await prisma.user.findUnique({
        where: {
          email: session.user?.email!,
        },
        include: {
          post: {
            orderBy: { createdAt: "desc" },
            include: { Comment: true },
          },
        },
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: `Error has occured whilst making a post` });
    }
  }
}
