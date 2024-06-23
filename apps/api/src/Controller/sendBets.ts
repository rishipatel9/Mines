import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const sendBets = async (req: Request, res: Response) => {
    const { myCookie } = req.cookies;

    if (!myCookie) return res.status(401).json({ message: "user unauthorized" });

    try {
        const user = await prisma.user.findUnique({
            where: {
                name: myCookie
            },
            select: {
                id: true
            }
        });
        if (!user) return res.status(404).json({ message: "user not found" });

        const games = await prisma.game.findMany({
            where: {
                userId: user.id,
            },
        });

        console.log(games);
        return res.status(200).json({ games });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
