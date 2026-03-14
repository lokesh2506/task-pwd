import { useState } from "react";
import { addTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Navbar from "../components/Navbar";

const CreateTask = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addTask({
                title,
                description,
                status: "pending",
                dueDate,
                userId: user.uid
            });

            console.log("Task added successfully");

            navigate("/dashboard");

        } catch (error) {

            console.error("Task creation error:", error);

        }finally{
            setLoading(false)
        }
    };

    return (
        <div class="h-screen  dark:bg-gray-800">
            <Navbar />
            <div className="p-6  w-full flex justify-center items-center flex-col ">
                <h1 className="text-2xl font-bold mb-4  dark:text-white"> Create Task</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md ">
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        className="border p-2 rounded"
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e)=>setDueDate(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`p-2 rounded text-white ${
                            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
                        }`}
                    >
                        {loading ? "Saving..." : "Save Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;