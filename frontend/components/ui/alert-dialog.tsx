"use client";

import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import {
  ComponentPropsWithoutRef,
  HTMLAttributes,
  createContext,
  useContext,
  useState
} from "react";

import { cn } from "@/functions/classnames";
import { buttonVariants } from "@/components/ui/button";

interface AlertDialogContextArgs {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const AlertDialogContext = createContext<AlertDialogContextArgs>({
  open: false,
  setOpen: () => {}
});

export const useAlertDialog = () => useContext(AlertDialogContext);

const AlertDialog = ({
  children,
  onOpenChange,
  open: openProp,
  ...props
}: AlertDialogPrimitive.DialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <AlertDialogContext.Provider
      value={{ open: openProp ?? open, setOpen: onOpenChange ?? setOpen }}
    >
      <AlertDialogPrimitive.Root
        open={openProp ?? open}
        onOpenChange={onOpenChange ?? setOpen}
        {...props}
      >
        {children}
      </AlertDialogPrimitive.Root>
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
);
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg select-none overflow-y-auto max-h-[calc(100vh_-_2rem)]",
        className
      )}
      {...props}
    />
  </AlertDialogPortal>
);

const AlertDialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title
    className={cn("text-lg font-semibold", className)}
    {...props}
  />
);

const AlertDialogDescription = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>) => (
  <AlertDialogPrimitive.Action
    className={cn(buttonVariants({ variant: "destructive" }), className)}
    {...props}
  />
);

const AlertDialogCancel = ({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>) => (
  <AlertDialogPrimitive.Cancel
    className={cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    )}
    {...props}
  />
);

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
};
