import type { FC } from "react";
import { Image } from "./Image";
import { Link } from "./Link";
import { APP_SIGN_IN_URL, APP_SIGN_UP_URL } from "../appLinks";
import frameImage from "../assets/images/logo.png";

export const Header: FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src={frameImage}
                alt="Padlupp Logo"
                width={180}
                height={60}
                className="h-9 sm:h-12 w-auto"
              />
            </Link>
          </div>

          <nav aria-label="Account" className="flex shrink-0 items-center gap-2 sm:gap-4">
            <Link
              href={APP_SIGN_IN_URL}
              className="no-underline font-medium whitespace-nowrap px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign In
            </Link>
            <Link
              href={APP_SIGN_UP_URL}
              className="no-underline font-medium whitespace-nowrap bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white hover:text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
