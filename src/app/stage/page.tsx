"use client"

import { Button, Checkbox, Switch } from "@nextui-org/react"
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

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

interface SettingsTabProps {
    setShowVideo: Dispatch<SetStateAction<boolean>>
}
function SettingsTab({ setShowVideo }: SettingsTabProps) {
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
interface RecordTabProps {
    showVideo: boolean
}
function RecordTab({ showVideo }: RecordTabProps) {
    const { status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl } =
        useReactMediaRecorder({
            video: showVideo,
            stopStreamsOnStop: true,
        });
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    
    return (
        <section className="flex flex-col items-center w-3/4 h-full p-10 border-solid border-2 border-gray-800 rounded gap-4">
            <h2 className="text-[28px]">Record</h2>
            <div className="flex flex-col gap-4">
                {
                    showVideo ? (
                        // Video Mode
                        status === "recording" ?
                        (
                            <>
                                <VideoPreview stream={previewStream} /> 
                                <Button onClick={stopRecording}>Stop Recording</Button>
                            </>
                        ) : (
                            <>
                                <video ref={videoRef} src={mediaBlobUrl || undefined} width={500} height={500} controls /> 
                                <Button color="danger" variant="faded" onClick={startRecording}>Start Recording</Button>
                            </>
                        )
                    ) : (
                        // Audio Mode
                          status === "recording" ?
                        (
                            <>
                                <audio src={mediaBlobUrl || undefined} controls /> 
                                <Button onClick={stopRecording}>Stop Recording</Button>
                            </>
                        ) : (
                            <>
                                <audio ref={audioRef} src={mediaBlobUrl || undefined} controls /> 
                                <Button variant="faded" color="danger" onClick={startRecording}>Start Recording</Button>
                            </>
                        )
                    )
                    
                }
                {status === "stopped" && <Button color="danger" onClick={() => {
                    clearBlobUrl();
                    videoRef.current?.load();
                    audioRef.current?.load();
                }}>Reset</Button>}
            </div>
        </section>
    )
}

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
        videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={500} height={500} autoPlay />;
};

// Audio Visualizer Example: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
// const AudioPreview = ({ stream }: { stream: MediaStream | null }) => {
//     const audioRef = useRef<HTMLAudioElement>(null);

//   useEffect(() => {
//     if (audioRef.current && stream) {
//       audioRef.current.srcObject = stream;
//     }
//   }, [stream]);
//   if (!stream) {
//     return null;
//   }
//   return <audio ref={audioRef} autoPlay />;
// }
