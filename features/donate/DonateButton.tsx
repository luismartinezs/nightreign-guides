import { Button } from "@/shared/components/button";

export function DonateButton() {
  const donationUrl = process.env.NEXT_PUBLIC_DONATION_URL;

  if (!donationUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn("Donation URL is not set.");
    }
    return null;
  }

  return (
    <a href={donationUrl} target="_blank" rel="noopener noreferrer">
      <Button>Donate</Button>
    </a>
  );
}
