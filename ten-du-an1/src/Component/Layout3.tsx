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
            alert("Success");
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
            <div className={`bg-${color} min-h-screen`}>
                {/* Header */}
                <div className="px-6 py-4 sm:px-12 sm:py-8">
                    <div className="flex justify-end gap-3 sm:gap-5">
                        <ChangeColorButton color="gradient-to-r from-purple-500 to-blue-500" setColor={setColor} />
                        <ChangeColorButton color="gradient-to-r from-blue-500 to-green-500" setColor={setColor} />
                        <ChangeColorButton color="gradient-to-r from-green-500 to-yellow-500" setColor={setColor} />
                        <ChangeColorButton color="gradient-to-r from-green-500 to-orange-500" setColor={setColor} />
                    </div>
                </div>

                {/* Title */}
                <div className="text-center text-white">
                    <p className="text-4xl sm:text-6xl md:text-7xl lg:text-[100px] font-bold">Just do it.</p>
                </div>

                {/* Input */}
                <div className="flex justify-center items-center mt-4">
                    <div className="relative w-full max-w-[90%] sm:max-w-[500px]">
                        <input
                            type="text"
                            className="w-full p-3 pl-5 pr-14 rounded-full border-2 border-gray-300 bg-white text-gray-800 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition duration-200"
                            placeholder="Add a task..."
                            onChange={handleonChangesTask}
                            value={task}
                        />
                        <button
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 sm:px-5 py-2 rounded-full shadow-md hover:bg-blue-600 transition duration-200"
                            onClick={handleAdd}
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Clock */}
                <div className="flex justify-center items-center mt-6">
                    <Clock time={time} setTime={setTime} />
                </div>

                {/* List */}
                <div className="flex justify-center items-center mt-6">
                    <div className="text-white w-full max-w-2xl px-4">
                        {todo.map((item, index) => (
                            <div key={index} className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-md shadow-md mb-3 transition-all duration-300 hover:shadow-lg">
                                {/* Task */}
                                <div className={`truncate w-full sm:w-[300px] text-white font-medium p-2 rounded-md ${item.completed ? "bg-gradient-to-r from-blue-700 to-green-700" : "bg-gradient-to-r from-blue-500 to-green-500"}`}>
                                    {item.task}
                                </div>

                                {/* Actions */}
                                <div className="flex gap-x-2 mt-2 sm:mt-0">
                                    <div className="text-sm text-gray-200">{formatTime(item.time)}</div>

                                    {!item.completed && (
                                        <>
                                            <button className="px-2 sm:px-3 py-1 bg-green-700 rounded-md text-white font-bold hover:bg-green-800 transition duration-200" onClick={() => handleComplete(item.id)}>✔</button>
                                            <button className="px-2 sm:px-3 py-1 bg-red-500 rounded-md text-white font-bold hover:bg-red-600 transition duration-200" onClick={() => handleDelete(item.id)}>✖</button>
                                            <button className="px-2 sm:px-3 py-1 bg-lime-400 rounded-md text-white font-bold hover:bg-lime-500 transition duration-200" onClick={() => handleChange(item.id, item.task)}>✏️</button>
                                        </>
                                    )}

                                    {item.changed && (
                                        <button className="px-2 sm:px-3 py-1 bg-orange-500 rounded-md text-white font-bold hover:bg-orange-600 transition duration-200" onClick={() => handleUpdate(item.id)}>🔄</button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    )
}
export default Layout;
