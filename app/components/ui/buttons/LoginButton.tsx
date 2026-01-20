import { SecondaryButton } from "./SecondaryButton";
import { useRouter } from "next/navigation";

export function LoginButton({ className=""}) {
    const route = useRouter();
    const handleClick = () => {
        route.push("/login")
    }
  return (
    <SecondaryButton onClick={handleClick} className={className}>Log in</SecondaryButton>
  )
}
