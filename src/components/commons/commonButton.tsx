import React from "react";

export interface ButtonProps {
  text: string;
  width: number;
  height: number;
  backgroundColor?: string;
  color?: string;
  onClick: () => void;
}

const CommonButton = (props: ButtonProps) => {
  const { onClick, text, width, height, backgroundColor, color } = props;

  const buttonStyle: React.CSSProperties = {
    width: `${width}px`,
    height: `${height}px`,
    fontSize: `${(height * 7) / 18}px`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: `${height / 8}px`,
    backgroundColor: backgroundColor ? `${backgroundColor}` : "#087FFF",
    color: color ? `${color}` : "#FFFFFF",
    userSelect: "none",
    boxShadow: "1px 4px 6px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div style={buttonStyle} onClick={onClick}>
      {text}
    </div>
  );
};

export default CommonButton;
