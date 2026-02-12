import { Settings, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function SettingsBar() {
    return (
        <div className="app-container flex-row justify-between">
            <div className="flex-1 text-center font-bold text-2xl">V-Quiz</div>
            {/* Denna kan vi inkludera när det finns user stats */}
            {/* <div className='flex items-center'>
        <BarChart3 />
        </div> */}
            <div className="flex items-center">
                <Link href="/user">
                    <Settings />
                </Link>
            </div>
        </div>
    );
}
