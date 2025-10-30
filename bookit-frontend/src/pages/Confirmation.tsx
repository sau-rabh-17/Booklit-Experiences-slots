import { useNavigate, useLocation } from "react-router-dom";

export default function Confirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const ref = state?.ref || "N/A";

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center">
      <div className="text-green-500 text-5xl mb-3">✓</div>
      <h1 className="text-xl font-semibold">Booking Confirmed</h1>
      <p className="text-gray-500 mt-1">
        Ref ID: <span className="font-semibold text-black">{ref}</span>
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-5 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 transition rounded-md font-medium cursor-pointer"
      >
        Back to Home
      </button>
    </div>
  );
}
