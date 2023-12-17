import { Checkbox, Switch } from "@nextui-org/react";
import { Dispatch, SetStateAction, useState } from "react";

interface SettingsTabProps {
    setShowVideo: Dispatch<SetStateAction<boolean>>
}
export default function SettingsTab({ setShowVideo }: SettingsTabProps) {
    const [showAudienceSettings, setShowAudienceSettings] = useState(false);

    return (
        <section className="flex flex-col w-1/4 h-1/2 gap-5 p-10 border-solid border-2 border-gray-800 rounded">
        <h2 className="text-[28px]">Settings</h2>
        <form className="flex flex-col gap-4">
            <h2 className="text-[24px] text-gray-400">Video</h2>
            <Switch onChange={(e) => setShowVideo(e.target.checked)}>Show Video</Switch>
            <h2 className="text-[24px] text-gray-400">Audience</h2>
            <Switch onChange={(e) => setShowAudienceSettings(e.target.checked)}>Show Audience</Switch>
            <label>Audience Asks Questions</label>
            {showAudienceSettings &&
                <div className="flex flex-col gap-4">
                <Checkbox defaultSelected size="md">During Presentation</Checkbox>
                <Checkbox defaultSelected size="md">After Presentation</Checkbox>
                </div>
            }
        </form>
        </section>
    )
}