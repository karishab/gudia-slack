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

interface SignUpCardProps {
    setState: (state: SignInFlow) => void;
};

export const SignUpCard = ({ setState }: SignUpCardProps) => {
    return (
        <Card className="w-full h-full p-8">
            <CardHeader className="px-0 pt-0">
                <CardTitle>
                    Sich Einlogen
                </CardTitle>
            </CardHeader>
            <CardDescription className='pb-2 '>
                Use your email or another account to login
            </CardDescription>
            <CardContent className="space-y-5 px-0 pb-0">
                <form className="space-y-2.5">
                    <Input
                        disabled={false}
                        value=""
                        type="email"
                        placeholder="Email"
                        onChange={() => { }}
                        required
                    />
                    <Input
                        disabled={false}
                        value=""
                        type="password"
                        placeholder="Password"
                        onChange={() => { }}
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