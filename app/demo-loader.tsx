"use client";

import dynamic from "next/dynamic";

const Demos = dynamic(() => import("./demos"), {
  ssr: false,
  loading: () => <p className="loading">Loading calendars...</p>,
});

export default function DemoLoader() {
  return <Demos />;
}
