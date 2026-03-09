"use client";

import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    dropdown?: {
      name: string;
      link: string;
    }[];
  }[];
  className?: string;
  onItemClick?: () => void;
  visible?: boolean;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-4 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(7px)" : "blur(0px)",
        boxShadow: visible
          ? "none"
          : "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        width: visible ? "100%" : "fit-content",
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-60 mx-auto hidden w-full max-w-7xl flex-row items-center justify-start self-start rounded-full bg-card/80 px-4 py-2 lg:flex",
        !visible && "bg-card/80 rounded-full",
        visible && "bg-transparent rounded-none",
        className,
      )}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick, visible }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);

  return (
    <motion.div
      animate={{
        opacity: visible ? 0 : 1,
        pointerEvents: visible ? "none" : "auto",
      }}
      onMouseLeave={() => {
        setHovered(null);
        setDropdownOpen(null);
      }}
      className={cn(
        "hidden flex-row items-center justify-center gap-1 text-sm font-medium text-foreground/70 transition duration-200 hover:text-foreground lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`link-${idx}`}
          className="relative"
          onMouseEnter={() => {
            setHovered(idx);
            if (item.dropdown) {
              setDropdownOpen(idx);
            }
          }}
          onMouseLeave={() => {
            if (!item.dropdown) {
              setHovered(null);
            }
          }}
        >
          <a
            onClick={onItemClick}
            className="relative px-3 py-2 text-foreground/70 hover:text-primary block whitespace-nowrap"
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-muted"
              />
            )}
            <span className="relative z-20">{item.name}</span>
          </a>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {item.dropdown && dropdownOpen === idx && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full mt-2 w-48 rounded-lg bg-card border border-border shadow-lg py-2"
              >
                {item.dropdown.map((subItem, subIdx) => (
                  <a
                    key={`dropdown-${idx}-${subIdx}`}
                    href={subItem.link}
                    onClick={onItemClick}
                    className="block px-4 py-2 text-sm text-foreground/70 hover:bg-muted hover:text-primary transition-colors"
                  >
                    {subItem.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(1px)" : "blur(0px)",
        boxShadow: visible
          ? "none"
          : "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        width: visible ? "100%" : "90%",
        paddingRight: visible ? "0px" : "12px",
        paddingLeft: visible ? "0px" : "12px",
        borderRadius: visible ? "0rem" : "2rem",
        y: visible ? 0 : 20,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-card/80 px-0 py-2 lg:hidden",
        !visible && "bg-card/80",
        visible && "bg-transparent",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-card border border-border px-4 py-8 shadow-lg",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-primary cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-primary cursor-pointer" onClick={onClick} />
  );
};

export const NavbarLogo = ({ href = "/", visible }: { href?: string; visible?: boolean }) => {
  return (
    <motion.a
      href={href}
      animate={{
        opacity: visible ? 0 : 1,
        pointerEvents: visible ? "none" : "auto",
      }}
      className="relative z-20 mr-4 flex items-center px-2 py-1"
    >
      <img 
        src="/images/logo/aquatiq-blue.png" 
        alt="Aquatiq" 
        className="h-5 w-auto"
      />
    </motion.a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  visible,
  showIconWhenVisible = false,
  icon,
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  visible?: boolean;
  showIconWhenVisible?: boolean;
  icon?: React.ReactNode;
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition-all duration-200 inline-block text-center whitespace-nowrap";

  const variantStyles = {
    primary:
      "bg-card text-foreground border border-border shadow-sm",
    secondary: "bg-transparent shadow-none text-foreground",
    dark: "bg-primary text-primary-foreground shadow-sm",
    gradient:
      "bg-gradient-to-b from-secondary to-primary text-primary-foreground shadow-sm",
  };

  const shouldShowIcon = showIconWhenVisible && visible && icon;

  return (
    <motion.div
      animate={{
        position: visible ? "fixed" : "relative",
        right: visible ? "2rem" : "auto",
        top: visible ? "1.5rem" : "auto",
        zIndex: 60,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className="z-60"
    >
      <Tag
        href={href || undefined}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        <AnimatePresence mode="wait" initial={false}>
          {shouldShowIcon ? (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.5, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "auto" }}
              exit={{ opacity: 0, scale: 0.5, width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center justify-center"
            >
              {icon}
            </motion.div>
          ) : (
            <motion.span
              key="text"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="block"
            >
              {children}
            </motion.span>
          )}
        </AnimatePresence>
      </Tag>
    </motion.div>
  );
};
