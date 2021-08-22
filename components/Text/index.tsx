// Import STYLES
import styles from "./Text.module.scss";
import { memo } from "react";

interface ITags {
  span: any;
  h1: any;
  h2: any;
  h3: any;
  h4: any;
  h5: any;
  h6: any;
  p: any;
}

interface ILabelTag {
  label: any;
}

export type TextColor =
  | "primary"
  | "orange"
  | "hotpink"
  | "hotred"
  | "accentMedium"
  | "greyDark"
  | "grey"
  | "greyMedium"
  | "greyLight"
  | "white"
  | "moonlight"
  | "gradientAnimated"
  | "green"
  | "gradient";

export type TextSizes =
  | "xxlg"
  | "xlg"
  | "lg"
  | "md"
  | "xmd"
  | "sm"
  | "xsm"
  | "xxsm";

interface ICommonProps {
  children: React.ReactNode;
  className?: string;
  size?: TextSizes;
  fontWeight?: "semibold" | "bold";
  color?: TextColor;
  uppercase?: boolean;
  underline?: boolean;
  lineThrough?: boolean;
  italic?: boolean;
  inline?: boolean;
  center?: boolean;
  right?: boolean;
  left?: boolean;
  singleLine?: boolean;
  hoverTransition?: boolean;
  style?: React.CSSProperties;
}

interface IAsLabelProps extends ICommonProps {
  as: keyof ILabelTag;
  htmlFor?: string;
}

interface IAsNotLabelProps extends ICommonProps {
  as?: keyof ITags;
  htmlFor?: undefined;
}

type Props = IAsLabelProps | IAsNotLabelProps;

const Text: React.FC<Props> = ({
  className,
  children,
  size,
  as: Tag = "span",
  fontWeight,
  uppercase,
  underline,
  lineThrough,
  italic,
  inline,
  center,
  right,
  left,
  color,
  singleLine,
  hoverTransition,
  htmlFor,
  style,
}) => {
  const classNames = [
    `${styles.text}`,
    `${Tag ? styles[`text_type_${Tag}`] : ""}`,
    `${size ? styles[`text_size_${size}`] : ""}`,
    `${uppercase ? styles.text_uppercase : ""}`,
    `${inline ? styles.text_inline : ""}`,
    `${underline ? styles.text_underline : ""}`,
    `${lineThrough ? styles.text_lineThrough : ""}`,
    `${italic ? styles.text_italic : ""}`,
    `${center ? styles.text_align_center : ""}`,
    `${right ? styles.text_align_right : ""}`,
    `${left ? styles.text_align_left : ""}`,
    `${fontWeight ? styles[`text_fontWeight_${fontWeight}`] : ""}`,
    `${color ? styles[`text_color_${color}`] : ""}`,
    `${singleLine ? styles.text_singleLine : ""}`,
    `${hoverTransition ? styles.text_hoverTransition : ""}`,
    className,
  ].join(" ");

  return (
    <Tag style={style} htmlFor={htmlFor} className={classNames}>
      {children}
    </Tag>
  );
};

const memoizedText = memo(Text);

memoizedText.displayName = "Text";

export default memoizedText;
