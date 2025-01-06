import React from "react";

export interface ButtonProps {
  text: string;
  width: number;
  height: number;
  backgroundColor?: string;
  color?: string;
  type: "submit" | "reset" | "button";
}
const CommonFormButton = (props: ButtonProps) => {
  const { text, width, height, backgroundColor, color, type } = props;

  const formButtonStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    fontSize: `${(height * 7) / 18}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    border: "none",
    borderRadius: `${height / 8}px`,
    backgroundColor: backgroundColor ? `${backgroundColor}` : "#087FFF",
    color: color ? `${color}` : "#FFFFFF",
    userSelect: "none",
    boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.2)",
  };
  return (
    <>
      <button style={formButtonStyle} type={type}>
        {text}
      </button>
    </>
  );
};

export default CommonFormButton;
