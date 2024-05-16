import React, {useEffect, useState} from 'react';
import WorkersDialogAdd from "@/widgets/Workers/WorkersDialogAdd.tsx";
import {CreateWorker, Worker} from "@/shared/enums/WorkerData.ts";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import WorkersDialogEdit from "@/widgets/Workers/WorkersDialogEdit.tsx";
import $api from "@/shared/api";
import {useToast} from "@/components/ui/use-toast.ts";
import {Simulate} from "react-dom/test-utils";
import {util} from "zod";
import { IoReload } from "react-icons/io5";
import LoadingSpinner from "@/shared/ui/LoadingSpinner/LoadingSpinner.tsx";

const WorkersBlock = () => {
    const { toast } = useToast();
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isLoading) {
            $api.get('/workers')
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        setWorkers(res.data);
                    }
                })
                .catch((error) => {
                    toast({
                        title: "При запитті на НПП виникла помилка !",
                        description: (
                            <span>{error.message}</span>
                        ),
                        type: "foreground"
                    })
                }).finally(() => {
                setIsLoading(false);
            })
        }
    }, [isLoading]);

    const onCreateWorker = (worker:CreateWorker) => {
        if (worker) {
            console.log(worker)
            $api.post('/workers', {...worker})
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        const new_worker = res.data;
                        addWorkerToWorkers(new_worker);
                        const person = `${new_worker.lastName} ${new_worker.name}`
                        toast({
                            title: "Працівника успішно додано !",
                            description: (
                                <span>{person}</span>
                            ),
                            type: "foreground"
                        })
                    }
                })
                .catch((error) => {
                    toast({
                        title: "При створенні виникла помилка !",
                        description: (
                            <span>{error}</span>
                        ),
                        type: "foreground"
                    })
                })
        }
    }
    function updateWorkers(workers) {
        if (workers) {
            setWorkers(workers);
        }
    }
    function addWorkerToWorkers(worker) {
        if (worker) {
            setWorkers([...workers, worker]);
        }
    }
    function editWorkerInWorkers(worker) {
        if (worker) {
            let workers_arr = workers;
            const index = workers_arr.findIndex(value => value.id === worker.id);
            workers_arr[index] = {...workers_arr[index], ...worker};
            setWorkers(workers_arr);
        }
    }
    return (
        <div className={'flex flex-col w-[80%] gap-4'}>
            <div className={"flex w-[100%] items-center justify-end gap-5"}>
                <IoReload  className={"text-sky-500 text-4xl border-2 border-sky-400 p-1 rounded-xl cursor-pointer hover:bg-white hover:text-sky-300 hover:border-sky-200"} onClick={() => setIsLoading(true)}/>
                <WorkersDialogAdd onCreateWorker={onCreateWorker}/>
            </div>
            {isLoading?
                <LoadingSpinner padding={"10vh 10vw"} containerHeight={"50vh"} spinnerHeight={"100px"}
                                spinnerWidth={"100px"}/>
                :
                <div className={"grid grid-cols-4 gap-4"}>
                    {
                        workers?.map((worker, index) => (
                            <div key={`Woker-${index}-${worker.id}`}
                                className={"flex flex-col items-center justify-around gap-3 rounded-2xl shadow-lg shadow-sky-300 py-6 cursor-pointer"}>
                                <span className={"w-[200px] text-xs text-end text-sky-400"}>{worker.position}</span>
                                <Avatar>
                                    <AvatarImage
                                        src="https://res.cloudinary.com/teepublic/image/private/s--_Qwf67LJ--/t_Preview/b_rgb:36538b,c_limit,f_jpg,h_630,q_90,w_630/v1543452190/production/designs/3604179_0.jpg"
                                        width={100} className={"rounded-xl"}/>
                                    <AvatarFallback>PERSON</AvatarFallback>
                                </Avatar>
                                <span className={"max-w-[200px] text-center"}>{worker.lastName} {worker.name}</span>
                                <div>
                                    <WorkersDialogEdit worker={worker} updateWorkers={updateWorkers}/>
                                </div>
                            </div>
                         ))
                    }
                </div>
            }
        </div>
    );
};

export default WorkersBlock;