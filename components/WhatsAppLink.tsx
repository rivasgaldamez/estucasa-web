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
      // Conversión de Google Ads
      (window as any).gtag("event", "conversion", {
        send_to: "AW-608784098/dtLHCLDGnMQcEOKdpaIC",
      });

      // Evento para Google Analytics (GA4)
      (window as any).gtag("event", "click_whatsapp", {
        event_category: "engagement",
        event_label: "WhatsApp Click",
      });
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}