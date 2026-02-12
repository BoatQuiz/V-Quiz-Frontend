import { SaveUserProps } from "@/types/userType";
import { PrimaryButton } from "./PrimaryButton";

export function SaveUser({ onClick, className=""}: SaveUserProps) {
  return (
    <PrimaryButton className={className} onClick={onClick}>
        Save user preferens
    </PrimaryButton>
  )
}
