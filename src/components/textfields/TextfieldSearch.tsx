import React from "react";
import "@styles/components/textfields.css";

interface Props {
  placeholder: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: () => void;
}

const TextfieldSearch: React.FC<Props> = (props) => {
  const { placeholder, value, onChange, onClick } = props;
  return (
    <div className="textfield-search">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <i className="fa-solid fa-magnifying-glass" onClick={onClick} />
    </div>
  );
};

export default TextfieldSearch;
