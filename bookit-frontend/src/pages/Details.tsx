import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExperience } from "../api/api";
import BackButton from "../components/BackButton";
import DateSelector from "../components/DateSelector";
import TimeSlots from "../components/TimeSlots";
import AboutSection from "../components/AboutSection";
import BookingSummary from "../components/BookingSummary";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getExperience(id!)
      .then((res) => setExperience(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!experience) return <div>Not found</div>;

  const slots = experience.slots;
  const selectedSlot = slots.find((s: any) => s.id === selectedTime);

  return (
    <div className="max-w-6xl mx-auto p-1 flex flex-col gap-8">
      <BackButton label="Details" to="/" />
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={experience.image_url}
            alt={experience.title}
            className="w-full h-72 object-cover rounded-lg"
          />
          <h1 className="text-xl font-semibold mt-3">{experience.title}</h1>
          <p className="text-gray-500 mt-1">{experience.description}</p>

          <DateSelector
            dates={[...new Set(slots.map((s: any) => s.date))]}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            setQuantity={setQuantity}
          />

          <TimeSlots
            slots={slots}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />

          <AboutSection about={experience.about} />
        </div>

        <BookingSummary
          experience={experience}
          quantity={quantity}
          setQuantity={setQuantity}
          selectedSlot={selectedSlot}
          selectedTime={selectedTime}
          selectedDate={selectedDate}
          navigate={navigate}
        />

      </div>
    </div>
  );
}
