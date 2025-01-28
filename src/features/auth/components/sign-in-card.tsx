import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button"
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

interface SignInCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignInCard = ({ setState }: SignInCardProps) => {
    const { signIn } = useAuthActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setPending(true);
        signIn("password", { email, password, flow: "signIn" })
            .catch(() => {
                setError("Invalid email or password");

            })
            .finally(() => {
                setPending(false)
            });
    };

    const onProviderSignIn = (value: "google" | "github") => {
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
                    Sign In to continue
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
                <form onSubmit={onPasswordSignIn} className="space-y-2.5">
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
                    <Button type="submit" className="w-full" size="lg" disabled={pending}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignIn("google")}
                        className="w-full relative"
                        variant="outline"
                        size="lg"
                    >
                        <FcGoogle className="absolute size-5 top-2.5 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={pending}
                        onClick={() => onProviderSignIn("github")}
                        className="w-full relative"
                        variant="outline"
                        size="lg"
                    >
                        <FaGithub className="absolute size-5 top-2.5 left-2.5" />
                        Continue with Github
                    </Button>
                </div>
                <p className='text-muted-foreground text-sm'>
                    Don&apos;t have an account?
                    <span
                        onClick={() => setState("signUp")}
                        className="text-sky-700 hover:underline cursor-pointer">
                        SignUp
                    </span>
                </p>
            </CardContent>

        </Card>
    )
}