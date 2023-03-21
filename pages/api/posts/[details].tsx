//API  get Post details
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = client;
  if (req.method === "GET") {
    try {
      console.log(req.query);

      const data = await prisma.post.findUnique({
        where: {
          id: req.query.details as string,
        },
        include: {
          user: true,
          Comment: {
            orderBy: { createdAt: "desc" },
            include: {
              user: true,
            },
          },
        },
      });

      res.status(200).json(data);
    } catch (err) {
      res.status(403).json({ err: `Error has occured` });
    }
  }
}
