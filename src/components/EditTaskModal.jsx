import { useState } from "react";
import { updateTask } from "../services/taskService";
import toast from "react-hot-toast";

const EditTaskModal = ({ task, close }) => {

  const [title,setTitle] = useState(task.title);
  const [description,setDescription] = useState(task.description);
  const [dueDate,setDueDate] = useState(task.dueDate || "");

  const handleUpdate = async () => {
    if (!title.trim() || !description.trim() || !dueDate) {
      toast.error("All fields are required", {
        id: "required-error"
      });
      return;
    }
    await updateTask(task.id,{
      title,
      description,
      dueDate
    });
    close();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Edit Task</h2>
        <input
          className="border p-2 w-full mb-2"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <textarea
          className="border p-2 w-full mb-2"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 w-full mb-4"
          value={dueDate}
          onChange={(e)=>setDueDate(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button onClick={close} className="px-3 py-1 border" >
            Cancel
          </button>
          <button onClick={handleUpdate} className="bg-blue-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </div>
      </div>
    </div>

  );
};

export default EditTaskModal;