import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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

interface RegisterFormProps {
    onSubmit: (values: z.infer<typeof registerFormSchema>) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    return (
        <div className="flex flex-col items-center justify-between h-full m-auto max-w-96">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full p-4 space-y-6"
                >
                    <div className="text-center ">
                        <h2 className="text-3xl font-bold">Create an account</h2>
                        <p className="font-light text-zinc-400">
                            Sign up to start your journey
                        </p>
                    </div>
                    <div className="space-y-2">
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
                    <Button className="w-full" type="submit">
                        Submit
                    </Button>
                    <p className="font-light text-center text-zinc-500">
                        Already have an account?{" "}
                        <Link
                            to="/auth/login"
                            className="font-normal underline hover:text-zinc-200"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    );
}
