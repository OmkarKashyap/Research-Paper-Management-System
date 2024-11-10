import React from "react";

type InputFieldProps = {
    label: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({ label, placeholder, value, onChange }: InputFieldProps) {
    return (
        <div style={{  color:"black", width: "40%" }}>
            <input
    className="w-full p-3 text-white bg-black rounded-l-lg border border-gray-500 focus:outline-none"
    type="text"
    placeholder="e.g., Black Holes"
    value={value}
    onChange={onChange}
    style={{ fontSize: "16px" }}
  />
        </div>
        // <div className="flex items-center max-w-md mx-auto">


    );
}

export default InputField;
