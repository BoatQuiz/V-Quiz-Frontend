import { SaveUserProps } from "@/types/userType";
import { SecondaryButton } from "./SecondaryButton";



export function SaveUser({ onClick, className=""}: SaveUserProps) {
  return (
    <SecondaryButton className={className} onClick={onClick}>
        Save user preferens
    </SecondaryButton>
  )
}
