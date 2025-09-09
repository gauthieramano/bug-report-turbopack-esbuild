"use client";

import { useEffect, useState } from "react";

const LOADING = <div className="content-center text-center">Loading…</div>;

export default function Home() {
  const [FetchedJsx, setFetchedJsx] = useState<null | React.ComponentType>(
    null,
  );

  useEffect(() => {
    let isCancelled = false;

    (async () => {
      const modulePath = "/api/remote";

      const fetchedModule = await import(
        // Comment to avoid Build Error: Module not found: Can't resolve './api/remote'
        /* webpackIgnore: true */ modulePath
      );

      if (!isCancelled) {
        setFetchedJsx(() => fetchedModule.default ?? null);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="grid min-h-screen p-8 font-sans sm:p-20">
      {FetchedJsx ? <FetchedJsx /> : LOADING}
    </div>
  );
}
