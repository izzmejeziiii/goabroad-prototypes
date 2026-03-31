"use client";

import { useState } from "react";
import VersionOne from "../components/advertise-guide/version-one/version-one";
import VersionTwo from "../components/advertise-guide/version-two/version-two";
import VersionThree from "../components/advertise-guide/version-three/version-three";
import VersionFour from "../components/advertise-guide/version-four/version-four";
import VersionFive from "../components/advertise-guide/version-five/version-five";

export default function AdvertiseGuide() {
    const [activeVersion, setActiveVersion] = useState("version-one");

    const renderVersion = () => {
        switch (activeVersion) {
            case "version-one":
                return <VersionOne />;
            case "version-two":
                return <VersionTwo />;
            case "version-three":
                return <VersionThree />;
            case "version-four":
                return <VersionFour />;
            case "version-five":
                return <VersionFive />;
            default:
                return <VersionOne />;
        }
    };

    return (
        <>
            {renderVersion()}

            <div className="fixed bottom-4 right-4 z-50 bg-white shadow-lg rounded-md overflow-hidden">
                <div className="bg-slate-900 text-white px-10 py-2 font-medium text-sm">
                    Version Selector
                </div>
                <div className="p-2 flex flex-col space-y-1">
                    <button
                        className={`px-3 py-2 text-xs font-bold rounded-md transition-colors ${
                            activeVersion === "version-one"
                                ? "bg-blue-100 text-slate-900"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveVersion("version-one")}
                    >
                        Version 1
                    </button>
                    <button
                        className={`px-3 py-2 text-xs font-bold rounded-md transition-colors ${
                            activeVersion === "version-two"
                                ? "bg-blue-100 text-slate-900"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveVersion("version-two")}
                    >
                        Version 2
                    </button>
                    <button
                        className={`px-3 py-2 text-xs font-bold rounded-md transition-colors ${
                            activeVersion === "version-three"
                                ? "bg-blue-100 text-slate-900"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveVersion("version-three")}
                    >
                        Version 3
                    </button>
                    <button
                        className={`px-3 py-2 text-xs font-bold rounded-md transition-colors ${
                            activeVersion === "version-four"
                                ? "bg-blue-100 text-slate-900"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveVersion("version-four")}
                    >
                        Version 4
                    </button>
                    <button
                        className={`px-3 py-2 text-xs font-bold rounded-md transition-colors ${
                            activeVersion === "version-five"
                                ? "bg-blue-100 text-slate-900"
                                : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setActiveVersion("version-five")}
                    >
                        Version 5
                    </button>
                </div>
            </div>
        </>
    );
}
