import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { registerDecorator } from "class-validator";

@ObjectType()
export class TextLanguage {
  @Field(() => String)
  value: string;

  @Field(() => String)
  language_code: string;
}

@InputType()
export class TextLanguageInput {
  @Field(() => String)
  value: string;

  @Field(() => String)
  language_code: string;
}

export const IsTextLanguageInput = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: "Each language must have a value"
      },
      validator: {
        validate(item?: TextLanguageInput | TextLanguageInput[]) {
          return (Array.isArray(item) ? item : [item]).every(
            item => item.value?.trim().length > 0
          );
        }
      }
    });
  };
};

export const MaxLengthLanguageInput = ({ length }: { length: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `Each language must have a value with a maximum length of ${length}`
      },
      validator: {
        validate(item?: TextLanguageInput | TextLanguageInput[]) {
          return (Array.isArray(item) ? item : [item]).every(
            item => item.value?.trim().length <= length
          );
        }
      }
    });
  };
};

export const MinLengthLanguageInput = ({ length }: { length: number }) => {
  return (object: Record<string, unknown>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: {
        message: `Each language must have a value with a minimum length of ${length}`
      },
      validator: {
        validate(item?: TextLanguageInput | TextLanguageInput[]) {
          return (Array.isArray(item) ? item : [item]).every(
            item => item.value?.trim().length >= length
          );
        }
      }
    });
  };
};

export const TransformTextLanguageInput = ({
  value
}: {
  value: TextLanguageInput | TextLanguageInput[];
}) => {
  if (Array.isArray(value)) {
    let current = value.map(item => ({
      ...item,
      value: item.value.trimStart().trimEnd()
    }));

    // If is only one item and isn't english then change to english
    if (current.find(el => el.language_code !== "en" && current.length === 1)) {
      current = [
        {
          language_code: "en",
          value: current[0].value
        }
      ];
    }

    return current;
  }

  return {
    ...value,
    value: value.value.trimStart().trimEnd()
  };
};

export const TransformString = ({ value }: { value: string[] | string }) => {
  if (Array.isArray(value)) {
    return value.map(item => item.trimStart().trimEnd());
  }

  return value.trimStart().trimEnd();
};
