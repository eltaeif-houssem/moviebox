import React, { useRef } from "react";
import "@styles/components/textfields.css";

interface Props {
  placeholder: string;
  onChange: (text: string) => void;
}

const TextfieldSearch: React.FC<Props> = (props) => {
  const { placeholder, onChange } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickHandler = () => {
    onChange(`${inputRef.current?.value}`);
  };
  return (
    <div className="textfield-search">
      <input type="text" placeholder={placeholder} ref={inputRef} />
      <i className="fa-solid fa-magnifying-glass" onClick={onClickHandler} />
    </div>
  );
};

export default TextfieldSearch;
