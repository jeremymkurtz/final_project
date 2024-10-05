export default function (props : {round?: string, className?: string, children?: any}) {
    let gap =  props.round
    if(props.round) {
        if(props.round === "quarter") {
            gap = " gap-[15%]"
        }
        if(props.round === "semi") {
            gap = " gap-[40%]"
        }
    }
    return (
        <div className={(props.className ? " " + props.className : "") + gap +" flex flex-col justify-center"}>
            {props.children}
        </div>
    )
}