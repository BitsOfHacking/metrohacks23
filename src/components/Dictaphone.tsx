import {StatusMessages} from "react-media-recorder";
import {RefObject, useEffect, useRef, useState} from "react";
import {useSpeechRecognition} from "react-speech-recognition";
import {Button} from "@nextui-org/react";

interface DictaphoneProps {
    status: StatusMessages
    clearBlobUrl: () => void
    videoRef: RefObject<HTMLVideoElement>
    audioRef: RefObject<HTMLAudioElement>
    startTime: number
    mediaBlobUrl: string | null
}

export default function Dictaphone({status, clearBlobUrl, videoRef, audioRef, startTime, mediaBlobUrl}: DictaphoneProps) {
    const { transcript, resetTranscript, listening } = useSpeechRecognition();
    const data = useRef({});
    const [lastIndex, setLastIndex] = useState(0);

    useEffect(() => {
        if (listening) {
            setLastIndex(transcript.length)
            if (transcript.substring(lastIndex) != "") {
                const timestamp = Date.now() - startTime;
                data.current = {
                    ...data.current,
                    [timestamp]: transcript.substring(lastIndex),
                }
                console.log(data.current)
            }
        }
    }, [listening, transcript, lastIndex, startTime])

    useEffect(() => {
        const periodicQuestions = setInterval(async () =>  {
            if (listening) {
                console.log("Fetching...");
                const res = await fetch("http://localhost:5000/api/ask", {
                    method: "POST",
                    body: JSON.stringify({section: transcript}),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                const resData = await res.json();
                console.log(resData)
            } else {
                console.log("Not listening");
            }
        }, 30000);

        return () => clearInterval(periodicQuestions);
    }, []);

    async function analyzeTranscript() {
        const mediaBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
        console.log(mediaBlob);
        const mediaFile = new File([mediaBlob], 'media.wav', { type: 'audio/wav' });
        const formData = new FormData();
        formData.append("file", mediaFile)
        console.log(formData.values(), formData.keys())
        const res = await fetch("http://localhost:5000/api/uploadfile", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        const resData = await res.json();
        console.log(resData)
        // await uploadTranscript()

    }
    async function uploadTranscript() {
        const res = await fetch("http://localhost:5000/api/uploadtranscript", {
            method: "POST",
            body: JSON.stringify(data.current),
            headers: {
                "Content-Type": "application/json"
            },
        });
        const resData = await res.json();
        console.log(resData)
    }
    return (
        <div>
            {status === "stopped" && <Button fullWidth color="danger" variant="ghost" onClick={() => {
                clearBlobUrl();
                videoRef.current?.load();
                audioRef.current?.load();
                resetTranscript();
                setLastIndex(0);
                data.current = {}
            }}>Reset</Button>}
            <div className="flex flex-col gap-2 pt-5">
                <h3 className="text-[24px] text-center">Transcript</h3>
                {transcript !== "" && <Button variant="shadow" color="primary" onClick={analyzeTranscript}>Analyze</Button>}
                <p className="min-h-[100px]">{transcript}</p>
            </div>

        </div>
    );
};