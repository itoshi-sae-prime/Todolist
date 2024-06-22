import { useEffect, useState } from "react";
import Clock from "./Clock";
import ChangeColorButton from "./ButtonChangesColor/Button";
import { nanoid } from 'nanoid'
import { customAlphabet } from "nanoid";
interface ITodo {
    id: string;
    task: string;
    time: Date;
    completed: boolean;
    changed: boolean;
}
const Layout = () => {
    const [color, setColor] = useState<string>("gradient-to-r from-blue-500 to-green-500");
    const [task, setTask] = useState<string>("");
    const [todo, setTodo] = useState<ITodo[]>([]);
    const [time, setTime] = useState<Date>(new Date());
    const handleonChangesTask = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTask(e.target.value);
    }
    const handleAdd = (): void => {
        if (task === "") {
            alert("Please fill your task ");
            return;
        }
        else {
            alert("Succes");
            setTask('');
        }
        const nanoId = nanoid();
        const generateNumericId = customAlphabet('0123456789', 3);
        const id = generateNumericId();
        const newTask = { id, task: task, time: new Date, completed: false, changed: false };
        setTodo((prev) => [...prev, newTask]);
        setTask('');
    }
    const handleDelete = (id: any): void => {
        const newTask = todo.filter((item) => item.id !== id);
        setTodo(newTask);
    }
    const handleComplete = (id: any): void => {
        setTodo((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    }
    const handleChange = (id: any, changetask: string): void => {
        setTodo((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, changed: !item.changed } : item
            )
        );
        setTask(changetask);
    }
    const handleUpdate = (id: any): void => {
        const index = todo.findIndex((item) => item.id === id);
        const newTodo = [...todo];
        newTodo[index] = { id: id, task: task, time: time, completed: false, changed: false, };
        setTodo(newTodo);
        setTask('');
        alert("Update Succes");
    }
    const handleEdit = (id: any, changetask: string, changetime: Date): void => {

    }
    useEffect(() => {

    }, [])
    const formatTime = (date: Date) => {
        let hours = date.getHours().toString().padStart(2, '0');
        let minutes = date.getMinutes().toString().padStart(2, '0');
        let seconds = date.getSeconds().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
    };
    return (
        <>
            <div className={`bg-${color} h-[100vh]`}>
                {/* Header */}
                <div className="px-12 py-8">
                    <div className="flex justify-end gap gap-x-5">
                        <ChangeColorButton color="blue-500" setColor={setColor} />
                        <ChangeColorButton color="gradient-to-r from-blue-500 to-green-500" setColor={setColor} />
                        <ChangeColorButton color="green-500" setColor={setColor} />
                        <ChangeColorButton color="gradient-to-r from-green-500 to-blue-500" setColor={setColor} />
                    </div>
                </div>
                {/* Title */}
                <div className="">
                    <p className="text-center text-[100px] text-white title-1 bg-pur">Just do it. </p>
                    {/* Input */}
                    <div className="flex justify-center items-center mt-[45px]">
                        <input className={`w-[500px] p-2 rounded-l-[25px] bg-${color} border-2 text-white type="text`} placeholder="Add a task" onChange={handleonChangesTask} value={task} />
                        <button className="bg-white p-2 rounded-r-[25px] border-2" onClick={handleAdd}>Add This!</button>
                    </div>\
                    {/* Clock */}
                    <div className="flex justify-center items-center mt-[30px]">
                        <Clock time={time} setTime={setTime} />
                    </div>
                    {/* List */}
                    <div className="flex justify-center items-center mt-[30px]">
                        <div className="text-white">
                            {
                                todo.map((item, index) => {
                                    return <>
                                        <div className="flex py-2">
                                            <div className={`truncate hover:text-clip min-w-[100px] max-w-[600px] w-[300px] border-2 bg-${color !== "gradient-to-r from-blue-500 to-green-500" ? "gradient-to-t from-blue-500 to-green-500" : 'gradient-to-r from-blue-500 to-green-500'} rounded-md p-[5px] ${item.completed ? `bg-gradient-to-r from-blue-700 to-green-700` : `bg - gradient - to - r from-blue-500 to-green-500`}`}>{item.task}</div>
                                            <div className="flex justify-center py-[5px] pl-3">
                                                <div>{formatTime(item.time)}</div>
                                                <div className="flex gap-x-3 pl-[20px]">
                                                    <button className={`px-[10px] bg-green-700 rounded-md text-white font-bold ${item.completed ? "hidden" : "block"}`} onClick={() => handleComplete(item.id)}>V</button>
                                                    {/* {
                                                        toggle &&
                                                        <div className="flex gap-x-3">
                                                            <button className="px-[10px] bg-red-500 rounded-md text-white font-bold " onClick={() => handleDelete(item.id)}>X</button>
                                                            <button className="px-[10px] bg-lime-400 rounded-md text-white font-bold" onClick={() => handleChange(item.id, item.task)}>Change</button>
                                                        </div>
                                                    } */}
                                                    <button className={`px-[10px] bg-red-500 rounded-md text-white font-bold ${item.completed ? "hidden" : "block"}`} onClick={() => handleDelete(item.id)}>X</button>
                                                    <button className={`px-[10px] bg-lime-400 rounded-md text-white font-bold ${item.completed ? "hidden" : "block"}`} onClick={() => handleChange(item.id, item.task)}>Change</button>
                                                    {
                                                        item.changed && <button className="px-[10px] bg-orange-500 rounded-md text-white font-bold" onClick={() => handleUpdate(item.id)}>Update</button>
                                                    }
                                                </div>
                                            </div>
                                        </div >
                                    </>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Layout;