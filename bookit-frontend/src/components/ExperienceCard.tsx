import { Link } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  location?: string;
}

export default function ExperienceCard({ id, title, price, imageUrl, location }: Props) {
  return (
    <div className="bg-gray-200 rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition">
      <img src={imageUrl} alt={title} className="w-full h-44 object-cover" />
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-base">{title}</h3>
          {location && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
              {location}
            </span>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-1">
          Curated small-group experience. Certified guide.
        </p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold text-gray-900">From ₹{price}</span>
          <Link to={`/details/${id}`}>
            <button className="bg-yellow-400 hover:bg-yellow-500 bg-brand px-3 py-1 rounded-md font-medium text-sm cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
