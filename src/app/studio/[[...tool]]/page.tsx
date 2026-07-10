"use client";

import dynamic from "next/dynamic";

const StudioPage = dynamic(
  () => import("./StudioClient"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-dark-green border-t-transparent" />
      </div>
    ),
  }
);

export default function Page() {
  return <StudioPage />;
}
