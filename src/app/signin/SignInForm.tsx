"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';

export default function SignInForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const router = useRouter();

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    async function handleSignIn() {
        const { data, error } = await authClient.signIn.email({
            email, password
        });
        if (error) {
            // tell the user something went wrong
            console.log("Error") 
            // we would use error ?? 'wrong details...' but we don't want clients to know what emails exist 
            setErrorMsg('Wrong details. Please try again.')
        }
        else{
            // log in user - forward him to actual journal page
            router.push("/");
        }
    }

    //input is used for small one line entries.
    // intitally errormessage is '', so nothing appears unless an error appears.
    return ( 
        <>
        <input value={email} onChange={handleEmail} placeholder='Email'/>
        <input value={password} type="password" onChange={handlePassword} placeholder='Password'/>
        <button onClick={handleSignIn}>Submit</button>
        {errorMsg && <p>{errorMsg}</p>}
        <Link href="/signup">Sign Up</Link>
        </>
    );
}
