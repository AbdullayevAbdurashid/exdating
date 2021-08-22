import { useState, ChangeEventHandler, useCallback, useEffect } from "react";
import { FieldElement } from "react-hook-form";

// Import COMPONENTS
import {
  Dropdown,
  Button,
  Text,
  DropmenuBubble,
  Tag,
  ScrollList,
} from "components";

// Import MEDIA
import ChevronDownIcon from "public/icons/icon-chevron-down-custom.svg";
import SeachIcon from "public/icons/icon-search.svg";

// Import STYLES
import styles from "./ButtonDropdownSearch.module.scss";

type Option = { item: React.ReactNode; id: string };
type OptionDefault = { name: string; id: string };

interface Props {
  className?: string;
  label: string;
  name?: string;
  isDisabled?: boolean;
  popularList?: OptionDefault[];
  selectedList?: OptionDefault[];
  optionsList?: Option[];
  onChange?: (text: string) => void;
  onCloseChange?: (text: string) => void;
  onPopularChange?: (text: string) => void;
  onOptionPick?: (option: Option) => void;
  onOptionDelete?: (option: OptionDefault) => void;
}

const ButtonDropdownSearch: React.FC<Props> = ({
  className,
  children,
  label,
  name,
  isDisabled,
  popularList,
  selectedList,
  optionsList,
  onChange,
  onCloseChange,
  onOptionPick,
  onOptionDelete,
  onPopularChange,
}) => {
  const classNames = [styles.button, className].join(" ");

  // STATES
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (onChange != null) {
      onChange(inputValue);
    }
  }, [inputValue]);

  const handleOptionClick = (option: Option, close: () => void) => {
    if (onOptionPick) {
      onOptionPick(option);
    }
    // close();
  };

  const handleOptionClose = (optionToDelete: OptionDefault) => {
    if (onOptionDelete) {
      onOptionDelete(optionToDelete);
    }
  };

  const handleStatusChange = useCallback(
    (status: boolean) => {
      if (!status && onCloseChange != null && inputValue.length > 0) {
        onCloseChange(inputValue);
      }

      setInputValue("");
    },
    [inputValue]
  );

  const handleChangeInput: ChangeEventHandler<HTMLInputElement> = (event) => {
    setInputValue(event.currentTarget.value);
  };

  const handleClickPopularTag = (tagName: string) => {
    if (onPopularChange != null) {
      onPopularChange(tagName);
    }
  };

  return (
    <Dropdown
      className={classNames}
      initialValue={null}
      align="left"
      isDisabled={isDisabled}
      keepOnInsideClick
      animated
      onStatusChange={handleStatusChange}
      renderSelect={({ isActive }) => (
        <Button
          className={`${styles.button__button} ${
            isActive ? styles.button__button_active : ""
          }${isDisabled ? ` ${styles.button__button_disabled}` : ""}`}
        >
          <Text
            className={styles.button__buttonText}
            size="sm"
            color={isActive ? "orange" : "greyDark"}
            fontWeight="semibold"
          >
            {label}
          </Text>
          <ChevronDownIcon width={7} height={4} />
        </Button>
      )}
    >
      {({ isActive, closeDropdown }) =>
        isActive && (
          <DropmenuBubble align="left" className={styles.button__dropmenu}>
            {name && (
              <div className={styles.button__search}>
                <input
                  className={styles.button__searchInput}
                  name={name}
                  placeholder={label}
                  onChange={handleChangeInput}
                  autoComplete="off"
                />

                <SeachIcon width={11} height={11} />
              </div>
            )}
            {popularList && popularList.length > 0 && (
              <div className={styles.button__popular}>
                <Text
                  color="moonlight"
                  fontWeight="semibold"
                  uppercase
                  size="xxsm"
                >
                  Popular
                </Text>

                <div className={styles.button__popularList}>
                  {popularList.map((popular) => (
                    <Tag
                      key={popular.id}
                      className={styles.button__popularItem}
                      onClick={handleClickPopularTag}
                    >
                      {popular.name}
                    </Tag>
                  ))}
                </div>
              </div>
            )}

            {selectedList && selectedList.length > 0 && (
              <div className={styles.button__selected}>
                {selectedList.map((selected) => (
                  <Tag
                    key={selected.id}
                    className={styles.button__selectedItem}
                    theme="destructible"
                    onClose={() => handleOptionClose(selected)}
                  >
                    {selected.name}
                  </Tag>
                ))}
              </div>
            )}

            {optionsList && optionsList.length > 0 && (
              <div className={styles.button__options}>
                <ScrollList
                  onOptionClick={(option) =>
                    handleOptionClick(option, closeDropdown)
                  }
                  options={optionsList}
                />
              </div>
            )}

            {children && (
              <div className={styles.button__custom}>{children}</div>
            )}
          </DropmenuBubble>
        )
      }
    </Dropdown>
  );
};

export default ButtonDropdownSearch;
