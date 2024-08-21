import { NextResponse } from 'next/server';
import { prisma } from 'prisma/db';
import { getSessionUser } from 'shared/lib/get-session-user';

export async function GET() {
    try {
        const sessionUser = await getSessionUser();

        if (!sessionUser) {
            return NextResponse.json(
                { error: 'You are not authorized' },
                { status: 401 },
            );
        }

        const user = await prisma.user.findFirst({
            where: {
                id: Number(sessionUser.id),
            },
            select: {
                email: true,
                fullName: true,
                password: false,
            },
        });

        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: 'Server Error [USER_GET]' },
            { status: 500 },
        );
    }
}
