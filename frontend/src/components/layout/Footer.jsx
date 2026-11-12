import React from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { Mark, Wordmark } from "@/components/Compass";

export const Footer = () => (
  <footer className="relative z-10 border-t border-[var(--line)]" data-testid="footer">
    <div className="mx-auto max-w-[1500px] px-6 py-20 md:px-12">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="flex items-center gap-4">
            <Mark size={30} />
            <Wordmark height={22} />
          </div>
          <p className="mt-6 flex flex-wrap gap-x-3 font-serif text-2xl text-[var(--brass)]">
            {["Direction", "Clarity", "Conviction", "Precision"].map((w, i) => (
              <span key={w} className="whitespace-nowrap">{i ? "· " : ""}{w}</span>
            ))}
          </p>
          <p className="mt-4 font-sans text-xs tracking-[0.24em] text-[var(--grey-2)]">
            SYMSTRUO PRIVATE LIMITED · BENGALURU, INDIA
          </p>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-6">Site</p>
          <ul className="space-y-3 font-sans text-sm text-[var(--ivory-dim)]">
            {[
              ["Home", "/"],
              ["About SYMSTRUO", "/about"],
              ["Services", "/services"],
              ["NDA & Confidentiality", "/nda"],
              ["Insights", "/insights"],
              ["FAQ", "/faq"],
              ["Contact", "/#contact"],
            ].map(([label, href]) => (
              <li key={href}>
                <Link to={href} className="link-underline inline-block transition-colors hover:text-[var(--brass)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="eyebrow mb-6">Connect</p>
          <ul className="space-y-3 font-sans text-sm text-[var(--ivory-dim)]">
            <li>
              <div className="flex items-center gap-4">
                <a href="https://www.linkedin.com/company/symstruo-private-limited/" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--brass)]" aria-label="Company LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://www.instagram.com/symstruo" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--brass)]" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="https://x.com/symstruo?s=11" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[var(--brass)]" aria-label="X (Twitter)">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </li>
            <li>
              <a href="mailto:dhanush@symstruo.com" className="link-underline inline-block">
                dhanush@symstruo.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div
        aria-hidden="true"
        data-testid="footer-mega"
        className="footer-mega mt-24 select-none overflow-hidden whitespace-nowrap text-center font-serif text-[17vw] leading-[0.8] tracking-[-0.02em] md:text-[16vw] lg:text-[17rem]"
      >
        SYMSTRUO
      </div>
      <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-8 text-[0.7rem] tracking-[0.24em] text-[var(--grey-2)] md:flex-row">
        <span>© {new Date().getFullYear()} SYMSTRUO PRIVATE LIMITED</span>
        <span className="text-[var(--brass)]">+89° 15′ · TRUE NORTH</span>
        <span>DIRECTION · CLARITY · CONVICTION · PRECISION</span>
      </div>
    </div>
  </footer>
);

