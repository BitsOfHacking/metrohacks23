import { Button } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import SpeechRecognition from "react-speech-recognition";
import Dictaphone from "@/components/Dictaphone";

interface RecordTabProps {
    showVideo: boolean
}
export default function Recorder({ showVideo }: RecordTabProps) {
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

        <>
            <Button className={"w-48 text-xl h-12 mt-8"} color="danger" variant="shadow" onClick={startRecordingProcess}>
                {status === "recording" ? "End Meeting" : "Start Meeting"}
            </Button>
            <Dictaphone mediaBlobUrl={mediaBlobUrl} startTime={startTime} status={status} clearBlobUrl={clearBlobUrl} videoRef={videoRef} audioRef={audioRef}/>

        </>
    )

        // <section className="flex flex-col items-center w-3/4 h-full p-10 border-solid border-2 border-gray-800 rounded gap-4">
        //     <h2 className="text-[28px]">Record</h2>
        //     <div className="flex flex-col gap-4">
        //         {
        //             showVideo ? (
        //                 // Video Mode
        //                 status === "recording" ?
        //                 (
        //                     <>
        //                         <VideoPreview stream={previewStream} />
        //                         <Button onClick={stopRecordingProcess}>Stop Recording</Button>
        //                     </>
        //                 ) : (
        //                     <>
        //                         <video ref={videoRef} src={mediaBlobUrl || undefined} width={500} height={500} controls />
        //                         <Button color="danger" variant="faded" onClick={startRecordingProcess}>Start Recording</Button>
        //                     </>
        //                 )
        //             ) : (
        //                 // Audio Mode
        //                   status === "recording" ?
        //                 (
        //                     <>
        //                         <audio src={mediaBlobUrl || undefined} controls />
        //                         <Button onClick={stopRecordingProcess}>Stop Recording</Button>
        //                     </>
        //                 ) : (
        //                     <>
        //                         <audio ref={audioRef} src={mediaBlobUrl || undefined} controls />
        //                         <Button variant="faded" color="danger" onClick={startRecordingProcess}>Start Recording</Button>
        //                     </>
        //                 )
        //             )
        //
        //         }

        {/*    </div>*/}
        {/*</section>*/}

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