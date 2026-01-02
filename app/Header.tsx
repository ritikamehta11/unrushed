"use client";
import Link from "next/link";
import React, { use } from "react";

export const Header = () => {
  return (
    <header className="w-full border-b border-neutral-200 bg-white flex items-center justify-between">
      <div className="max-w-2xl  px-6 py-4">
        <h1 className="text-lg font-medium text-neutral-900">
          Unrushed
        </h1>
        <p className="text-xs text-neutral-500">
          Try one small thing at your own pace
        </p>
      </div>
      <div className="max-w-2xl px-6 py-4 flex gap-4">
       <button onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }} className="text-sm text-neutral-500 underline">Reset</button>
        <Link href='/info'><button className="text-sm text-neutral-500 underline">How does it work?</button></Link>
        <button className="text-sm text-neutral-500 underline">Profile</button>
      </div>
    </header>
  );
};
