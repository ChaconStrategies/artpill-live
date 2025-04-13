'use client';

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Import custom cursor client-side only
const CustomCursor = dynamic(() => import("./custom-cursor"), { ssr: false });

export default function ClientCursorWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      {children}
    </>
  );
}
