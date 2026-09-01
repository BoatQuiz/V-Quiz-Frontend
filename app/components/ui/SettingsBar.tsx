import { Settings, BarChart3 } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function SettingsBar() {
    const cookieStore = await cookies();
    const userCookie =  cookieStore.get("user_identity");

    const isLoggedIn = !!userCookie;
    return (
        <div className="app-container flex-row justify-between">
            <Link href="/" className="flex-1 text-center font-bold text-2xl hover:opacity-70">
                V-Quiz
            </Link>
            {/* Denna kan vi inkludera när det finns user stats */}
            {/* <div className='flex items-center'>
        <BarChart3 />
        </div> */}
            {isLoggedIn && (
                <div className="flex items-center">
                    <Link href="/user">
                        <Settings />
                    </Link>
                </div>
            )}
        </div>
    );
}
