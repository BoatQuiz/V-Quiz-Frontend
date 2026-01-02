import { useQuiz } from "@/app/context/quizContext";
import { SecondaryButton } from "./SecondaryButton";

export function LogoutButton({ className = "" }) {
    const { logout } = useQuiz();

    return (
        <SecondaryButton onClick={logout} className={className}>
            Logga ut
        </SecondaryButton>
    );
}
