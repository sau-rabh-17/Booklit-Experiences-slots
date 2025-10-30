import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string; 
  to?: string; 
}

export default function BackButton({ label = "Back", to = "/" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center text-gray-700 font-medium  hover:text-yellow-500 transition"
    >
      <span className="text-xl mr-1">←</span> {label}
    </button>
  );
}
