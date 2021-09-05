import { useState, useEffect, useRef } from "react";

// Import HOOKS
import { commonHooks } from "hooks";

// Import STYLES
import styles from "./Dropdown.module.scss";

type OnSelect<T> = (value: T) => void;

type CallbackParamsCommon<Data> = {
  isActive: boolean;
  selectedValue: Data | null;
  closeDropdown: () => void;
};

type FunctionalChildren<Data> = (
  param: CallbackParamsCommon<Data> & {
    onSelect: OnSelect<Data>;
  }
) => React.ReactNode;

type FunctionalRender<Data> = (
  param: CallbackParamsCommon<Data> & { isHovered: boolean }
) => React.ReactNode;

type Props<Data> = {
  className?: string;
  dropdownClassName?: string;
  isDisabled?: boolean;
  initialValue: Data | null;
  renderSelect: FunctionalRender<Data>;
  children: FunctionalChildren<Data>;
  align?: "left" | "right";
  keepOnInsideClick?: boolean;
  animated?: boolean;
  style?: React.CSSProperties;
  onStatusChange?: (status: boolean) => void;
};

// const isFunction = (arg: Function | React.ReactNode): arg is Function =>
//   typeof arg === "function";

const Dropdown = <Data extends { id: string }>({
  className,
  dropdownClassName,
  initialValue,
  isDisabled,
  renderSelect,
  children,
  align = "right",
  keepOnInsideClick,
  animated,
  style,
  onStatusChange,
}: Props<Data>) => {
  const classNames = [
    styles.dropdown,
    styles[`dropdown_align_${align}`],
    className,
  ].join(" ");

  const rootElementRef = useRef<HTMLDivElement>(null);
  const dropdownElementRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<null | Data>(null);

  commonHooks.useOutsideClick(rootElementRef, () => {
    setIsActive(false);
    setIsHovered(false);
  });

  useEffect(
    function setInitialValue() {
      if (selectedValue == null && initialValue != null) {
        setSelectedValue(initialValue);
      }
    },
    [initialValue, selectedValue]
  );

  useEffect(
    function callOnStatusChange() {
      if (onStatusChange) onStatusChange(isActive);
    },
    [isActive]
  );

  const handleClick = () => {
    if (!isDisabled) {
      setIsActive((prevState) => !prevState);
    }
  };

  const handleClickDropdown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (keepOnInsideClick) {
      event.stopPropagation();
    }
  };

  const onSelect = (value: Data) => {
    setSelectedValue(value);

  };

  const handleHoverOn = () => {
    setIsHovered(true);
  };
  const handleHoverOut = () => {
    setIsHovered(false);
  };

  const closeDropdown = () => {
    setIsActive(false);
  };

  return (
    <div
      ref={rootElementRef}
      className={classNames}
      onClick={handleClick}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOut}
      onKeyDown={() => { }}
      role="button"
      tabIndex={0}
      style={style}
    >
      {renderSelect({ selectedValue, isActive, isHovered, closeDropdown })}

      <div
        onKeyDown={() => { }}
        role="button"
        tabIndex={0}
        onClick={handleClickDropdown}
        ref={dropdownElementRef}
        className={`${styles.dropdown__container} ${animated ? styles.dropdown__container_animated : ""
          } ${animated && isActive ? styles.dropdown__container_active : ""} ${dropdownClassName || ""
          }`}
      >
        {children({ isActive, onSelect, selectedValue, closeDropdown })}
      </div>
    </div>
  );
};

export default Dropdown;
