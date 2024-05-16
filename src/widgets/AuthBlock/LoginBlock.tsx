import { z } from "zod"
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/shared/ui/Loader.tsx";
import { useToast } from "@/components/ui/use-toast";
import {RouterNames} from "@/shared/enums/RouterNames.ts";
import $api from "@/shared/api";
import React, {useState} from "react";


const formSchema = z.object({
    username: z.string(),
    password: z.string(),
})

const LoginBlock = () => {
    const { toast } = useToast();
    const navigate = useNavigate();
    const [isUserLoading, setIsUserLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: ""
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        $api.post("/user/login", {...values})
            .then((res) => {
                console.log(res)
                if (res.data?.status === true) {
                    toast({
                        title: "Ви успішно авторизувались !",
                        description: (
                            <span>{res.data?.username}</span>
                        ),
                        type: "foreground"
                    })
                    sessionStorage.setItem('auth', "true");
                    setTimeout(() => {
                        navigate(RouterNames.HOME.to)
                    }, 700)
                }else {
                    toast({
                        title: "При авторизації виникла помилка !",
                        description: (
                            <span>{res.data?.message}</span>
                        ),
                        type: "foreground"
                    })
                }
            })
    }

    return (
        <Form {...form}>
            <div className={"sm:w-420 flex-center flex-col"}>
                <h2 className={"text-xl md:h2-bold text-center pt-5 sm:pt-12 text-sky-500"}>Увійдіть у акаунт</h2>
                <p className={"text-light-3 small-medium md:base-regular text-center w-[400px] mt-2"}>Для того, щоб користуватись додатком, будь-ласка введіть персональні дані</p>

                <form onSubmit={form.handleSubmit(onSubmit)}
                      className="flex flex-col gap-5 w-full mt-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" placeholder={"invov22"} {...field} />
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
                                    <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="bg-sky-500 hover:bg-sky-300">
                        { isUserLoading ? (
                            <div className="flex-center gap-2">
                                <Loader /> Loading...
                            </div>
                        ) : (
                            "Sign up"
                        )}
                    </Button>

                    <p className={"text-small-regular text-light-2 text-center mt-2"}>
                        Ще не маєте акаунту?
                        <Link to={RouterNames.REGISTRATION.to} className={"text-sky-500 text-small-semibold ml-1"}>
                            Створити
                        </Link>
                    </p>
                </form>
            </div>
        </Form>
    );
};

export default LoginBlock;