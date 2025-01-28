import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from "@/components/ui/button"
import { TriangleAlert } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SignInFlow } from '../types';
import { useState } from 'react';
import { useAuthActions } from "@convex-dev/auth/react";


interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const { signIn } = useAuthActions();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);

    const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        setPending(true);
        signIn("password", { name, email, password, flow: "signUp" })
            .catch(() => {
                setError("Something went wrong");

            })
            .finally(() => {
                setPending(false)
            });
    };
    const onProviderSignUp = (value: "google" | "github") => {
        setPending(true);
        signIn(value)
            .finally(() => {
                setPending(false)
            });
    };
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Sign Up to continue
                </CardTitle>
                <CardDescription className='pb-2 '>
                    Use your email or another account to login
                </CardDescription>
            </CardHeader>
            {!!error && (
                <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6'>
                    <TriangleAlert className="size-4" />
                    <p>{error}</p>
                </div>
            )}
            <CardContent className="space-y-5 px-0 pb-0">
                <form onSubmit={onPasswordSignUp} className="space-y-2.5">
                    <Input
                        disabled={pending}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        type="name"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={pending}
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        disabled={pending}
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignUp("google")}
                        className="w-full relative"
                        variant="outline"
                        size="lg"
                    >
                        <FcGoogle className="absolute size-5 top-2.5 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignUp("github")}
                        className="w-full relative"
                        variant="outline"
                        size="lg"
                    >
                        <FaGithub className="absolute size-5 top-2.5 left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className='text-muted-foreground text-sm'>
                    Already have an account?
                    <span
                        onClick={() => setState("signIn")}
                        className="text-sky-700 hover:underline cursor-pointer">
                        SignIn
                    </span>
                </p>
            </CardContent>

        </Card>
    )
}