import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createBooking, validatePromo } from "../api/api";
import BackButton from "../components/BackButton";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { experience, slotId, quantity, selectedDate, selectedTime } = state || {};
  const [form, setForm] = useState({ fullName: "", email: "", promoCode: "" });
  const [total, setTotal] = useState(experience.price * quantity + 59);
  const [validPromo, setValidPromo] = useState(false);
  const [agree, setAgree] = useState(false);

  const applyPromo = async () => {
    const res = await validatePromo(form.promoCode);
    if (res.data.valid) {
      setValidPromo(true);
      if (res.data.promo.type === "percent")
        setTotal(total - (res.data.promo.value / 100) * total);
      else setTotal(total - res.data.promo.value);
    } else {
      alert("Invalid promo code");
    }
  };

  const confirmBooking = async () => {
  const res = await createBooking({
    fullName: form.fullName,
    email: form.email,
    slotId,
    qty: state.quantity,
    promoCode: validPromo ? form.promoCode : null,
  });

  navigate("/confirmation", { state: { ref: res.data.ref } });
};

  const isFormValid =
    form.fullName.trim() !== "" && form.email.trim() !== "" && agree;

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/*  Back Button */}
      <BackButton label="Checkout" to={`/details/${experience.id}`} />

      {/* ---------------- Layout ---------------- */}
      <div className="flex mt-4 flex-col md:flex-row gap-8">
        {/* ---------------- Left: Form ---------------- */}
        <div className="flex-1 self-start bg-gray-200 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <input
              className="border p-2 w-full rounded bg-gray-300"
              placeholder="Full name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
            <input
              className="border p-2 w-full rounded bg-gray-300"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="flex space-x-2 mb-3">
            <input
              className="border p-2 w-full rounded bg-gray-300"
              placeholder="Promo code"
              value={form.promoCode}
              onChange={(e) => setForm({ ...form, promoCode: e.target.value })}
            />
            <button
              onClick={applyPromo}
              className="bg-black text-white px-4 rounded-md cursor-pointer hover:bg-gray-800 transition"
            >
              Apply
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600 flex items-center">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mr-2"
            />
            I agree to the terms and safety policy
          </div>
        </div>

        {/* ---------------- Right: Summary Box ---------------- */}
        <div className="w-full md:w-80 bg-gray-200 border p-5 rounded-lg shadow-sm h-fit">
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Experience</span>
              <span>{experience.title}</span>
            </div>
            <div className="flex justify-between">
              <span>Date</span>
              <span>{selectedDate || "TBD"}</span>
            </div>
            <div className="flex justify-between">
              <span>Time</span>
              <span>{selectedTime || "TBD"}</span>
            </div>
            <div className="flex justify-between">
              <span>Qty</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{experience.price * quantity}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹59</span>
            </div>

            {/* Divider not touching borders */}
            <div className="mx-2 my-3 border-t border-gray-300"></div>

            <div className="flex justify-between font-semibold text-gray-900 text-base">
              <span>Total</span>
              <span>₹{Math.round(total)}</span>
            </div>
          </div>

          {/* Pay & Confirm Button */}
          <button
            onClick={confirmBooking}
            disabled={!isFormValid}
            className={`mt-4 w-full py-2 rounded-md font-medium transition 
              ${isFormValid
                ? "bg-yellow-400 hover:bg-yellow-500 text-black cursor-pointer"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            Pay and Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
