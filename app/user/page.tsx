import { QuizSetup } from "../components/quiz/QuizSetup";

export default function page() {
    return (
        <div className="bg-gray-Page-background">
            <div className="app-container m-2 text-center font-bold text-xl">
                Chose What kind of questions you like
                <QuizSetup />
            </div>
        </div>
    );
}
