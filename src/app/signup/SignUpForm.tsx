"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignUpForm(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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
            console.log("Error") // This would be a pop-up message that comes up and tells the user incorrect username or password or email or whatever
        }
        else{
            // log in user - forward him to actual journal page
            router.push("/");
        }
    }
    return ( 
        <>
        <input value={name} onChange={handleName}/>
        <input value={email} onChange={handleEmail}/>
        <input value={password} type="password" onChange={handlePassword}/>
        <button onClick={handleSignUp}>Submit</button>
        </>
    );
}
