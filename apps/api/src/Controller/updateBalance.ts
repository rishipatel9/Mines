import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const updateBalance = async (req: Request, res: Response) => {
  const { myCookie } = req.cookies;
  const { cash } = req.body;
  console.log(cash);
  // console.log("body",req.body);
  if (!myCookie) return res.status(401).json({ message: "User unauthorized" });

  if (isNaN(parseInt(cash))) {
    return res.status(400).json({ message: "Invalid cash amount" });
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        name: myCookie,
      },
      select:{
        id:true,
        cash:true
      }
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let newCashAmount = user.cash - parseInt(cash)
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        cash: newCashAmount,
      },
    });

    return res.status(200).json({balance:updatedUser.cash})

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
