/* eslint-disable react/prop-types */
const Button = ({
  children,
  bgColor = "transparent",

  textColor = "black",
  type = "button",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`rounded-md bg-${bgColor} px-3 py-2 text-sm font-semibold text-${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
