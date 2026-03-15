import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ICustomButton extends React.ComponentProps<"button"> {
  textButton?: React.ReactNode;
  width?: string;
  height?: string;
  backgroundColor?: string;
  padding?: string;
  fontWeight?: string;
  fontFamily?: string;
  fz?: string;
  transform?: string;
  transition?: string;
  textColor?: string;
  cursor?: string;
  boxShadow?: string;
  border?: string;
  borderRadius?: string;
  maxWidth?: string;
  hoverTransform?: string;
}

const CustomButton: React.FC<ICustomButton> = ({
  textButton,
  width,
  height,
  backgroundColor = "#aa14f0",
  padding,
  fz,
  fontWeight = "700",
  fontFamily = "Inria Sans, sans-serif",
  transform,
  transition,
  textColor = "#fff",
  cursor = "pointer",
  boxShadow = "6px 6px 0px #ff6600",
  border = "5px solid rgb(0, 0, 0)",
  borderRadius = "5px",
  maxWidth = "100%",
  hoverTransform,
  className,
  onClick,
  ...restProps
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    width,
    color: textColor,
    height,
    backgroundColor,
    padding,
    fontSize: fz,
    fontWeight,
    fontFamily,
    transform: isHovered ? hoverTransform : transform,
    cursor,
    transition,
    boxShadow,
    border,
    borderRadius,
    maxWidth,
    onClick,
  };

  const navigate = useNavigate();

  return (
    <div>
      <button
        className={className}
        style={style}
        onClick={(e) => {
          if (onClick) onClick(e);
          navigate("/login");
        }}
        onMouseEnter={(e) => {
          setIsHovered(true);
          if (restProps.onMouseEnter) restProps.onMouseEnter(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          if (restProps.onMouseLeave) restProps.onMouseLeave(e);
        }}
        {...restProps}
      >
        {textButton}
      </button>
    </div>
  );
};

export default CustomButton;
