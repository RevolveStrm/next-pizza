import { error } from 'console';

import { redirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

import { prisma } from 'prisma/db';

export async function GET(req: NextRequest) {
    try {
        const code: string = req.nextUrl.searchParams?.get('code') || '';

        if (!code) {
            return NextResponse.json(
                { error: 'Invalid code' },
                { status: 400 },
            );
        }

        const verificationCode = await prisma.verificationCode.findFirst({
            where: {
                code,
            },
        });

        if (!verificationCode) {
            return NextResponse.json(
                { error: 'Invalid code' },
                { status: 400 },
            );
        }

        await prisma.user.update({
            where: {
                id: verificationCode.userId,
            },
            data: {
                verifiedAt: new Date(),
            },
        });

        await prisma.verificationCode.delete({
            where: {
                id: verificationCode.id,
            },
        });

        return NextResponse.redirect(new URL('/?verified', req.url));
    } catch (error) {
        console.error('Error [VERIFY_CODE]', error);
        throw error;
    }
}
