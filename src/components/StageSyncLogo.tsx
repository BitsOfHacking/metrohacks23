import stageSyncIcon from "../../public/logo.svg"
import Image from "next/image"

export default function StageSyncLogo() {
    return (
        <Image src={stageSyncIcon} priority alt="Primary Logo"/>
    )
}