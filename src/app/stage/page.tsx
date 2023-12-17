"use client"

import "regenerator-runtime"
import {useRef, useState} from "react";
import {Card} from "@nextui-org/card";
import CubeIcon, {CubeIconColor} from "@/components/CubeIcon";
import ProfileCard from "@/components/ProfileCard";
import Recorder from "@/components/Recorder";

export default function StagePage() {
    const [showVideo, setShowVideo] = useState(false);
    const [questions, setQuestions] = useState([]);

    const people = [
        2,3,4,5,6,7,8,9,10,11,12
    ]


    return (
        <div className="flex max-h-[calc(100vh-64px)] flex-col gap-4 text-foreground">

            <div className="flex">

                <div className="flex-col">
                    <div className="max-h-[calc(100vh-130px)] py-10 px-10 mx-24 grid grid-cols-4 gap-x-3 gap-y-3 grid-rows-3 grid-flow-row">
                        <Card className={"bg-[#e36f6e] w-72 h-52 justify-center"}>
                        <CubeIcon color={CubeIconColor.RED}/>

                        <h1 className={"mx-4 mt-4 text-white font-bold"}>
                            Jerome Mandele
                        </h1>
                    </Card>

                    {people.map(el => (
                        <ProfileCard key={el} name={"David Alkat"} color={CubeIconColor.PURPLE}/>
                    ))}


                </div>

                    <div className={"flex align-middle justify-center text-center"}>


                        <Recorder showVideo={false} setQuestions={setQuestions} />
                    </div>



                </div>

                <div className="h-[calc(100vh-64px)] flex flex-col grow bg-red-300 max-w-[400px] p-5 rounded-lg">
                    <div className={"w-full text-black text-[32px] font-extrabold text-center align-middle"}>
                        Questions
                    </div>
                    <ul className="list-none">
                     {questions.map((q, i) => <li className="text-sm m-4 p-2 bg-white border-solid rounded" key={i}>{q}</li>)}
                    </ul>
                </div>
            </div>


            {/*<h1 className="text-[36px] text-center">Stage</h1>*/}
            {/*<section className="flex flex-row gap-10 min-h-full">*/}
            {/*    <SettingsTab setShowVideo={setShowVideo} />*/}
            {/*    <RecordTab showVideo={showVideo} />*/}
            {/*</section>*/}
        </div>
    )
}