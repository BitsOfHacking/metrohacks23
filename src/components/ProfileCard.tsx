import CubeIcon, {CubeIconColor} from "@/components/CubeIcon";
import {Card} from "@nextui-org/card";

type ProfileCardTypes = {
    name: string;
    color: CubeIconColor;
}
// BLUE, PINK, PURPLE, RED
const colorBackgroundMapping = [
    'bg-[#7bd2cd]',  'bg-[#ed92c0]', 'bg-[#a373e7]', 'bg-[#e36f6e]'
]

export default function ProfileCard({ name, color }: ProfileCardTypes) {

    return (
        <Card className={`w-72 h-52 justify-center ${colorBackgroundMapping[color.valueOf()]}`}>
            <CubeIcon color={color}/>

            <h1 className={"text-white mx-4 mt-4 font-bold"}>
                {name}
            </h1>
        </Card>
    )
}