import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const updateBalance = async (req: Request, res: Response) => {
  const { myCookie } = req.cookies;
  const { newCashAmount } = req.body; 

  if (!myCookie) return res.status(401).json({ message: "User unauthorized" });

  try {
    const user = await prisma.user.findUnique({
      where: {
        name: myCookie,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's cash
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id, // Use the user's id to update the user
      },
      data: {
        cash: newCashAmount,
      },
    });

    return res.status(200).json(updatedUser);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
