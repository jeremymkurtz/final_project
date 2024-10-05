import "../App.css";
import form from "../components/form";


export default function GameSubmission() {
    // const [matches, setMatches] = useState<Match[]>([]);
    return (
        <div className={"sm:flex sm:flex-col sm:justify-center sm:items-center px-5 sm:px-[30%]"}>
            <h1 className="font-black text-4xl sm:text-6xl pt-6 mb-5">Submit your Match!</h1>
            {form()}
        </div>
    );
}