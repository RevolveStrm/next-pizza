import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from "prisma/db";
import { compare, hashSync } from "bcrypt";
import { AuthOptions } from "next-auth";
import { UserRole } from "@prisma/client";

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        email: credentials.email
                    }
                });

                if (!findUser || !findUser.verifiedAt) {
                    return null;
                }

                const isPasswordValid = await compare(credentials.password, findUser.password);

                if (!isPasswordValid) {
                    return null;
                }

                return {
                    id: findUser.id,
                    email: findUser.email,
                    name: findUser.fullName,
                    role: findUser.role
                };
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    session: {
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                if (account?.provider === 'credentials') {
                    return true;
                }

                if (!user.email) {
                    return false;
                }

                const findUser = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { provider: account?.provider, providerId: account?.providerAccountId },
                            { email: user.email }
                        ]
                    }
                });

                if (findUser) {
                    await prisma.user.update({
                        where: {
                            email: user.email
                        },
                        data: {
                            provider: account?.provider,
                            providerId: account?.providerAccountId
                        }
                    });

                    return true;
                }

                await prisma.user.create({
                    data: {
                        email: user.email,
                        fullName: profile?.name || `User # ${user.id}`,
                        password: hashSync(user.id.toString(), 10),
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                        role: UserRole.USER
                    }
                });

                return true;
            } catch (error) {
                console.error('[NEXT_AUTH_SIGNIN]', error);

                return false;
            }
        },
        async jwt({ token }) {
            if (!token) {
                return token;
            }

            if (!token.email) {
                return token;
            }

            const findUser = await prisma.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (findUser) {
                token.id = String(findUser.id);
                token.email = findUser.email;
                token.fullName = findUser.fullName;
                token.role = findUser.role;
            }

            return token;
        },
        async session({ session, token, user }) {
            session.user.id = token.id;
            session.user.role = token.role;

            return session;
        },
    }
};