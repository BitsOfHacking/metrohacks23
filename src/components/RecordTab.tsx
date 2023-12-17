import { Button } from "@nextui-org/react";
import { RefObject, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { StatusMessages, useReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

interface RecordTabProps {
    showVideo: boolean
}
export default function RecordTab({ showVideo }: RecordTabProps) {
    const { status, startRecording, stopRecording, mediaBlobUrl, previewStream, clearBlobUrl } =
        useReactMediaRecorder({
            video: showVideo,
            stopStreamsOnStop: true,
        });
    const videoRef = useRef<HTMLVideoElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [startTime, setStartTime] = useState(Date.now())

    function startRecordingProcess() {
        startRecording();
        SpeechRecognition.startListening({ continuous: true })
        setStartTime(Date.now())
        
    }
    function stopRecordingProcess() {
        stopRecording();
        SpeechRecognition.stopListening()
    }
    
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
                                <Button onClick={stopRecordingProcess}>Stop Recording</Button>
                            </>
                        ) : (
                            <>
                                <video ref={videoRef} src={mediaBlobUrl || undefined} width={500} height={500} controls /> 
                                <Button color="danger" variant="faded" onClick={startRecordingProcess}>Start Recording</Button>
                            </>
                        )
                    ) : (
                        // Audio Mode
                          status === "recording" ?
                        (
                            <>
                                <audio src={mediaBlobUrl || undefined} controls /> 
                                <Button onClick={stopRecordingProcess}>Stop Recording</Button>
                            </>
                        ) : (
                            <>
                                <audio ref={audioRef} src={mediaBlobUrl || undefined} controls /> 
                                <Button variant="faded" color="danger" onClick={startRecordingProcess}>Start Recording</Button>
                            </>
                        )
                    )
                    
                }
                <Dictaphone startTime={startTime} status={status} clearBlobUrl={clearBlobUrl} videoRef={videoRef} audioRef={audioRef}/>
            </div>
        </section>
    )
}
interface DictaphoneProps {
    status: StatusMessages
    clearBlobUrl: () => void
    videoRef: RefObject<HTMLVideoElement>
    audioRef: RefObject<HTMLAudioElement>
    startTime: number
}
function Dictaphone({status, clearBlobUrl, videoRef, audioRef, startTime}: DictaphoneProps) {
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
    
    async function analyzeTranscript() {
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