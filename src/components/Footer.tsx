import type { FC } from "react";
import { Image } from "./Image";
import { Link } from "./Link";
import { Instagram, Linkedin } from "lucide-react";
import { X } from "lucide-react";
import frameImage from "../assets/images/logo.png";

export const Footer: FC = () => {
  return (
    <footer className="bg-white mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:space-x-8">
            <Link
              href="/"
              className="flex items-center justify-center md:justify-start"
            >
              <Image
                src={frameImage}
                alt="Padlupp Logo"
                width={180}
                height={60}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
            <div className="flex justify-center space-x-4 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gray-900">
                Terms of Use
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center space-y-4 md:items-end">
            <div className="text-sm text-gray-600 text-center md:text-right">
              Contact us:{" "}
              <Link href="mailto:hello@padlupp.com" className="text-blue-600">
                hello@padlupp.com
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
              <div className="text-sm text-gray-600">Follow us:</div>
              <div className="flex space-x-4">
                <Link
                  href="https://x.com/padlupp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  <X className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.instagram.com/padlupp?igsh=MTFoMXp5N28wYmo2dw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://www.linkedin.com/company/padlupp/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} · Powered by{" "}
          <span className="font-semibold">padlupp</span> · All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
