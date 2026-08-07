"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

// New page for sign up 
// needs email password name for signup
// in a new folder called signup as its a new page

export default function Home(){
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[name,setName] = useState('');
    const router = useRouter();
    
    function handleEmail(e: React.ChangeEvent<HTMLInputElement>){
        setEmail(e.target.value);
    }
    function handlePassword(e: React.ChangeEvent<HTMLInputElement>){
        setPassword(e.target.value);
    }
    function handleName(e: React.ChangeEvent<HTMLInputElement>){
        setName(e.target.value);
    }
    async function handleSignUp() {
        const { data, error } = await authClient.signUp.email({
            name, email, password
        });
        if (error) {
            // tell the user something went wrong
        } else {
            // signed up — go somewhere
        }
    }
    return ( 
        <>
        <input value={name} onChange={handleName}/>
        <input value={email} onChange={handleEmail}/>
        <input value={password} type="password" onChange={handlePassword}/>
        <button onClick={submitEntry}>Submit</button>
        </>
    );
}

