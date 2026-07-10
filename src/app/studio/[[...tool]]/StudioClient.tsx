"use client";

import { useEffect, useState } from "react";

export default function StudioClient() {
  const [Comp, setComp] = useState<React.ComponentType<object> | null>(null);

  useEffect(() => {
    Promise.all([
      import("next-sanity/studio"),
      import("@/../sanity.config"),
    ]).then(([mod, config]) => {
      const NextStudio = mod.NextStudio;
      const StudioComponent = () => <NextStudio config={config.default || config} />;
      setComp(() => StudioComponent);
    });
  }, []);

  if (!Comp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-dark-green border-t-transparent" />
      </div>
    );
  }

  return <Comp />;
}
