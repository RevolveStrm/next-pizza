import { prisma } from "../../../prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    console.log(data);

    const user = await prisma.user.create({
        data
    });

    return NextResponse.json({ user });
}