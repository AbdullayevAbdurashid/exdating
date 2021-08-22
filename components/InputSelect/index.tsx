import {
  useEffect,
  useRef,
  useState,
  useMemo,
  KeyboardEvent,
  createRef,
  RefObject,
} from "react";

// Import HOOKS
import { commonHooks } from "hooks";

// Import COMPONENTS
import { Input } from "components";

// Import TYPES
import type { InputProps } from "components/Input";

// Import MEDIA
import ChevronIcon from "public/icons/icon-chevron-down-custom.svg";

// Import STYLES
import styles from "./InputSelect.module.scss";

export type SelectListData = {
  id: string;
  element?: React.ReactNode;
  value: string;
};

type Props = InputProps & {
  inputClassName?: string;
  theme?: "bordered" | "borderedSplit";
  list?: SelectListData[];
  selectedId?: string | null;
  onOptionChange?: (id: string) => void;
  setValue?: (
    name: any,
    value: unknown,
    config?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
        }>
      | undefined
  ) => void;
};

const InputSelect: React.FC<Props> = ({
  className,
  theme,
  inputClassName,
  list,
  selectedId,
  placeholder,
  setValue,
  onOptionChange,
  ...inputProps
}) => {
  const [isActiveState, setIsActiveState] = useState(false);
  const [selectedOptionId, setSelectedOptionId] = useState<null | string>(null);

  const classNames = [
    styles.select,
    isActiveState ? styles.select_active : "",
    theme ? styles[`select_theme_${theme}`] : "",
    className,
  ].join(" ");

  const selectRef = useRef<HTMLDivElement>(null);
  const optionsRefList = useRef<{ [key: string]: RefObject<HTMLLIElement> }>(
    {}
  );

  commonHooks.useOutsideClick(selectRef, () => {
    setIsActiveState(false);
  });

  const handleToggleDropdown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setIsActiveState((prevState) => !prevState);
  };

  useEffect(
    function selectOptionOnSelectedIdChanged() {
      if (selectedId != null) {
        setSelectedOptionId(selectedId);

        if (onOptionChange) {
          onOptionChange(selectedId);
        }
      }
    },
    [selectedId]
  );

  const renderSelectedOption = useMemo(() => {
    let selectedOption: React.ReactNode = "";

    if (!selectedOptionId) {
      return selectedOption;
    }

    if (list == null || list.length === 0) {
      return <span>There is no options</span>;
    }

    list.some((item) => {
      if (item.id === selectedOptionId) {
        selectedOption = item.element ? item.element : item.value;
        return true;
      }

      return false;
    });

    return selectedOption;
  }, [list, selectedOptionId]);

  const renderOptions = useMemo(() => {
    const handleSelectOption = (id: string) => {
      setSelectedOptionId(id);

      if (setValue) {
        console.log(`handleSelectOption ${inputProps.name}: `, id);
        setValue(inputProps.name, id, { shouldDirty: true });
      }

      if (onOptionChange) {
        onOptionChange(id);
      }
    };

    if (list == null) {
      return null;
    }

    let firstLetter: string | null = null;

    return list
      .sort((fItem, nItem) => {
        const nameA = fItem.value.toUpperCase(); // ignore upper and lowercase
        const nameB = nItem.value.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      })
      .map((item) => {
        const isNewFirstLetter =
          firstLetter == null ||
          firstLetter !== item.value.slice(0, 1).toLowerCase();

        if (isNewFirstLetter) {
          firstLetter = item.value.slice(0, 1).toLowerCase();
          optionsRefList.current[firstLetter] = createRef<HTMLLIElement>();
          // console.log("firstLetter: ", firstLetter);
        }

        return (
          <li
            key={item.id}
            ref={
              isNewFirstLetter && firstLetter != null
                ? optionsRefList.current[firstLetter]
                : undefined
            }
            onClick={() => handleSelectOption(item.id)}
            className={styles.select__dropdownItem}
            onKeyDown={() => {}}
            role="option"
            aria-selected="false"
          >
            {item.element ? item.element : item.value}
          </li>
        );
      });
  }, [list]);

  const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
    const pressedKey = event.key.toLowerCase();

    if (optionsRefList.current[pressedKey]) {
      optionsRefList.current[pressedKey].current!.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  };

  const handleOutsideChange = () => {
    console.log("handleOutsideChange !!!!!!!!!!!!!!!");
  };

  return (
    <div
      ref={selectRef}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
      onClick={handleToggleDropdown}
      onKeyPress={handleKeyPress}
      className={classNames}
    >
      <Input
        name={`${inputProps.name}_placeholder`}
        placeholder={placeholder}
        readOnly
        value={selectedOptionId != null ? " " : ""}
        className={`${styles.select__input} ${inputClassName}`}
      />

      <Input
        {...inputProps}
        onChange={handleOutsideChange}
        className={`${styles.select__inputHidden}`}
      />

      <div className={styles.select__selected}>
        <span className={styles.select__selectedText}>
          {renderSelectedOption}
        </span>
      </div>

      <div className={styles.select__icon}>
        <ChevronIcon width={7} height={4} />
      </div>

      <div className={styles.select__dropdown}>
        {list != null && list.length > 0 && (
          <ul className={styles.select__dropdownInner}>{renderOptions}</ul>
        )}
      </div>
    </div>
  );
};

export default InputSelect;
