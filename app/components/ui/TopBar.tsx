import React from "react";

export default function TopBar() {
    return (
        <div className="bg-white-Card-background border border-gray-Card-background p-2.5 m-2.5 rounded-xl flex flex-col gap-2.5">
            <div>
                <h1 className="font-bold text-sm text-gray-Heading-text">
                    Welcome back Kapten Zoom
                </h1>
                <p className="text-xs font-normal text-gray-Body-text">
                    Good work keep it going!
                </p>
            </div>
            <div className="flex gap-2.5 justify-center">
                <div className="bg-gray-Page-background border border-gray-Card-background rounded-lg text-center p-2.5 flex-1">
                    <h2 className="font-extrabold text-blue-Primary-button text-base">
                        12
                    </h2>
                    <p className="font-normal text-xs text-gray-Body-text">
                        Completed
                    </p>
                </div>
                <div className="bg-gray-Page-background border border-gray-Card-background rounded-lg text-center p-2.5 flex-1">
                    <h2 className="font-extrabold text-blue-Primary-button text-base">
                        87%
                    </h2>
                    <p className="font-normal text-xs text-gray-Body-text whitespace-nowrap">
                        Average Score
                    </p>
                </div>
                <div className="bg-gray-Page-background border border-gray-Card-background rounded-lg text-center p-2.5 flex-1">
                    <h2 className="font-extrabold text-blue-Primary-button text-base">
                        32
                    </h2>
                    <p className="font-normal text-xs text-gray-Body-text">
                        Streak
                    </p>
                </div>
                <div className="bg-gray-Page-background border border-gray-Card-background rounded-lg text-center p-2.5 flex-1">
                    <h2 className="font-extrabold text-blue-Primary-button text-base">
                        1
                    </h2>
                    <p className="font-normal text-xs text-gray-Body-text">
                        Place
                    </p>
                </div>
            </div>
        </div>
    );
}
