import React, {FC} from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {CreateWorker} from "@/shared/enums/WorkerData.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
    lastName: z.string().min(2, {
        message: "Lastname must be at least 2 characters.",
    }),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    institutionName: z.string().min(2, {
        message: "Middle name must be at least 2 characters.",
    }),
    academicRank: z.string().min(2, {
        message: "Academic rank must be at least 2 characters.",
    }),
    position: z.string().min(2, {
        message: "Position must be at least 2 characters.",
    }),
})
interface WorkersDialogAddProps {
    onCreateWorker: (worker: CreateWorker) => void;
}

const WorkersDialogAdd:FC<WorkersDialogAddProps> = ({onCreateWorker}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lastName: "",
            name: "",
            institutionName: "",
            academicRank: "",
            position: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        const worker = {
            isScholar: false,
            isOrcid: false,
            isScopus: false,
        }
        const data = {...values, ...worker}
        onCreateWorker(data);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={"w-[200px] border-sky-500 text-sky-500 hover:bg-white hover:text-sky-300 hover:border-sky-200 self-end"}>Додати НПП</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Вікно реєстрації НПП</DialogTitle>
                    <DialogDescription>
                        Тут ви можете додати ННП з вашого підрозділу. Ви також можете відредагувати його дані в будь-який момент.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Прізвище (EN)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Іванов" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ім'я (EN)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Іван" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="institutionName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Назва інституту (EN)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="MITIT" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="academicRank"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Науковий ступінь</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Доцент" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Посада</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Викладач" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className={"w-[100%] bg-sky-500 hover:bg-sky-300"}>Додати</Button>
                    </form>
                </Form>
                <DialogFooter>
                    <DialogClose asChild>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WorkersDialogAdd;