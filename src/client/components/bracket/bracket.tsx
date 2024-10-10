export default function Bracket(props: { name?: string, subtitle?: string, className?: string, color?: string }) {
    return (<div className={
        (props.className ? " " + props.className : "") +
        (props.name == "BYE" ? "bg-gray-700 text-white" : " bg-sky-50 text-cyan-900 ") +
        (props.subtitle == "5A" ? " row-start-3" : "") +
        " rounded-r-2xl my-2 border-2 border-black"}>
        <div className="flex h-full">
            <div style={{backgroundColor: props.color}} className={`w-3 h-full me-2`}></div>
            <div className="w-full text-center me-4 p-2">
                <h1>{props.name ? props.name : "Not Determined"}</h1>
                {props.subtitle ? <h2 className={"text-xs"}>{props.subtitle}</h2> : ""}
            </div>
        </div>
    </div>
    )
}