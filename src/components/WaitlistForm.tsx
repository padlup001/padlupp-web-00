import type { FC, FormEvent } from "react";
import { useState } from "react";
import type { AxiosError } from "axios";
import axios from "axios";

import { ArrowRight } from "lucide-react";

type WaitlistJoinRequest = {
  email: string;
  name: string;
  age: number;
  sex: string;
  country: string;
};

type WaitlistJoinResponse = {
  id: number;
  email: string;
  name: string;
  age: number;
  sex: string;
  country: string;
  created_at: string;
  updated_at: string;
};

type ApiErrorResponse = {
  detail?: string;
};

const API_BASE_URL =
  (import.meta.env.VITE_API_URL as string | undefined) ??
  "https://api.padlupp.com";

const WAITLIST_JOIN_URL = `${API_BASE_URL.replace(/\/$/, "")}/api-v1/waitlist/join/`;

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const parsedAge = Number(age);
    if (!Number.isFinite(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      setLoading(false);
      setError("Please enter a valid age.");
      return;
    }

    try {
      const payload: WaitlistJoinRequest = {
        email,
        name,
        age: parsedAge,
        sex,
        country,
      };

      const response = await axios.post<WaitlistJoinResponse>(
        WAITLIST_JOIN_URL,
        payload,
        {
          headers: {
            Accept: "application/json",
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
      const axiosError = err as AxiosError<ApiErrorResponse>;

      const apiMessage = axiosError.response?.data?.detail;
      if (apiMessage) {
        setError(apiMessage);
      } else if (axiosError.response?.status === 400) {
        setError("Please check your details and try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    const telegramLink = "https://t.me/+ijvNLk3ifQlmOTZk";

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
        {telegramLink && (
          <a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#0088cc] hover:bg-[#0077b3] text-white rounded-lg px-6 py-4 mb-4 transition-colors text-lg font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.911.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.098.155.23.171.324.016.094.037.308.021.475z"/>
            </svg>
            Join our Telegram Community
          </a>
        )}
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
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              className="mt-1 w-full bg-white/70 border border-blue-500 rounded-md px-3 py-2 focus:outline-none"
            >
              <option value="" disabled>Select a country</option>
              {[
                "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
                "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
                "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
                "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
                "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
                "Fiji", "Finland", "France",
                "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
                "Haiti", "Honduras", "Hungary",
                "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
                "Jamaica", "Japan", "Jordan",
                "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan",
                "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
                "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Myanmar",
                "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway",
                "Oman",
                "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
                "Qatar",
                "Romania", "Russia", "Rwanda",
                "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
                "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
                "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
                "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
                "Yemen",
                "Zambia", "Zimbabwe"
              ].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
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
