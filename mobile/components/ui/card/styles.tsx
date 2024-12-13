import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { tva } from "@gluestack-ui/nativewind-utils/tva";
const baseStyle = isWeb ? "flex flex-col relative z-0" : "bg-neutral-100 ";

export const cardStyle = tva({
  base: baseStyle,
  variants: {
    size: {
      sm: "p-3 rounded",
      md: "px-6 py-8 rounded-md",
      lg: "p-6 rounded-xl",
    },
    variant: {
      elevated: "bg-neutral-100 shadow-xl",
      outline: "border border-outline-200 ",
      ghost: "rounded-none",
      filled: "bg-background-50",
    },
  },
});
