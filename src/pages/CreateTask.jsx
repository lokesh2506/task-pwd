import { useState } from "react";
import { addTask } from "../services/taskService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const CreateTask = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

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

        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">
                Create Task
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
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
                <button className="bg-blue-600 text-white p-2 rounded">
                    Save Task
                </button>
            </form>
        </div>
    );
};

export default CreateTask;