import { t } from "i18next";
import { tv } from "tailwind-variants";
import { useFormikContext } from "formik";
import { FormikError } from "./FormikError";
import { useRTL } from "../../../../hooks/useRTL";
import { useEffect } from "react";

export type BaseInput_TP = {
  label?: string;
  id: string;
  noMb?: boolean;
  required?: boolean;
  className?: string;
  labelProps?: string;
  name: string;
  value?: any;
  placeholder?: string;
  ref?: any;
  disabled?: boolean;
  notEnglith?: boolean;
  autoFocus?: any;
  onChange?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  type?:
    | "text"
    | "number"
    | "password"
    | "email"
    | "checkbox"
    | "radio"
    | "text"
    | "date"
    | "time"
    | "tel";
  min?: number;
  max?: number;
};

const BaseInput = ({
  label,
  id,
  required,
  labelProps,
  noMb = false,
  type = "text",
  placeholder,
  ref,
  disabled,
  autoFocus,
  onChange,
  notEnglith,
  min,
  max,
  onKeyDown,
  ...props
}: BaseInput_TP) => {
  const { setFieldValue, setFieldTouched, errors, touched, values } =
    useFormikContext<{
      [key: string]: any;
    }>();

  const GeneralInputClass: string = "form-input px-4 py-2.5 w-full shadows";

  const baseInput = tv({
    base: `rounded-3xl border-2 border-[#BEC8CF] focus:!border-2 focus:!border-black`,
    variants: {
      error: {
        true: "border-mainRed",
      },
      type: {
        checkbox:
          "w-4 h-4 text-mainGreen border-gray-300 rounded focus:ring-mainColor form-checkbox shadow-none",
        radio:
          "w-6 h-6 form-radio rounded-full focus:ring-mainGreen border-gray-300",
        text: GeneralInputClass,
        email: GeneralInputClass,
        password: GeneralInputClass,
        number: GeneralInputClass,
        date: GeneralInputClass,
        time: GeneralInputClass,
        datetime: GeneralInputClass,
        month: GeneralInputClass,
        week: GeneralInputClass,
        tel: GeneralInputClass,
        url: GeneralInputClass,
        search: GeneralInputClass,
        color: GeneralInputClass,
      },
    },
  });

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement && e.target.type === "number") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      className={
        type === "radio"
          ? "col-span-1 relative w-fit"
          : "col-span-1 relative w-full"
      }
    >
      <div className="relative flex flex-col w-full gap-1">
        {label && (
          <label
            className={`${labelProps} text-base font-normal text-black`}
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          type={type}
          autoFocus={autoFocus}
          id={id}
          value={props?.value || values[props.name]}
          error={touched[props.name] && !!errors[props.name]}
          placeholder={
            placeholder && !notEnglith ? `${t(placeholder)}` : placeholder
          }
          autoComplete="off"
          onBlur={() => {
            setFieldTouched(props.name, true);
          }}
          onChange={(e) => {
            props.onChange && props.onChange(e);
            if (props.value === undefined) {
              setFieldValue(props.name, e.target.value);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onKeyDown) {
              onKeyDown(e);
            }
          }}
          className={baseInput({
            error: errors,
            className: props.className,
            type: props.type || "text",
          })}
          ref={ref}
          disabled={disabled}
          min={min}
          max={max}
          onWheel={handleWheel}
        />
      </div>
      {/* <FormikError
        name={props.name}
        className="absolute text-red-600 whitespace-nowrap"
      /> */}
    </div>
  );
};

export default BaseInput;
