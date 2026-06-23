"use client";

import { ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
};

export default function WhatsAppLink({ href, className, children, ariaLabel, onClick }: Props) {
  function handleClick() {
    if (onClick) onClick();
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: "AW-608784098/dtLHCLDGnMQcEOKdpaIC",
      });
    }
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}