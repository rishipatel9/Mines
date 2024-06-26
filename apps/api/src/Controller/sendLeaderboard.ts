import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const sendLeaderboard = async (req: Request, res: Response) => {
  try {
    const leaderboard = await prisma.game.findMany({
      select: {
        bet: true,
        multiplier: true,
        payout: true,
        createdAt: true,
        user: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        payout: "desc",
      },
    });
    // console.log(leaderboard);

    return res.status(200).json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
