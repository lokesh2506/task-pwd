import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const CreateTaskButton = () => {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create-task")}
      className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 flex items-center justify-center rounded-full text-2xl shadow-lg hover:bg-blue-700"
    >
      <FaPlus />
    </button>
  );
};

export default CreateTaskButton;