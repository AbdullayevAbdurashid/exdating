import {
  useRef,
  useEffect,
  forwardRef,
  PropsWithChildren,
  MouseEventHandler,
  MouseEvent,
  useMemo,
} from "react";
import { ReactEditor, useSlate } from "slate-react";
import { Range, Editor } from "slate";

import { Icon } from "react-icons-kit";
import { ic_format_underlined } from "react-icons-kit/md/ic_format_underlined";
import { ic_format_bold } from "react-icons-kit/md/ic_format_bold";
import { ic_format_italic } from "react-icons-kit/md/ic_format_italic";
import { ic_help_outline } from "react-icons-kit/md/ic_help_outline";

// Import COMPONENTS
import { Portal } from "components";

// Import STYLES
import styles from "./HoveringToolbar.module.scss";

// Import UTILS
import { Format, isFormatActive, toggleFormat } from "./utils";

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

const Menu = forwardRef<HTMLDivElement, PropsWithChildren<BaseProps>>(
  ({ className, ...props }, ref) => {
    const classNames = [styles.menu, className].join(" ");

    return <div {...props} ref={ref} className={classNames} />;
  }
);

const HoveringToolbar = () => {
  const classNames = [styles.toolbar].join(" ");

  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();

    if (domSelection != null) {
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
      }px`;
    }
  });

  return (
    <Portal>
      <Menu ref={ref} className={classNames}>
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
      </Menu>
    </Portal>
  );
};

const Button = forwardRef<
  HTMLSpanElement,
  PropsWithChildren<
    {
      active: boolean;
      reversed: boolean;
      onMouseDown: MouseEventHandler<HTMLSpanElement>;
    } & BaseProps
  >
>(({ className, active, reversed, onMouseDown, ...props }, ref) => {
  const classNames = [styles.button, className].join(" ");

  return (
    <span
      {...props}
      ref={ref}
      className={classNames}
      onMouseDown={onMouseDown}
      role="button"
      tabIndex={0}
      style={{
        color: reversed
          ? active
            ? "white"
            : "#aaa"
          : active
          ? "black"
          : "#ccc",
      }}
    />
  );
});

type FormatButtonProps = {
  format: Format;
  icon: "format_bold" | "format_italic" | "format_underlined";
};

function FormatButton({ format, icon }: FormatButtonProps) {
  const editor = useSlate();

  const handleOnMouseDown = (event: MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    toggleFormat(editor, format);
  };

  const formatIcon = useMemo(() => {
    switch (icon) {
      case "format_bold":
        return ic_format_bold;
      case "format_italic":
        return ic_format_italic;
      case "format_underlined":
        return ic_format_underlined;
      default:
        return ic_help_outline;
    }
  }, [icon]);

  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={handleOnMouseDown}
    >
      <Icon size="100%" icon={formatIcon} />
    </Button>
  );
}

export default HoveringToolbar;
