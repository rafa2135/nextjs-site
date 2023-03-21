//API post comment
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import client from "../../../prisma/client";
type postprops = {
  title: string;
  postId: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //GET Auth Users Posts
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Please Sign" });
  }
  //Get user
  const prismaUser = await client.user.findUnique({
    where: { email: session.user?.email! },
  });

  if (req.method === "POST") {
    //Add comment
    try {
      const { title, postId }: postprops = req.body.data;

      if (!title.length) {
        return res.status(401).json({ message: "please fill the title" });
      }

      const result = await client.comment.create({
        data: {
          message: title,
          userId: prismaUser?.id,
          postId: postId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: `Error has occured whil Deleting a post` });
    }
  }
}
