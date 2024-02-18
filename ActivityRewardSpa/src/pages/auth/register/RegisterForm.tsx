import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerFormSchema } from "./RegisterPage";
import { Link } from "react-router-dom";
import { OpacityButton } from "@/components/ui/ButtonNew";

interface RegisterFormProps {
    onSubmit: (values: z.infer<typeof registerFormSchema>) => void;
    error?: string;
    isLoading?: boolean;
}

export default function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    return (
        <div className="h-full m-auto max-w-96">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col items-center justify-between w-full h-full space-y-6 md:justify-center"
                >
                    <div> </div>
                    <div className="text-center ">
                        <h2 className="text-3xl font-bold">Create an account</h2>
                        <p className="font-light text-zinc-400">
                            Sign up to start your journey
                        </p>
                    </div>
                    <div className="w-full space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className=""
                                            placeholder="name@mail.com"
                                            {...field}
                                        />
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
                                    <FormDescription>
                                        Must be at least 8 characters long and contain at
                                        least 1 uppercase letter, 1 lowercase letter, and
                                        1 number
                                    </FormDescription>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder=""
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col w-full gap-4 md:flex-col-reverse">
                        <p className="font-light text-center text-zinc-500">
                            Already have an account?{" "}
                            <Link
                                replace
                                to="/auth/login"
                                className="font-normal underline hover:text-zinc-200"
                            >
                                Login
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
