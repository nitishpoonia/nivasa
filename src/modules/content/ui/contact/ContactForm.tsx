"use client";

import { useState } from "react";
import { Eyebrow } from "@/lib/ui/Eyebrow";
import { PillButton } from "@/lib/ui/PillButton";

const projectTypes = [
  "Private residence",
  "Hospitality",
  "Cultural / public",
  "Workspace",
  "Other",
];

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState(projectTypes[0]);
  const [message, setMessage] = useState("");

  return (
    <div>
      <Eyebrow className="mb-6">Project enquiry</Eyebrow>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="grid gap-6.5"
      >
        <label className="grid gap-2">
          <span className="text-subtle text-[12.5px]">Name</span>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className="border-foreground/30 text-foreground border-b bg-transparent py-2 text-base outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-subtle text-[12.5px]">Email</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className="border-foreground/30 text-foreground border-b bg-transparent py-2 text-base outline-none"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-subtle text-[12.5px]">Project type</span>
          <select
            value={projectType}
            onChange={(event) => setProjectType(event.target.value)}
            className="border-foreground/30 text-foreground border-b bg-transparent py-2 text-base outline-none"
          >
            {projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-subtle text-[12.5px]">
            Tell us about the project
          </span>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={4}
            placeholder="Location, scope, timeline…"
            className="border-foreground/30 text-foreground resize-y border-b bg-transparent py-2 text-base outline-none"
          />
        </label>
        <PillButton type="submit" className="mt-1.5">
          Send enquiry →
        </PillButton>
      </form>
    </div>
  );
}
