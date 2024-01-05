import { ReactNode } from "react"
interface LayoutPops {
    children: ReactNode;
}
export default function Website({ children }: LayoutPops) {
    return (
        <div className="">
            {
                children
            }
        </div>
    )
}