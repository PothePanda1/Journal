"use client"
import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignUpForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const router = useRouter();

    function handleEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value);
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value);
    }

    function handleName(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value);
    }
    async function handleSignUp() {
        const { data, error } = await authClient.signUp.email({
            name, email, password
        });
        if (error) {
            // tell the user something went wrong
            console.log("Error") 
            // error message, ?? means if the error message is invalid (like null/undefined) for some reason theres a default message 
            setErrorMsg(error.message ?? 'Something went wrong. Please try again.')
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
        <input value={name} onChange={handleName} placeholder='Name'/>
        <input value={email} onChange={handleEmail} placeholder='Email'/>
        <input value={password} type="password" onChange={handlePassword} placeholder='Password'/>
        <button onClick={handleSignUp}>Submit</button>
        {errorMsg && <p>{errorMsg}</p>}
        </>
    );
}
