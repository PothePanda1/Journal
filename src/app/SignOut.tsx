// Client Component - enables user interactivity (buttons and text)

"use client"
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function SignOut(){
    const router = useRouter();

    async function handleSignOut(){
        await authClient.signOut();
        router.push("/signup");
    }
    return ( 
        <>
        <button onClick={handleSignOut}>Sign Out</button>
        </>
    );
}
