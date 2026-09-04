import { QuizSetup } from "../components/quiz/QuizSetup";

export default function page() {
    return (
        <div className="page-wrapper pt-8">
            <div className="app-container text-center font-bold text-xl max-w-xl mx-auto">
                Chose What kind of questions you like
                <QuizSetup />
            </div>
        </div>
    );
}