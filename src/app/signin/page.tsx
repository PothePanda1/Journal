
// New page used for users to sign up 
// Similar logic to before a page.tsx file that uses a form to handle api calls and objects
import { redirect } from "next/navigation";
import SignInForm from "./SignInForm"
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function SignInPage(){
      const session = await auth.api.getSession({ headers: await headers() }); 
      if (session){
        redirect("/")
      }
    return (
        <div>
            <h1>Login Form</h1>
            <SignInForm/>

        </div>
    )
}

