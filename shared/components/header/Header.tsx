"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { BsChevronRight } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";

import { BurgerButton } from "@/shared/components/header/BurgerButton";
import { EldenRingLogo } from "@/shared/components/EldenRingLogo";
import { CopyToClipboard } from "@/shared/components/CopyToClipboard";
import { Link } from "@/shared/components/Link";
import { cn } from "@/shared/utils/cn";
import { PrimaryLink } from "@/shared/components/PrimaryLink";

const links: { label: string; href: string, mobileOnly?: boolean }[] = [
  {
    label: "Resources",
    href: "/#resources",
  },
];

const socialLinks = [
  {
    label: "X",
    icon: FaXTwitter,
    href: "https://twitter.com/LuisMartinezSu2",
  },
  {
    label: "Github",
    icon: FaGithub,
    href: "https://github.com/luismartinezs/nightreign-guides",
  },
];

function LogoLink(props: React.ComponentPropsWithoutRef<"a">) {
  const { className, ...otherProps } = props;
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-3 hover:opacity-70", className)}
      {...otherProps}
    >
      <EldenRingLogo />
    </Link>
  );
}

export function Header(props: React.ComponentPropsWithoutRef<"header">) {
  const { className, ...otherProps } = props;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  const closeMenu = () => {
    setOpen(false);
  };

  const openMenu = () => {
    setOpen(true);
  };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  return (
    <header className={cn(className, "bg-slate-800 px-2 py-2")} {...otherProps}>
      <nav className="px-4 text-white xl:px-6">
        <div className="relative mx-auto flex max-w-screen-xl flex-wrap items-center justify-between py-2">
          <LogoLink className="xl:hidden" />
          <PrimaryLink className="text-xl font-bold xl:hidden" href="/">
            <span className="text-primary-300">Nightreign</span>
            <span className="text-secondary-300">Hub</span>
          </PrimaryLink>
          <div className="flex items-center xl:order-2 xl:hidden">
            <div className="mr-2">
              <CopyToClipboard textToCopy={currentUrl} />
            </div>
            <BurgerButton onClick={openMenu} />
          </div>
          <div className="hidden w-full items-center justify-between gap-12 xl:order-1 xl:flex">
            <div className="flex items-center gap-4">
              <LogoLink />
              <PrimaryLink href="/" className="hidden text-xl font-bold xl:block">
                <span className="text-primary-300">Nightreign</span>
                <span className="text-secondary-300">Hub</span>
              </PrimaryLink>
            </div>
            <ul className="mt-4 flex flex-col items-center font-medium xl:mt-0 xl:flex-row xl:space-x-8">
              <li className="flex items-center justify-center">
                <CopyToClipboard textToCopy={currentUrl} />
              </li>
              {links
                .filter((link) => !link.mobileOnly)
                .map((link) => (
                  <li key={link.label}>
                    <PrimaryLink href={link.href} className="whitespace-nowrap">
                      {link.label}
                    </PrimaryLink>
                  </li>
                ))}
            </ul>
          </div>

          {/* MOBILE NAV BAR */}
          {open && (
            <div
              className={cn(
                "fixed inset-4 z-10 grid grid-cols-1 text-white transition-opacity duration-500 ease-out md:grid-cols-2 xl:hidden",
                open ? "opacity-100" : "pointer-events-none opacity-0"
              )}
              id="mobile-menu"
            >
              <div className="col-span-1 hidden md:block"></div>
              <div
                className={cn(
                  "col-span-1 rounded-xl bg-black text-white shadow-xl transition-opacity duration-300 ease-out xl:hidden"
                )}
              >
                <div className="flex h-full flex-col items-center">
                  <div className="flex w-full items-start justify-between px-6 pt-4">
                    <div className="flex items-center gap-2">
                      <LogoLink className="scale-50" />
                      <span>Nightreign Guides</span>
                    </div>
                    <button
                      onClick={closeMenu}
                      className="max-h-[50px] self-end rounded-xl p-2 text-white hover:bg-slate-800"
                    >
                      <AiOutlineClose color="#ffffff" size={30} />
                    </button>
                  </div>
                  <ul className="mt-4 flex w-full flex-col items-center text-xl text-white">
                    {links.map((link) => (
                      <li
                        key={link.label}
                        className="w-full border-b border-slate-500 last:border-0"
                      >
                        <PrimaryLink
                          onClick={closeMenu}
                          href={link.href}
                          className="flex w-full items-center justify-between px-6 py-5 hover:text-primary-500"
                        >
                          <span className="font-semibold">{link.label}</span>
                          <BsChevronRight size={20} strokeWidth={1} />
                        </PrimaryLink>
                      </li>
                    ))}
                  </ul>
                  {/* social links */}
                  <ul className="flex w-full items-center justify-center border-t border-slate-700 pt-4">
                    {socialLinks.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="flex items-center justify-center gap-2 p-4 text-xl text-slate-300 hover:text-white"
                          target="_blank"
                        >
                          <link.icon size={20} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
