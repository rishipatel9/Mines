import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const updatePayout = async (req: Request, res: Response) => {
  const { myCookie } = req.cookies;
  const { payout } = req.body;
//   console.log(payout);
  if (!myCookie) return res.status(401).json({ message: "User unauthorized" });

  if (isNaN(parseInt(payout))) {
    return res.status(400).json({ message: "Invalid cash amount" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: myCookie,
      },
      select: {
        id: true,
        cash: true,
      },
    });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    const newCashAmount=user.cash+parseInt(payout);
    
    const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          cash: newCashAmount,
        },
      });

      console.log('payout updated sucessFully')
      return res.status(200).json({balance:updatedUser.cash})
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
