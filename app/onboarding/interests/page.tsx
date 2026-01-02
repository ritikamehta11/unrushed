"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InterestCard from "./interestCard";
import taskbank from '../../../data/taskBank.json'
import Link from "next/link";
// const INTERESTS = [
//   { label: "Art", icon: "🎨" },
//   { label: "Nature", icon: "🌿" },
//   { label: "Writing", icon: "✍️" },
//   { label: "Movement", icon: "🧘‍♀️" },
//   { label: "Food", icon: "🍵" },
//   { label: "Music", icon: "🎧" },
//   { label: "Learning", icon: "📚" },
// ];
const INTERESTS = taskbank.themes.map(theme => ({
  label: theme.id,
  name: theme.name,
  icon: theme.icon
}));

export default function InterestsPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const router = useRouter();

  const toggleInterest = (label: string) => {
    if (selected.includes(label)) {
      setSelected(selected.filter((item) => item !== label));
      return;
    }

    if (selected.length >= 3) return;

    setSelected([...selected, label]);
  };

  const handleContinue = () => {
    localStorage.setItem("userInterests", JSON.stringify(selected));
    router.replace("/month/current");
  };

  const handleSkip = () => {
    localStorage.setItem("userInterests", JSON.stringify([]));
    router.push("/month/current");
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-neutral-50">
      <section className="mx-auto max-w-md">
        <header className="mb-8 text-center">
          <h1 className="text-2xl font-medium text-neutral-900 mb-2">
            What are you curious about?
          </h1>
          <p className="text-sm text-neutral-600">
            Pick a few — or skip.
          </p>
        </header>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {INTERESTS.map((interest) => (
            <InterestCard
              key={interest.label}
              label={interest.label}
              icon={interest.icon}
              selected={selected.includes(interest.label)}
              onClick={() => toggleInterest(interest.label)}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <Link href="/month/current">
          <button
            onClick={handleContinue}
            disabled={selected.length > 3}
            className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button></Link>

          <Link href="/month/current">
          <button
            onClick={handleSkip}
            className="rounded-xl px-6 py-3 text-sm font-medium text-neutral-700"
          >
            Skip
          </button></Link>
        </div>
      </section>
    </main>
  );
}
