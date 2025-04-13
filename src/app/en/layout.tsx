import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArtPill - Global Design Studio",
  description: "Creativity, strategy and design to imagine impactful stories for architecture, events and objects.",
};

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="en-layout">
      {children}
    </div>
  );
}
