import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ArtPill - Studio de Design Global",
  description: "Créativité, stratégie et design pour imaginer des histoires percutantes pour l'architecture, les événements et les objets.",
};

export default function FrenchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
