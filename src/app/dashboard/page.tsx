'use client'

import {Card, CardBody, CardHeader} from "@nextui-org/card";
import BubbleChart from '@weknow/react-bubble-chart-d3';

export default function DashboardPage() {
    return (

        <>

            <h1 className={"text-3xl text-center font-extrabold my-16"}>
                Presentation Statistics
            </h1>

            <div className={"container mx-auto flex mt-16 space-x-8"}>



                <div className="w-[35%] flex-col space-y-8">
                    <Card className={"max-w-[500px] h-40 flex-auto"}>
                        <CardHeader>
                            <div className="flex-col p-4">
                                <div className={"text-lg"}>
                                    Words Per Minute
                                </div>
                                <div className={"text-4xl font-extrabold"}>
                                    N/A
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className={"max-w-[500px] h-40 flex-auto"}>
                        <CardHeader>
                            <div className="flex-col p-4">
                                <div className={"text-lg"}>
                                    Non-Filler Word Percentage
                                </div>
                                <div className={"text-4xl font-extrabold"}>
                                    N/A
                                </div>
                            </div>
                        </CardHeader>
                    </Card>


                    <Card className={"max-w-[500px] h-40 flex-auto"}>
                        <CardHeader>
                            <div className="flex-col p-4">
                                <div className={"text-lg"}>
                                    Unique Words
                                </div>
                                <div className={"text-4xl font-extrabold"}>
                                    N/A
                                </div>
                            </div>
                        </CardHeader>
                    </Card>


                </div>

                <div className="w-[75%] flex-col space-y-8">
                    <BubbleChart graph={{
                        zoom: 0.75,
                        offsetX: 0.3,
                        offsetY: -0.05,
                    }}
                                 legendFont={{
                                     family: 'Arial',
                                     size: 12,
                                     color: '#000',
                                     weight: 'bold',
                                 }}
                                 valueFont={{
                                     family: 'Arial',
                                     size: 12,
                                     color: '#fff',
                                     weight: 'bold',
                                 }}
                                 bubbleClickFunc={null}
                                 legendClickFun={null}
                                 labelFont={{
                                     family: 'Arial',
                                     size: 16,
                                     color: '#fff',
                                     weight: 'bold',
                                 }}
                                 width={800}
                                 height={800}
                                 padding={0}
                                 showLegend={false}
                                 legendPercentage={20}
                                 data={[
                                     {label: 'CRM', value: 1},
                                     {label: 'API', value: 1},
                                     {label: 'Data', value: 1},
                                     {label: 'Commerce', value: 1},
                                     {label: 'AI', value: 3},
                                     {label: 'Management', value: 5},
                                     {label: 'Testing', value: 6},
                                     {label: 'Mobile', value: 9},
                                     {label: 'Conversion', value: 9},
                                     {label: 'Misc', value: 21},
                                     {label: 'Databases', value: 22},
                                     {label: 'DevOps', value: 22},
                                     {label: 'Javascript', value: 23},
                                     {label: 'Languages / Frameworks', value: 25},
                                     {label: 'Front End', value: 26},
                                     {label: 'Content', value: 26},
                                 ]}
                    />
                </div>


            </div>
        </>
    )

}