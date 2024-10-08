import Button from "./form/button";

export default function Aside() {
    return (
        <aside className="w-1/6 py-4">
            <Button className="bg-TrevBlue" navigateTo={"/game-submission"}>
                <p>Submission</p>
            </Button>
            <Button className="bg-TrevGreen" navigateTo={"/round-robin"}>
                <p>Round Robin</p>
            </Button>
            <Button className="bg-TrevGreen" navigateTo={"/brackets"}>
                <p>Bracket</p>
            </Button>
        </aside>
    );
};