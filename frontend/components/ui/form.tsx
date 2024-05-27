import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  FormProviderProps,
  useFormContext
} from "react-hook-form";
import { useTranslations } from "next-intl";
import { useBeforeUnload } from "react-use";

import { cn } from "@/functions/classnames";
import { Label } from "@/components/ui/label";
import { useDialog } from "./dialog";

interface FormProps<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues
> extends FormProviderProps<TFieldValues, TContext, TTransformedValues> {
  disableBeforeUnload?: boolean;
}

function Form<
  TFieldValues extends FieldValues,
  TContext = unknown,
  TTransformedValues extends FieldValues = TFieldValues
>(props: FormProps<TFieldValues, TContext, TTransformedValues>) {
  const t = useTranslations("core");
  const formIsDirty = props.formState.isDirty;
  useBeforeUnload(
    formIsDirty && !props.disableBeforeUnload,
    t("are_you_sure_want_to_leave_form")
  );
  const { setIsDirty } = useDialog();

  React.useEffect(() => {
    if (props.disableBeforeUnload) return;

    setIsDirty?.(formIsDirty);
  }, [formIsDirty]);

  return <FormProvider {...props} />;
}

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};

interface FormItemContextValue {
  id: string;
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
};

interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  optional?: boolean;
}

const FormLabel = ({
  children,
  className,
  optional,
  ...props
}: FormLabelProps) => {
  const { error, formItemId } = useFormField();
  const t = useTranslations("core");

  return (
    <Label
      className={cn(error && "text-destructive", "space-x-2", className)}
      htmlFor={formItemId}
      {...props}
    >
      <span>{children}</span>
      {optional && (
        <span className="text-muted-foreground text-xs">{t("optional")}</span>
      )}
    </Label>
  );
};

const FormControl = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof Slot>) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};

const FormDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      id={formDescriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

const FormMessage = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      id={formMessageId}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
};

const FormWrapper = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLFormElement>) => {
  return (
    <form
      className={cn("space-y-6 @container flex flex-col items-end", className)}
      {...props}
    />
  );
};

const FormFieldRender = ({
  children,
  label,
  optional,
  description
}: {
  children: React.ReactNode;
  label: string;
  description?: string;
  optional?: boolean;
}) => {
  const t = useTranslations("core");

  return (
    <FormItem className="flex @xs:gap-6 flex-col @xs:flex-row w-full">
      <div className="@4xl:w-[26rem] @3xl:w-[24rem] @xl:w-[18rem] @xs:flex-shrink-0 @sm:w-[10rem] @xs:w-[8rem] @xs:text-right w-full flex flex-col gap-1 @xs:mt-3">
        <FormLabel>{label}</FormLabel>
        {optional && (
          <span className="text-muted-foreground text-xs">{t("optional")}</span>
        )}
        {description && <FormDescription>{description}</FormDescription>}
      </div>

      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
};

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormWrapper,
  FormFieldRender
};
