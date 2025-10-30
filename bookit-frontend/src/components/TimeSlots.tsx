interface TimeSlotsProps {
  slots: any[];
  selectedDate: string;
  selectedTime: string;
  setSelectedTime: (id: string) => void;
}

export default function TimeSlots({
  slots,
  selectedDate,
  selectedTime,
  setSelectedTime,
}: TimeSlotsProps) {
  return (
    <div className="mt-3">
      <h3 className="font-medium mb-2">Choose Time</h3>
      <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
        {slots
          .filter((s) => s.date === selectedDate)
          .map((s) => {
            const remaining = s.capacity - s.booked;
            const isSoldOut = remaining <= 0;
            const isSelected = selectedTime === s.id;

            return (
              <button
                key={s.id}
                disabled={isSoldOut}
                onClick={() => !isSoldOut && setSelectedTime(s.id)}
                className={`flex items-center justify-between min-w-[140px] px-3 py-2 rounded-md border transition ${
                  isSoldOut
                    ? "bg-gray-200 border-gray-300 text-gray-500 cursor-not-allowed"
                    : isSelected
                    ? "bg-yellow-300 border-yellow-400"
                    : "bg-white hover:bg-yellow-100 cursor-pointer"
                }`}
              >
                <span className="font-medium">{s.time}</span>
                {isSoldOut ? (
                  <span className="text-gray-500 text-xs font-medium">
                     Sold Out
                  </span>
                ) : remaining < 3 ? (
                  <span className="text-red-500 text-xs font-medium">
                    {remaining} left
                  </span>
                ) : (
                  <span className="text-red-400 text-xs">{remaining} left</span>
                )}
              </button>
            );
          })}
      </div>
    </div>
  );
}
