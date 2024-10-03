import { StylesConfig, GroupBase } from "react-select";

interface CustomOption {
  label: string;
  value: string;
}

const DefaultSelectStyle: StylesConfig<
  CustomOption,
  false,
  GroupBase<CustomOption>
> = {
  control: (provided) => ({
    ...provided,
    // backgroundColor: "#9F85F3",
    // boxShadow: "0px 4px 4px 0px #ddd",
    borderRadius: "15px",
    border: "1",
    borderColor: "#C9C5CA",
    minHeight: "44px",
    cursor: "pointer",
    padding: "8px 8px",
  }),
  option: (provided, state) => {
    let backgroundColor = "";
    let color = "";
    if (state.isSelected) {
      backgroundColor = "#9F85F3";
      color = "white";
    } else if (state.isFocused) {
      backgroundColor = "white";
      color = "#000";
    }

    return {
      ...provided,
      backgroundColor,
      color,
      fontWeight: "500",
      cursor: "pointer",
    };
  },
  singleValue: (provided) => ({
    ...provided,
    color: "black",
    fontWeight: "500",
  }),
  valueContainer: (provided) => ({
    ...provided,
    whiteSpace: "nowrap",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    boxShadow: "0px 4px 4px 0px #ddd",
    backgroundColor: "#E6EAEE",
  }),
  loadingIndicator: (provided) => ({
    ...provided,
    color: "#393D94",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default DefaultSelectStyle;
