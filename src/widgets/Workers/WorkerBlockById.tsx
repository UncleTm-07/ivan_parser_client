import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Worker} from "@/shared/enums/WorkerData.ts";
import $api from "@/shared/api";
import {useToast} from "@/components/ui/use-toast.ts";
import LoadingSpinner from "@/shared/ui/LoadingSpinner/LoadingSpinner.tsx";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement
} from 'chart.js'
import { Line, Pie } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ArcElement,
);
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input.tsx";

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Діаграма публікацій наукових напрацювань за рік',
        },
    },
};

const WorkerBlockById = () => {
    const {id} = useParams();
    const { toast } = useToast();

    const [worker, setWorker] = useState<Worker>({} as Worker);
    const [works, setWorks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterBy, setFilterBy] = useState("null");
    const [searchBy, setSearchBy] = useState("");

    useEffect(() => {
        if (id) {
            $api.get(`/workers/${id}`)
                .then((res) => {
                    if (res.status === 200) {
                        console.log(res.data)
                        setWorker(res.data);
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
    }, [id])

    useEffect(() => {
        if (worker) {
            let data = [];
            worker?.works?.map((work) => {
                work?.data?.map((value) => {
                    data.push(value)
                })
            })
            setWorks(data)
            fillData(data);
        }
    }, [worker]);

    const searchWorks = (array, searchTerm) => {
        return array.filter((value) => {
            return value.title.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    useEffect(() => {
        let data = [];
        worker?.works?.map((work) => {
            work?.data?.map((value) => {
                data.push(value)
            })
        })
        if (data && data?.length > 1) {
            if (filterBy === "date") {
                data.sort((a, b) => a.publication_date - b.publication_date);
            }
            if (searchBy === "" && searchBy.length < 2 ) {
                setWorks(data);
                return;
            }
            data = searchWorks(data, searchBy);
            setWorks(data);
        }
    }, [filterBy, searchBy])

    const [data, setData] = useState({
        labels: ['loading'],
        datasets: [
            {
                label: '# of count',
                data: [100],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ]
    })

    function getLabels(data) {
        let labels = [];
        data?.map((value) => {
            const date = value?.publication_date;
            if (date) {
                const year = date.split('-')[0]
                if (!labels.includes(year)){
                    labels.push(year);
                }
            }
        })
        return labels;
    }

    function groupedByYear(labels, data) {
        let worksByYear = [];
        if (data) {
            labels?.map((label) => {
                let count = 0;
                data?.map((value) => {
                    const date = value?.publication_date;
                    const year = date.split('-')[0]
                    if (year === label){
                        count++;
                    }
                })
                worksByYear.push(count);
            })
        }
        return worksByYear
    }

    function getColors() {
        const min = Math.ceil(1);
        const max = Math.floor(255);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getBackgroundColors(labels) {
        const colors = {
            one: [],
            two: []
        }
        labels.map((value) => {
            const one = getColors();
            const two = getColors();
            const three = getColors();
            const color1 = `rgba(${one}, ${two}, ${three}, 0.2)`
            const color2 = `rgba(${one}, ${two}, ${three}, 0.2)`
            colors.one.push(color1);
            colors.two.push(color2);
        })
        return colors
    }

    function fillData(data) {
        if (!data) {
            return;
        }
        const labels = getLabels(data);
        const dataset = groupedByYear(labels, data);
        const colors = getBackgroundColors(labels);
        setData({
            labels: labels,
            datasets: [
                {
                    label: '# of count',
                    data: dataset,
                    backgroundColor: colors.one,
                    borderColor: colors.two,
                    borderWidth: 1,
                },
            ]
        })

    }

    return (
        <div className={"flex flex-col w-[80%] gap-5"}>
            <h3 className={"text-sky-300 text-xl"}>
                | Панель НП працівника - {worker.lastName} {worker.name}
            </h3>
            {
                isLoading ?
                    <LoadingSpinner padding={"10vh 10vw"} containerHeight={"50vh"} spinnerHeight={"100px"}
                                    spinnerWidth={"100px"}/>
                    :
                    <>
                        <div className={"w-[100%] h-[max-content] gap-4 flex items-center justify-end"}>
                            <Input onChange={(e) => setSearchBy(e.target.value)} placeholder={"Пошук....."}/>
                            <Select onValueChange={(value) => setFilterBy(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Відсортувати за" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="date">Дата публікації</SelectItem>
                                    <SelectItem value="null">Без сортування</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className={"w-[100%] h-[max-content] p-1 border-2"}>
                            {
                                works && works?.length > 0 ?
                                    <>
                                                <div key={`Worker-${worker.id}`}>
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
                                                                    works?.map((work_data, index) => (
                                                                        <TableRow
                                                                            key={`Work-${index}`}>
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
                                                        <TableCaption>Список наукових напрацювань.</TableCaption>
                                                    </Table>
                                                </div>
                                    </>
                                    :
                                    <div className={"text-center text-xl text-sky-300"}>Наукові напрацювання
                                        відсутні</div>
                            }
                        </div>
                        <div className={"flex justify-center w-[100%] h-[600px]"}>
                            {data?
                                <div className={'w-[100%] flex justify-center'}>
                                    <Pie options={options} data={data}/>
                                </div>
                                :
                                <div className={"text-center text-xl text-sky-300"}>Наукові напрацювання
                                    відсутні для того щоб відобразити діагарму</div>
                            }
                        </div>
                    </>
            }
        </div>
    );
};

export default WorkerBlockById;