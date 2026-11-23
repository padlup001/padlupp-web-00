import type { FC } from "react";
import { Instagram, Linkedin, X } from "lucide-react";
import logoImage from "../assets/images/logo.png";
import { CONTAINER, Reveal } from "./motion";
import { cn } from "../utils/cn";

const SOCIAL_LINKS = [
  { label: "Padlupp on X", href: "https://x.com/padlupp", Icon: X },
  {
    label: "Padlupp on Instagram",
    href: "https://www.instagram.com/padlupp?igsh=MTFoMXp5N28wYmo2dw==",
    Icon: Instagram,
  },
  {
    label: "Padlupp on LinkedIn",
    href: "https://www.linkedin.com/company/padlupp/posts/?feedView=all",
    Icon: Linkedin,
  },
];

const textLink =
  "relative text-slate-600 no-underline transition-colors hover:text-ink after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100";

export const Footer: FC = () => (
  <footer id="contact" className="border-t border-slate-100 bg-white">
    <Reveal className={cn(CONTAINER, "py-12")} y={16}>
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
          <a href="/" className="flex items-center">
            <img src={logoImage} alt="Padlupp Logo" width={180} height={60} className="h-10 w-auto sm:h-12" loading="lazy" />
          </a>
          <div className="flex gap-5 text-sm">
            <a href="/privacy" className={textLink}>
              Privacy Policy
            </a>
            <a href="/terms" className={textLink}>
              Terms of Use
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 md:items-end">
          <p className="text-center text-sm text-slate-600 md:text-right">
            Contact us:{" "}
            <a href="mailto:hello@padlupp.com" className="font-medium text-brand-blue no-underline hover:underline">
              hello@padlupp.com
            </a>
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-600">Follow us:</span>
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full bg-blue-50 text-brand-blue ring-1 ring-blue-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gradient-to-br hover:from-brand-blue hover:to-brand-purple hover:text-white hover:shadow-lg"
              >
                <Icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-slate-100 pt-6 pb-14 text-center text-sm text-slate-500 sm:pb-0">
        © {new Date().getFullYear()} · Powered by <span className="font-semibold">padlupp</span> · All
        Rights Reserved.
      </div>
    </Reveal>
  </footer>
);
