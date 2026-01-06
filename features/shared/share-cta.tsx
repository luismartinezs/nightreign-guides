"use client";

import { useState, useEffect } from "react";
import { Button } from "@/shared/components/button";
import {
  FaShare,
  FaLink,
  FaTwitter,
  FaReddit,
  FaWhatsapp,
  FaTelegram,
  FaFacebook,
  FaEnvelope,
  FaEllipsisH,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "sonner";
import { createPortal } from "react-dom";

export function ShareCTA() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
      setTitle(document.title);
      setCanShare(!!navigator.share);
    }
  }, []);

  const handleShare = async (
    platform:
      | "twitter"
      | "reddit"
      | "whatsapp"
      | "telegram"
      | "facebook"
      | "email"
      | "native"
      | "copy"
  ) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    switch (platform) {
      case "twitter":
        window.open(
          `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
          "_blank"
        );
        setIsOpen(false);
        break;
      case "reddit":
        window.open(
          `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
          "_blank"
        );
        setIsOpen(false);
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
          "_blank"
        );
        setIsOpen(false);
        break;
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
          "_blank"
        );
        setIsOpen(false);
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          "_blank"
        );
        setIsOpen(false);
        break;
      case "email":
        window.open(
          `mailto:?subject=${encodedTitle}&body=${encodedTitle}%0A${encodedUrl}`,
          "_self"
        );
        setIsOpen(false);
        break;
      case "native":
        try {
          await navigator.share({
            title: title,
            text: title,
            url: url,
          });
          setIsOpen(false);
        } catch (err) {
          console.error("Error sharing:", err);
        }
        break;
      case "copy":
        navigator.clipboard
          .writeText(url)
          .then(() => {
            toast.success("Link copied to clipboard!");
          })
          .catch(() => {
            toast.error("Failed to copy link.");
          });
        setIsOpen(false);
        break;
    }
  };

  // Prevent hydration mismatch for portal
  if (!mounted) return null;

  return (
    <>
      <div className="flex flex-col items-center gap-2 p-8 text-center">
        <Button
          onClick={() => setIsOpen(true)}
          variant="nightreign"
          className="flex items-center gap-2 px-8 py-3 text-lg font-bold rounded-full"
        >
          <FaShare className="w-5 h-5" />
          Share
        </Button>
        <p className="text-sm text-gray-400">
          share if you think this page is useful
        </p>
      </div>

      {isOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-sm bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              <h3 className="text-xl font-bold mb-6 text-white">
                Share this guide
              </h3>

              <div className="flex flex-col gap-3">
                {canShare && (
                  <button
                    onClick={() => handleShare("native")}
                    className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                  >
                    <div className="p-2 bg-gray-600 rounded-lg group-hover:scale-110 transition-transform">
                      <FaEllipsisH className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium">More Options...</span>
                  </button>
                )}

                <button
                  onClick={() => handleShare("twitter")}
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                >
                  <div className="p-2 bg-black rounded-lg group-hover:scale-110 transition-transform">
                    <FaXTwitter className="w-5 h-5" />
                  </div>
                  <span className="font-medium">X / Twitter</span>
                </button>

                <button
                  onClick={() => handleShare("reddit")}
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                >
                  <div className="p-2 bg-[#FF4500] rounded-lg group-hover:scale-110 transition-transform">
                    <FaReddit className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Reddit</span>
                </button>

                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                >
                  <div className="p-2 bg-[#25D366] rounded-lg group-hover:scale-110 transition-transform">
                    <FaWhatsapp className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </button>

                <button
                  onClick={() => handleShare("telegram")}
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                >
                  <div className="p-2 bg-[#0088cc] rounded-lg group-hover:scale-110 transition-transform">
                    <FaTelegram className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Telegram</span>
                </button>

                <button
                  onClick={() => handleShare("facebook")}
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                >
                  <div className="p-2 bg-[#1877F2] rounded-lg group-hover:scale-110 transition-transform">
                    <FaFacebook className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Facebook</span>
                </button>

                <button
                  onClick={() => handleShare("email")}
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                >
                  <div className="p-2 bg-gray-500 rounded-lg group-hover:scale-110 transition-transform">
                    <FaEnvelope className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Email</span>
                </button>

                <button
                  onClick={() => handleShare("copy")}
                  className="flex items-center gap-3 p-3 w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors text-white text-left group"
                >
                  <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                    <FaLink className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium">Copy Link</span>
                </button>
              </div>
            </div>

            {/* Backdrop click to close */}
            <div
              className="absolute inset-0 z-[-1]"
              onClick={() => setIsOpen(false)}
            />
          </div>,
          document.body
        )}
    </>
  );
}
