"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
  NavbarButton,
} from "@/components/core/navbar-components";

const navItems = [
  {
    name: "Home",
    link: "/",
    dropdown: [
      { name: "News", link: "/news" },
      { name: "Contact", link: "/contact" },
      { name: "Dashboard", link: "/dashboard" },
    ],
  },
  {
    name: "Chemistry",
    link: "/chemistry",
  },
  {
    name: "Cleaning Systems",
    link: "/cleaning-systems",
  },
  {
    name: "Hygienic Process",
    link: "/hygienic-process-solutions",
  },
  {
    name: "Courses & Audit",
    link: "/courses-audit",
  },
];

export function MarketingNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody className="px-6">
        <NavbarLogo href="/" />
        <NavItems
          items={navItems}
          onItemClick={() => setMobileMenuOpen(false)}
        />
        <div className="flex-1" />
      </NavBody>

      {/* Persistent Webshop Button - stays visible when scrolling */}
      <NavbarButton
        href="/shop"
        variant="dark"
        className="hidden lg:block shrink-0"
        showIconWhenVisible={true}
        icon={<ShoppingBag className="w-5 h-5" />}
      >
        Webshop
      </NavbarButton>

      {/* Mobile Navigation */}
      <MobileNav className="px-4">
        <MobileNavHeader>
          <NavbarLogo href="/" />
          <MobileNavToggle
            isOpen={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          {navItems.map((item) => (
            <div key={item.link} className="w-full">
              <Link
                href={item.link}
                className="block w-full text-slate-600 hover:text-slate-900 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
              {item.dropdown && (
                <div className="pl-4 space-y-2 mt-2">
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.link}
                      href={subItem.link}
                      className="block text-sm text-slate-500 hover:text-slate-700 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <NavbarButton
            href="/shop"
            variant="dark"
            className="w-full text-center mt-4"
          >
            Webshop
          </NavbarButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
