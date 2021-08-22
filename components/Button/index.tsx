import { forwardRef, memo } from "react";

// Import STYLES
import styles from "./Button.module.scss";

export type ButtonProps = {
  theme?:
    | "gradient"
    | "bordered"
    | "borderedSecondaty"
    | "light"
    | "borderedGradientPrimary"
    | "borderedGradientSecondary"
    | "dark"
    | "grey"
    | "sunshine"
    | "red"
    | "transparent";
  justify?: "center" | "start" | "end" | "spaceAround" | "spaceBetween";
  align?: "center" | "end" | "start" | "stretch";
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  children: React.ReactNode;
  name?: string;
};
// React.ComponentPropsWithoutRef<'button'> & Props
// type DefaultButtonProps = React.PropsWithoutRef<JSX.IntrinsicElements['button']

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      style,
      className,
      onClick,
      onMouseDown,
      onTouchStart,
      type = "button",
      theme,
      children,
      disabled,
      align,
      justify,
      name,
    },
    ref
  ) => {
    const classNames = [
      styles.button,
      theme ? `${styles[`button_theme_${theme}`]}` : "",
      justify ? `${styles[`button_justify_${justify}`]}` : "",
      align ? `${styles[`button_align_${align}`]}` : "",
      className || "",
    ].join(" ");

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void =>
      onClick && onClick(e);

    return (
      <button
        disabled={disabled}
        type={type}
        onClick={handleClick}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className={classNames}
        style={style}
        ref={ref}
        name={name}
      >
        {children}
      </button>
    );
  }
);

const memoizedButton = memo(Button);
memoizedButton.displayName = "Button";

export default memoizedButton;
