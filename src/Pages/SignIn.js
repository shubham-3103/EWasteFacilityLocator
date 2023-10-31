
import { SignIn } from "@clerk/clerk-react";
import '../App.css'

export default function Page() {
  return (
  <div className="flex-center">
      <SignIn />
  </div>
  )
}