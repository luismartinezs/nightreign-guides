"use client";
import React, { useState } from "react";
import { FaShareAlt } from "react-icons/fa";
import { Button } from "@/shared/components/button";
import { toast, Toaster } from "sonner";

export const CopyToClipboard = ({ textToCopy }: { textToCopy: string }) => {
  const [, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).catch(() => {
      toast("Failed to copy");
    });
    toast("Link copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          // unstyled: true,
          className:
            "text-primary-500 border sm:border-2 border-primary-500 hover:bg-primary-500 hover:text-black focus:ring-offset-1 sm:focus:ring-offset-2 focus:ring-primary-500 focus:ring-1 sm:focus:ring-2 focus:ring-offset-slate-900 bg-slate-900",
        }}
      />
      <Button onClick={handleCopy} variant="nightreign" className="px-4 !mb-0">
        <FaShareAlt />
      </Button>
    </div>
  );
};
