import React from "react";
import { FormItem, FormMessage } from "./ui/form";

export const BadgeFormItem = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, ...props }, ref) => {
  return (
    <FormItem ref={ref} {...props}>
      <div className="flex flex-row items-center justify-between rounded-lg bg-neutral-150 px-3 py-1">
        {children}
      </div>
      <FormMessage />
    </FormItem>
  );
});

export const BadgeFormInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="m-0 min-w-0 border-none bg-transparent text-right outline-none"
      {...props}
    />
  );
});
