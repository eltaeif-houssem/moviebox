import React from "react";
import "@styles/components/textfields.css";

interface Props {
  value: string;
  type: string;
  placeholder: string;
  helperText: string;
  onChange: (event: any) => void;
}

const TextfieldForm = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { helperText, onChange, type, value, placeholder } = props;
    return (
      <div className="text-field-form">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          ref={ref}
        />
        <div>
          {helperText && (
            <p>
              <i className="fa-solid fa-circle-exclamation" /> {helperText}
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default TextfieldForm;
