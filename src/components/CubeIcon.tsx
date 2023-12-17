import redcube from "../../public/3dcubered.svg"
import purplecube from "../../public/3dcubepurple.svg"
import bluecube from "../../public/3dcubeblue.svg"
import pinkcube from "../../public/3dcubepink.svg"
import Image from "next/image";

export enum CubeIconColor {
    BLUE, PINK, PURPLE, RED
}

type CubeIconProps = {
    color: CubeIconColor;
}

export default function CubeIcon({ color }: CubeIconProps ) {
    switch (color) {
        case CubeIconColor.BLUE:
            return <Image className={"mx-auto"} src={bluecube} priority alt="Cube icon"/>
        case CubeIconColor.PURPLE:
            return <Image className={"mx-auto"} src={purplecube} priority alt="Cube icon"/>
        case CubeIconColor.PINK:
            return <Image className={"mx-auto"} src={pinkcube} priority alt="Cube icon"/>
        case CubeIconColor.RED:
            return <Image className={"mx-auto"} src={redcube} priority alt="Cube icon"/>
    }
}