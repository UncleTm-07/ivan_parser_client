import React, {FC, useState} from 'react';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {CreateWorker, Worker} from "@/shared/enums/WorkerData.ts";
import { useToast } from "@/components/ui/use-toast"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import $api from "@/shared/api";
import {Link} from "react-router-dom";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";

interface WorkersDialogEditProps {
    worker: CreateWorker;
    updateWorkers: (worker) => void;
}

const WorkersDialogEdit:FC<WorkersDialogEditProps> = ({worker, updateWorkers}) => {
    const { toast } = useToast();
    const [editWorker, setEditWorker] = useState(worker as Worker);

    function onEditWorker() {
        $api.put(`/workers/${editWorker.id}`, {...editWorker})
            .then((res) => {
                const data = res.data;
                toast({
                    title: "Персональні дані працівника успішно оновленно !",
                    type: "foreground"
                })
                updateWorkers(data);
            })
            .catch((error) => {
                toast({
                    title: "При редагуванні виникла помилка !",
                    description: (
                        <span>{error.message}</span>
                    ),
                    type: "foreground"
                })
            })
    }

    function onDeleteWorker() {
        $api.delete(`/workers/${editWorker.id}`)
            .then((res) => {
                const data = res.data;
                toast({
                    title: "НПП успішно видалено !",
                    type: "foreground"
                })
                setTimeout(() => {
                    window.location.href = "/workers";
                }, 700)
            })
            .catch((error) => {
                toast({
                    title: "При видаленні виникла помилка !",
                    description: (
                        <span>{error.message}</span>
                    ),
                    type: "foreground"
                })
            })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className={"w-[100%] border-sky-500 text-sky-500 hover:border-black self-end"}>Переглянути</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1225px]">
                <DialogHeader>
                    <DialogTitle>Вікно перегляду НПП</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="account" className="w-[100%]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">Профіль</TabsTrigger>
                        <TabsTrigger value="works">Наукові напрацювання</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Профіль НПП</CardTitle>
                                <CardDescription>
                                    Тут ви можете переглянути та відредагувати особисті дані НПП.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="w-[100%] flex gap-4">
                                <div className={"w-[50%]"}>
                                    <div className="space-y-1">
                                        <Label>Прізвище</Label>
                                        <Input defaultValue={editWorker?.lastName}
                                               onChange={(e) =>
                                                   setEditWorker({...editWorker, lastName: e.target.value})}/>
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Ім'я</Label>
                                        <Input defaultValue={editWorker?.name}
                                               onChange={(e) =>
                                                   setEditWorker({...editWorker, name: e.target.value})}/>
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Назва інституту</Label>
                                        <Input defaultValue={editWorker.institutionName}
                                               onChange={(e) =>
                                                   setEditWorker({...editWorker, institutionName: e.target.value})}/>
                                    </div>
                                </div>
                                <div className={"w-[50%]"}>
                                    <div className="space-y-1">
                                        <Label>Наукове звання</Label>
                                        <Input defaultValue={editWorker?.academicRank}
                                               onChange={(e) =>
                                                   setEditWorker({...editWorker, academicRank: e.target.value})}/>
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Посада</Label>
                                        <Input defaultValue={editWorker?.position}
                                               onChange={(e) =>
                                                   setEditWorker({...editWorker, position: e.target.value})}/>
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Orcid ID</Label>
                                        <Input defaultValue={editWorker?.orcid_id === "Orcid ID not found" ? "" : editWorker?.orcid_id}
                                               placeholder={editWorker?.orcid_id === "Orcid ID not found" ? editWorker?.orcid_id : "orcid id"}
                                               onChange={(e) =>
                                                   setEditWorker({...editWorker, orcid_id: e.target.value})}/>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className={"gap-3"}>
                                <Button className={"bg-sky-500 hover:bg-sky-300"} onClick={onEditWorker}>Зберегти
                                    зміни</Button>
                                <Button className={"bg-red-500 hover:bg-red-300"}
                                        onClick={onDeleteWorker}>Видалити</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="works">
                        <Card>
                            <CardHeader>
                                <CardTitle>Наукові нарацювання - {editWorker?.lastName} {editWorker?.name}</CardTitle>
                                {
                                    editWorker?.works && editWorker?.works?.length > 0 &&
                                    <CardDescription>
                                        <Link className={"text-sky-300 hover:border-b-2 hover:border-sky-500 duration-300"} to={`/workers/${editWorker.id}`}>Для детального перегляду натисність.</Link>
                                    </CardDescription>
                                }

                            </CardHeader>
                            <CardContent className="space-y-2">
                                {
                                    editWorker?.works && editWorker?.works?.length > 0 ?
                                        <>
                                            {
                                                editWorker?.works?.map((work, index) => (
                                                    <div key={`Worker-${editWorker.id}-work-${index}`}>
                                                        <Table>
                                                            <TableHeader>
                                                                <TableRow>
                                                                    <TableHead className="w-[50px]">№</TableHead>
                                                                    <TableHead
                                                                        className="w-[340px]">Заголовок</TableHead>
                                                                    <TableHead className="w-[260px]">Заголовок
                                                                        журналу</TableHead>
                                                                    <TableHead className="w-[130px]">Дата
                                                                        публікації</TableHead>
                                                                    <TableHead>Посилання</TableHead>
                                                                </TableRow>
                                                            </TableHeader>
                                                        </Table>
                                                        <div className={"max-h-[450px] overflow-y-auto"}>
                                                            <Table>
                                                                <TableBody>
                                                                    {
                                                                        work?.data?.map((work_data, index) => (
                                                                            <TableRow
                                                                                key={`Work-${work.website_name}-${index}`}>
                                                                                <TableCell
                                                                                    className="w-[50px]">{index + 1}</TableCell>
                                                                                <TableCell
                                                                                    className="w-[340px]">{work_data?.title}</TableCell>
                                                                                <TableCell
                                                                                    className="w-[260px]">{work_data?.journal_title}</TableCell>
                                                                                <TableCell
                                                                                    className="w-[130px]">{work_data?.publication_date}</TableCell>
                                                                                <TableCell
                                                                                    className={"text-sky-300"}><Link to={`${work_data?.source}`}>{work_data?.source}</Link></TableCell>
                                                                            </TableRow>
                                                                        ))
                                                                    }
                                                                </TableBody>
                                                            </Table>
                                                        </div>
                                                        <Table>
                                                            <TableCaption>Список наукових напрацювань з {work?.website_name}.</TableCaption>
                                                        </Table>
                                                    </div>
                                                ))
                                            }
                                        </>
                                        :
                                        <div className={"text-center text-xl text-sky-300"}>Наукові напрацювання
                                            відсутні</div>
                                }
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WorkersDialogEdit;