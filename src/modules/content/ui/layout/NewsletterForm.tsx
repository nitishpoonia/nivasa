"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");

  return (
    <div className="border-footer-fg/30 flex max-w-65 items-center gap-2.5 border-b pb-2">
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email address"
        className="text-background placeholder:text-footer-fg flex-1 bg-transparent text-sm outline-none"
      />
      <span className="text-accent">→</span>
    </div>
  );
}
