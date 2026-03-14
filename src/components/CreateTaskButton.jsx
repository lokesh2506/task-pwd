import { useNavigate } from "react-router-dom";

const CreateTaskButton = () => {

  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/create-task")}
      className="fixed bottom-6 right-6 bg-blue-600 text-white w-14 h-14 rounded-full text-3xl shadow-lg hover:bg-blue-700"
    >
      +
    </button>
  );
};

export default CreateTaskButton;