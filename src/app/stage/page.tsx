"use client"

import "regenerator-runtime"
import SettingsTab from "@/components/SettingsTab";
import RecordTab from "@/components/RecordTab";
import { useState } from "react";

export default function StagePage() {
    const [showVideo, setShowVideo] = useState(false);
    return (
        <main className="flex min-h-screen flex-col p-10 gap-4 dark text-foreground bg-background">
            <h1 className="text-[36px] text-center">Stage</h1>
            <section className="flex flex-row gap-10 min-h-full">
                <SettingsTab setShowVideo={setShowVideo} />
                <RecordTab showVideo={showVideo} />
            </section>
        </main>
    )
}