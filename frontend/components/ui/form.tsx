import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import { useBeforeUnload } from "react-use";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  type FormProviderProps,
  type FormState,
  type FieldError
} from "react-hook-form";
import {
  createContext,
  forwardRef,
  useContext,
  type ElementRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  useId,
  useEffect
} from "react";
import { useTranslations } from "next-intl";

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
>(props: FormProps<TFieldValues, TContext, TTransformedValues>): JSX.Element {
  const t = useTranslations("core");
  const formIsDirty = props.formState.isDirty;
  useBeforeUnload(
    formIsDirty && !props.disableBeforeUnload,
    t("are_you_sure_want_to_leave_form")
  );
  const { setIsDirty } = useDialog();

  useEffect((): void => {
    if (props.disableBeforeUnload) return;

    setIsDirty?.(formIsDirty);
  }, [formIsDirty]);

  return <FormProvider {...props} />;
}

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>): JSX.Element => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = (): {
  formDescriptionId: string;
  formItemId: string;
  formMessageId: string;
  id: string;
  invalid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  isValidating: boolean;
  name: string;
  error?: FieldError | undefined;
} => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { formState, getFieldState } = useFormContext();

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

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref): JSX.Element => {
    const id = useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  }
);
FormItem.displayName = "FormItem";

interface FormLabelProps
  extends ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  optional?: boolean;
}

const FormLabel = forwardRef<
  ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ children, className, optional, ...props }, ref): JSX.Element => {
  const { error, formItemId } = useFormField();
  const t = useTranslations("core");

  return (
    <Label
      ref={ref}
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
});
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref): JSX.Element => {
  const { error, formDescriptionId, formItemId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
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
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref): JSX.Element => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref): JSX.Element | null => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField
};
