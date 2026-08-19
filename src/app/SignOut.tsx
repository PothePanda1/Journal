// Client Component - enables user interactivity (buttons and text)

"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { router } from 'better-auth/api';

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
