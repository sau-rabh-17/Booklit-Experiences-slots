interface DateSelectorProps {
  dates: string[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  setSelectedTime: (time: string) => void;
  setQuantity: (q: number) => void;
}

export default function DateSelector({
  dates,
  selectedDate,
  setSelectedDate,
  setSelectedTime,
  setQuantity,
}: DateSelectorProps) {
  return (
    <div className="mt-5">
      <h3 className="font-medium mb-2">Choose Date</h3>
      <div className="flex flex-wrap gap-2">
        {dates.slice(0, 5).map((date) => (
          <button
            key={date}
            onClick={() => {
              setSelectedDate(date);
              setSelectedTime("");
              setQuantity(1);
            }}
            className={`px-3 py-1 rounded-md border ${
              selectedDate === date ? "bg-yellow-300" : "bg-white"
            }`}
          >
            {new Date(date).toDateString().slice(4, 10)}
          </button>
        ))}
      </div>
    </div>
  );
}
