import React from "react";
// import { Header } from "../Header";

export default function Info() {
  return (
    <>
    {/* <Header/> */}
    <section className="max-w-2xl mx-auto px-6 py-10 space-y-10 text-neutral-800">

      {/* What is Unrushed */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-neutral-900">
          What is Unrushed?
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          Unrushed is a quiet space for trying new things without pressure.
          It isn’t a productivity app or a habit tracker. There are no goals to
          chase and no streaks to maintain. Just gentle ideas you can explore
          when you feel like it.
        </p>
      </div>

      {/* How it works */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-neutral-900">
          How does it work?
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          Each month, you’re given one theme and five small tasks related to it.
          You can choose interests at the start or let everything be random.
          Once a month is created, it stays the same — so you can return anytime
          without things changing.
        </p>
        <ul className="list-disc pl-5 text-sm text-neutral-600 space-y-1">
          <li>Try a task if it feels right</li>
          <li>Reflect briefly, or don’t</li>
          <li>Skip anything without guilt</li>
        </ul>
      </div>

      {/* How it helps */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-neutral-900">
          How can it help you?
        </h2>
        <p className="text-sm leading-relaxed text-neutral-600">
          Unrushed helps you explore curiosity in small, manageable ways.
          It’s for moments when you want something different — but not demanding.
          Some months you may try everything. Some months, nothing at all.
          Both are okay.
        </p>
      </div>

      {/* Closing note */}
      <div className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-700">
        You don’t need to rush.
        Trying one small thing is enough.
      </div>

      </section>
    </>
  );
};
