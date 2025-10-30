interface BookingSummaryProps {
  experience: any;
  quantity: number;
  setQuantity: (q: number) => void;
  selectedSlot: any;
  selectedTime: string;
  selectedDate: string;
  navigate: any;
}

export default function BookingSummary({
  experience,
  quantity,
  setQuantity,
  selectedSlot,
  selectedTime,
  selectedDate,
  navigate,
}: BookingSummaryProps) {
  const remainingSeats = selectedSlot
    ? selectedSlot.capacity - selectedSlot.booked
    : 0;
  const subtotal = experience.price * quantity;
  const tax = 59 * quantity;
  const total = subtotal + tax;

  const formattedDate = selectedDate
    ? new Date(selectedDate).toDateString().slice(4)
    : "";

  return (
    <div className="w-full md:w-80 bg-gray-200 rounded-lg border p-4 shadow-sm self-start">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">
        Booking Summary
      </h2>

      <div className="text-sm text-gray-700 space-y-2">
        <div className="flex justify-between">
          <span>Starts at</span>
          <span>₹{experience.price}</span>
        </div>

        {/* Quantity */}
        <div className="flex justify-between items-center">
          <span>Quantity</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className={`font-bold text-lg ${
                quantity > 1
                  ? "text-gray-700 hover:text-black cursor-pointer"
                  : "text-gray-400 cursor-not-allowed"
              }`}
            >
              –
            </button>
            <span>{quantity}</span>
            <button
              onClick={() =>
                setQuantity((q) =>
                  selectedSlot ? Math.min(remainingSeats, q + 1) : q
                )
              }
              disabled={!selectedSlot || quantity >= remainingSeats}
              className={`font-bold text-lg ${
                !selectedSlot || quantity >= remainingSeats
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:text-black cursor-pointer"
              }`}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span>Taxes</span>
          <span>₹{tax}</span>
        </div>

        <hr className="my-2 border-gray-300" />

        <div className="flex justify-between font-semibold text-gray-900">
          <span>Total</span>
          <span>₹{total}</span>
        </div>
      </div>

      <button
        onClick={() =>
          navigate("/checkout", {
            state: {
              experience,
              slotId: selectedSlot?.id,
              quantity,
              selectedDate,
              selectedTime: selectedSlot?.time,
            },
          })
        }
        disabled={!selectedTime}
        className={`mt-4 w-full py-2 rounded-md font-medium transition ${
          selectedTime
            ? "bg-yellow-300 hover:bg-yellow-400 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Confirm
      </button>
    </div>
  );
}
