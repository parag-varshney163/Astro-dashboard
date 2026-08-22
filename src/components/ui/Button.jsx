// import { motion } from "framer-motion";
// // src/components/ui/Button.jsx
// import React from "react";
// import colors from "../../constants/colors";
// const sizes = {
//   sm: "px-3 py-1.5 text-sm",
//   md: "px-4 py-2  text-base",
//   lg: "px-6 py-3 text-lg",
// };
// // 🟦 Variant Names
// const variants = {
//   primary: "primary",
//   secondary: "secondary",
//   accent: "accent",
//   danger: "danger",
//   ghost: "ghost",
//   custom: "custom",
// };
// // 🟦 Variant Styles (pure CSS, no tailwind)
// const variantStyles = {
//   primary: {
//     backgroundColor: colors.accent,
//     color: "#000",
//   },
//   secondary: {
//     backgroundColor: colors.cardBg,
//     color: colors.textSecondary,
//     border: `1px solid ${colors.cardBorder}`,
//   },
//   accent: {
//     backgroundColor: colors.accent,
//     color: "#000",
//   },
//   danger: {
//     backgroundColor: colors.danger,
//     color: "white",
//   },
//   ghost: {
//     backgroundColor: "transparent",
//     border: "1px solid rgba(255,255,255,0.2)",
//     color: "white",
//   },
//   // custom handled separately
// };
// export default function Button({
//   children,
//   onClick,
//   size = "md",
//   variant = "primary",
//   icon: Icon,
//   className = "",
//   fullWidth = false,
//   motionEffect = true,
//   bg,       // for custom
//   text,     // for custom
//   style = {},
//   ...props
// }) {
//   const Component = motionEffect ? motion.button : "button";
//   // 🟡 Custom variant logic
//   const computedStyles =
//     variant === "custom"
//       ? { backgroundColor: bg, color: text }
//       : variantStyles[variant] || {};
//   return (
//     <Component
//       whileHover={motionEffect ? { scale: 1.05 } : {}}
//       whileTap={motionEffect ? { scale: 0.95 } : {}}
//       onClick={onClick}
//       style={{
//         ...computedStyles,
//         ...style, // ← user style overrides ONLY layout stuff
//       }}
//       className={`
//         inline-flex items-center justify-center gap-2
//         font-semibold rounded-full transition-all duration-200
//         ${sizes[size]}
//         ${fullWidth ? "w-full" : ""}
//         ${className}
//       `}
//       {...props}
//     >
//       {Icon && <Icon size={18} />}
//       {children}
//     </Component>
//   );
// }
import { motion } from "framer-motion";
import React from "react";

import colors from "../../constants/colors";


const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-8 py-4 text-lg",
};

const variants = {
  primary: "primary",
  secondary: "secondary",
  accent: "accent",
  danger: "danger",
  ghost: "ghost",
  custom: "custom",
};

const variantStyles = {
  // =========================
  // PRIMARY
  // =========================
  primary: {
    background: colors.gradientButton,
    color: colors.buttonText,
    border: `1px solid ${colors.accent}`,
    boxShadow: `0 8px 25px rgba(212, 175, 55, 0.18)`,
  },

  // =========================
  // SECONDARY
  // =========================
  secondary: {
    background: colors.cardBg,
    color: colors.textSecondary,
    border: `1px solid ${colors.cardBorder}`,
  },

  // =========================
  // ACCENT
  // =========================
  accent: {
    background: colors.accent,
    color: colors.buttonText,
    border: `1px solid ${colors.accentLight}`,
    boxShadow: `0 8px 25px rgba(212, 175, 55, 0.15)`,
  },

  // =========================
  // DANGER
  // =========================
  danger: {
    background: colors.danger,
    color: colors.white,
    border: `1px solid ${colors.danger}`,
  },

  // =========================
  // GHOST
  // =========================
  ghost: {
    background: "transparent",
    color: colors.textSecondary,
    border: `1px solid ${colors.cardBorder}`,
  },
};

export default function Button({
  children,
  onClick,
  size = "md",
  variant = "primary",
  icon: Icon,
  className = "",
  fullWidth = false,
  motionEffect = true,
  bg,
  text,
  style = {},
  disabled = false,
  ...props
}) {
  const Component = motionEffect ? motion.button : "button";

  // =========================
  // CUSTOM VARIANT
  // =========================
  const computedStyles =
    variant === "custom"
      ? {
          background: bg || colors.gradientButton,
          color: text || colors.buttonText,
          border: `1px solid ${colors.accent}`,
          boxShadow: `0 8px 25px rgba(212, 175, 55, 0.18)`,
        }
      : variantStyles[variant] || variantStyles.primary;

  return (
    <Component
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={
        motionEffect && !disabled
          ? {
              scale: 1.04,
              boxShadow: `0 12px 32px rgba(212, 175, 55, 0.28)`,
            }
          : {}
      }
      whileTap={
        motionEffect && !disabled
          ? {
              scale: 0.97,
            }
          : {}
      }
      style={{
        ...computedStyles,
        ...style,

        // Disabled state
        ...(disabled && {
          opacity: 0.5,
          cursor: "not-allowed",
          boxShadow: "none",
        }),
      }}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        font-semibold
        rounded-full
        transition-all
        duration-200
        whitespace-nowrap
        select-none
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
      {...props}
    >
      {Icon && (
        <Icon
          size={size === "sm" ? 16 : size === "lg" ? 20 : 18}
          strokeWidth={2}
        />
      )}

      <span>{children}</span>
    </Component>
  );
}