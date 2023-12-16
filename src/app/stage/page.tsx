"use client"

import { Checkbox, Switch } from "@nextui-org/react"
import { useState } from "react";
export default function Stage() {
    return (
        <main className="flex min-h-screen flex-col p-10 gap-4 dark text-foreground bg-background">
            <h1 className="text-[36px] text-center">Your Stage</h1>
            <section className="flex flex-row justify-between gap-10">
                <SettingsTab />
                <section className="flex flex-col items-center p-10 border-solid border-2 border-gray-800">
                    <h2 className="text-[28px]">Stage</h2>
                    <p className="text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus officiis consequatur cupiditate debitis fugit maiores nesciunt dolore, quod a repellendus nam perferendis in quasi iusto tempora. Architecto aspernatur ipsa commodi!</p>
                </section>
            </section>
        </main>
    )
}
/*
Audience
If yes, do chatgpt stuff + show audience UI

Video
*/
function SettingsTab() {
    const [showAudienceSettings, setShowAudienceSettings] = useState(false);

    return (
        <section className="flex flex-col min-w-[35%] gap-5 p-10 border-solid border-2 border-gray-800">
        <h2 className="text-[28px]">Settings</h2>
        <form className="flex flex-col gap-4">
                <h2 className="text-[24px] text-gray-400">Audience</h2>
                <Switch onChange={(e) => setShowAudienceSettings(e.target.checked)}>Show Audience</Switch>
                <label>Audience Asks Questions</label>
                {showAudienceSettings &&
                    <div className="flex flex-col gap-4">
                    <Checkbox defaultSelected size="md">During Presentation</Checkbox>
                    <Checkbox defaultSelected size="md">After Presentation</Checkbox>
                    </div>
                }
                <h2 className="text-[24px] text-gray-400">Video</h2>
                <Switch>Show Video</Switch>
        </form>
        </section>
    )
}