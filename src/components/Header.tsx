import type { FC } from "react";
import { Image } from "./Image";
import { Link } from "./Link";
import { Button } from "./Button";
import frameImage from "../assets/images/logo.png";

interface HeaderProps {
  hideNavigation?: boolean;
  onContactClick?: (e?: React.MouseEvent) => void;
  onJoinWaitlistClick?: (e?: React.MouseEvent) => void;
}

export const Header: FC<HeaderProps> = ({
  hideNavigation = false,
  onJoinWaitlistClick,
}) => {


  const handleJoin = (e?: React.MouseEvent) => {
    if (onJoinWaitlistClick) {
      e?.preventDefault();
      onJoinWaitlistClick(e);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center">
              <Image
                src={frameImage}
                alt="Padlupp Logo"
                width={180}
                height={60}
                className="h-10 sm:h-12 w-auto"
              />
            </Link>
          </div>

        <div className="flex items-center space-x-4">
          {!hideNavigation && onJoinWaitlistClick && (
            <Button
              onClick={handleJoin}
              className="bg-gradient-to-r from-[#4E92F4] to-[#7938BE] hover:from-[#4182E4] hover:to-[#6928AE] text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Join the Waitlist
            </Button>
          )}
        </div>
        </div>

        
      </div>
    </header>
  );
};
