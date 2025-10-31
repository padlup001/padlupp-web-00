import type { FC } from "react";
import { useState } from "react";
import { Image } from "./Image";
import { Link } from "./Link";
import { Menu, X } from "lucide-react";
import frameImage from "../assets/images/logo.png";

interface HeaderProps {
  hideNavigation?: boolean;
  onContactClick?: (e?: React.MouseEvent) => void;
}

export const Header: FC<HeaderProps> = ({
  hideNavigation = false,
  onContactClick,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleContact = (e?: React.MouseEvent) => {
    if (onContactClick) {
      e?.preventDefault();
      onContactClick(e);
    } else {
      window.location.href = "mailto:hello@padlupp.com";
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src={frameImage}
                alt="Padlupp Logo"
                width={180}
                height={60}
                className="h-12 w-auto md:h-13"
              />
            </Link>
            {!hideNavigation && (
              <nav className="hidden md:flex space-x-6">
                <a href="#hero" className="text-gray-600 hover:text-gray-900">
                  Home
                </a>
                <a
                  href="#why-padlupp"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Why Padupp
                </a>
                <a href="#tools" className="text-gray-600 hover:text-gray-900">
                  Tools
                </a>
              </nav>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* <Button
              variant="outline"
              className="hidden md:inline-flex border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={handleContact}
            >
              Contact us
            </Button> */}
            {!hideNavigation && (
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            )}
          </div>
        </div>

        {!hideNavigation && isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
            <nav className="flex flex-col space-y-4">
              <a
                href="#hero"
                className="text-gray-600 hover:text-gray-900 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#tools"
                className="text-gray-600 hover:text-gray-900 px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tools
              </a>
              <a
                href="#footer"
                className="text-blue-600 hover:text-blue-700 px-2 py-1"
                onClick={(e) => {
                  handleContact(e);
                  setIsMobileMenuOpen(false);
                }}
              >
                Contact us
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
