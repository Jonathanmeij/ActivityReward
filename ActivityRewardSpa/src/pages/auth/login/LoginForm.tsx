import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { loginFormSchema } from "./LoginPage";
import { Link } from "react-router-dom";
import { OpacityButton } from "@/components/ui/ButtonNew";

interface LoginFormProps {
    onSubmit: (values: z.infer<typeof loginFormSchema>) => void;
    error?: string;
    isLoading?: boolean;
}

export default function LoginForm({ onSubmit, error, isLoading }: LoginFormProps) {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    return (
        <div className="w-full h-full m-auto max-w-96">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-between w-full h-full space-y-6 md:justify-center"
                >
                    <div className="md:hidden"></div>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Welcome back</h2>
                        <p className="font-light text-zinc-400">
                            Sign in to your account to continue
                        </p>
                    </div>
                    <div className="w-full space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name@mail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-between text-zinc-500">
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" />
                                <label
                                    htmlFor="remember"
                                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Remember me
                                </label>
                            </div>
                            <a
                                href="/forgot-password"
                                className="text-sm font-normal underline hover:text-zinc-900 "
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    {error && <p className="text-center text-red-400">{error}</p>}

                    <div className="flex flex-col w-full gap-4 md:flex-col-reverse">
                        <p className="font-light text-center text-zinc-500">
                            Don't have an account?{" "}
                            <Link
                                replace
                                to="/auth/register"
                                className="font-normal underline hover:text-zinc-100"
                            >
                                Register
                            </Link>
                        </p>
                        <OpacityButton
                            className="w-full"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Submit
                        </OpacityButton>
                    </div>
                </form>
            </Form>
        </div>
    );
}
