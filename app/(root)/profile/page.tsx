import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "prisma/db";
import { ProfileForm } from "shared/components/shared";
import { getSessionUser } from "shared/lib/get-session-user";

export default async function ProfilePage() {
    const sessionUser = await getSessionUser();

    if (!sessionUser) {
        return redirect("/not-auth");
    }

    const user: User | null = await prisma.user.findFirst({
        where: {
            id: Number(sessionUser.id)
        }
    });

    if (!user) {
        return redirect("/not-auth");
    }

    return <ProfileForm data={user} />
}