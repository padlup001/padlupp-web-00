import type { FC } from "react";
import { useState } from "react";
import type { AxiosError } from "axios";
import axios from "axios";

import { ArrowRight } from "lucide-react";

// Configure axios defaults - use proxy in development, relative URLs in production
if (import.meta.env.DEV) {
  // In development, use relative URLs to leverage Vite's proxy
  axios.defaults.baseURL = "";
} else {
  // In production, use the full URL since we're serving from the same server
  axios.defaults.baseURL = "";
}

interface WaitlistFormProps {
  onSubmit: (email: string) => void;
  onBack: () => void;
}

export const WaitlistForm: FC<WaitlistFormProps> = ({ onSubmit, onBack }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState("male");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "/api/waitlist/join",
        { name, age: Number(age), sex, email, country },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Waitlist response:", response.data);
      onSubmit(email);
      setSuccess(true);
      window.dispatchEvent(
        new CustomEvent("waitlist:subscribed", { detail: { email } })
      );
      setName("");
      setAge("");
      setSex("male");
      setCountry("");
      setEmail("");
    } catch (err) {
      console.error("Waitlist submission error:", err);
      const error = err as AxiosError<{ error: string }>;

      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else if (error.response?.status === 409) {
        setError("This email is already registered.");
      } else if (error.response?.status === 400) {
        setError("Please enter a valid email address.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto bg-white/100 rounded-lg p-8 text-center">
        <h3 className="text-[32px] font-semibold text-gray-900 mb-4">
          You have been added to waitlist!
        </h3>
        <p className="text-gray-600 text-lg mb-8">
          Further updates will be shared with you
          <br />
          via the email you registered with.
        </p>
        <button
          onClick={onBack}
          className="w-full bg-blue-500 text-white py-4 px-6 rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Back to screen
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto">
      <p className="text-center text-gray-700 mb-3 px-2">
        kindly fill out the form so we can find you the right accountability partner
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 w-full bg-white/70 border border-blue-500 rounded-md px-3 py-2 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input id="age" type="number" min={0} max={120} value={age} onChange={(e) => setAge(e.target.value)} required className="mt-1 w-full bg-white/70 border border-blue-500 rounded-md px-3 py-2 focus:outline-none" />
          </div>
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-gray-700">Sex</label>
            <select id="sex" value={sex} onChange={(e) => setSex(e.target.value)} required className="mt-1 w-full bg-white/70 border border-blue-500 rounded-md px-3 py-2 focus:outline-none">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer_not_to_say">Prefer not to say</option>
            </select>
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} required className="mt-1 w-full bg-white/70 border border-blue-500 rounded-md px-3 py-2 focus:outline-none" />
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-stretch bg-white/20 backdrop-blur-sm rounded-lg border border-blue-500 shadow-sm overflow-hidden justify-between px-2 py-2 sm:px-0 sm:py-0">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="johndoe@example.com" required className="w-full sm:flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 text-base sm:text-lg px-3 py-3 sm:px-6 sm:py-2 rounded-md" />
          <button type="submit" disabled={loading} className="w-full sm:w-auto bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 rounded-md text-base sm:text-lg px-3 py-3 sm:px-6 sm:py-2 mt-2 sm:mt-0">
            Join waitlist
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-1 text-center px-2 break-words">{error}</p>
        )}
      </form>
    </div>
  );
};
