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
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Waitlist response:", response.data);
      onSubmit(email);
      setSuccess(true);
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
      <form onSubmit={handleSubmit} className="relative w-full">
        <div className="w-full flex flex-col gap-2 sm:flex-row sm:gap-0 items-stretch bg-white/20 backdrop-blur-sm rounded-lg border border-blue-500 shadow-sm overflow-hidden justify-between px-2 py-2 sm:px-0 sm:py-0">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="johndoe@example.com"
            required
            className="w-full sm:flex-1 bg-transparent focus:outline-none text-gray-800 placeholder-gray-400 text-base sm:text-lg px-3 py-3 sm:px-6 sm:py-2 rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 rounded-md text-base sm:text-lg px-3 py-3 sm:px-6 sm:py-2 mt-2 sm:mt-0"
          >
            Join waitlist
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm mt-3 text-center px-2 break-words">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};
