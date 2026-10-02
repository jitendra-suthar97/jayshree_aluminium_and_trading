"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addressLine, mapEmbedUrl } from "@/lib/contact";

/** The Google map loads only when asked: no third-party scripts on first paint. */
export function MapFacade() {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={mapEmbedUrl}
        title="Map showing the shop location"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full border border-border md:aspect-[16/9]"
      />
    );
  }

  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-4 border border-border bg-muted p-6 text-center md:aspect-[16/9]">
      <MapPin size={28} aria-hidden />
      <p className="max-w-[32ch] text-body">{addressLine}</p>
      <Button variant="outline" onClick={() => setLoaded(true)}>
        Load map
      </Button>
    </div>
  );
}
