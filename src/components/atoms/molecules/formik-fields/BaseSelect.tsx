import { FormikError } from "./FormikError";
import Select from "react-select";
import LoadingIndicator from "../../Spinner/LoadingIndicator";
import DefaultSelectStyle from "../../../../hooks/DefaultSelectStyle";

export type BaseSelect_TP = {
  label?: string;
  id: string;
  name: string;
  options: any;
  onChange: () => void;
  isLoading?: boolean;
  noMb?: boolean;
  required?: boolean;
  className?: string;
  labelStyle?: string;
  labelProps?: string;
  placeholder?: string;
  selectStyle?: any;
  disabled?: boolean;
};

const BaseSelect = ({
  label,
  id,
  name,
  options,
  className,
  labelStyle,
  onChange,
  required,
  isLoading,
  noMb = false,
  placeholder,
  disabled,
  selectStyle,
  ...props
}: BaseSelect_TP) => {
  return (
    <div>
      <label htmlFor="course" className={`${labelStyle}`}>
        {label}
      </label>
      <Select
        className={`mt-1 ${className}`}
        styles={selectStyle ? selectStyle : DefaultSelectStyle}
        id={id}
        name={name}
        placeholder={placeholder}
        options={options}
        value={props.value}
        onChange={onChange}
        isLoading={isLoading}
        // disabled={disabled}
        isDisabled={disabled}
        components={{ LoadingIndicator }}
      />
      <FormikError name="course_name" className="whitespace-nowrap" />
    </div>
  );
};

export default BaseSelect;
