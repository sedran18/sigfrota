"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/app/loading";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <Suspense key={pathname} fallback={<Loading />}>
      {children}
    </Suspense>
  );
}