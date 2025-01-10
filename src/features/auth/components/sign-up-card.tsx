import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
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

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Sign Up to continue
                </CardTitle>
            </CardHeader>
            <CardDescription className='pb-2 '>
                Use your email or another account to login
            </CardDescription>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        disabled={false}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        type="email"
                        required
                    />
                    <Input
                        disabled={false}
                        value={password}
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Input
                        disabled={false}
                        value={confirmPassword}
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full" size="lg" disabled={false}>
                        Continue
                    </Button>
                </form>
                <Separator />
                <div className="flex flex-col gap-y-2.5">
                    <Button
                        disabled={false}
                        onClick={() => { }}
                        className="w-full relative"
                        variant="outline"
                        size="lg"
                    >
                        <FcGoogle className="absolute size-5 top-2.5 left-2.5" />
                        Continue with Google
                    </Button>
                    <Button
                        disabled={false}
                        onClick={() => { }}
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