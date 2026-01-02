
import Link from "next/link";
import { Header } from "./Header";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-neutral-50">
    
      <section className="w-full max-w-md text-center">
        <h1 className="text-2xl font-medium text-neutral-900 mb-6">
          Try one small thing. That’s enough.
        </h1>

        <div className="flex flex-col gap-3">
          <Link href="/onboarding/interests">
            <button className="rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white">

              Get started
          </button></Link>

        <Link href="/onboarding/interests">
          <button className="rounded-xl px-6 py-3 text-sm font-medium text-neutral-700">
            Continue as guest
          </button></Link>
        </div>
        {/* <Link href="/how-it-works">
        <button>How does it work?</button></Link> */}
      </section>
    </main>
  );
}
