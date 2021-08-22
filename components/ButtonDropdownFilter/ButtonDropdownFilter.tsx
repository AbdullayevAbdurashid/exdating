// Import COMPONENTS
import { Dropdown, DropmenuBubble, Text, Button } from "components";

// Import MEDIA
import ChevronDownIcon from "public/icons/icon-chevron-down-custom.svg";
import { useCallback, useEffect, useMemo, useState } from "react";

// Import STYLES
import styles from "./ButtonDropdownFilter.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  value?: SortFilter;
  onSortChange: (filter: SortFilter) => void;
};

const ButtonDropdownFilter: React.FC<Props> = ({
  className,
  onSortChange,
  value,
  style,
}) => {
  const classNames = [styles.filter, className].join(" ");

  // STATES
  const [appliedFilter, setAppliedFilter] = useState<SortFilter>("views_count");

  useEffect(() => {
    if (value == null) {
      onSortChange(appliedFilter);
    }
  }, [appliedFilter, value]);

  const handleChangeSorting = (filter: SortFilter) => {
    if (value == null) {
      setAppliedFilter(filter);
    } else {
      onSortChange(filter);
    }
  };

  const renderText = useCallback((text: SortFilter) => {
    switch (text) {
      case "views_count":
        return "Most Viewed";
      case "likes_count":
        return "Most Liked";
      default:
        return "Unknown";
    }
  }, []);

  return (
    <Dropdown
      className={classNames}
      initialValue={null}
      align="right"
      animated
      renderSelect={({ isActive }) => (
        <Button
          className={`${styles.filter__button} ${
            isActive ? styles.filter__button_active : ""
          }`}
        >
          <Text inline size="sm" color={isActive ? "orange" : "greyDark"}>
            {renderText(value != null ? value : appliedFilter)}
          </Text>

          <ChevronDownIcon width={7} height={4} />
        </Button>
      )}
    >
      {() => (
        <DropmenuBubble className={styles.filter__dropdown} align="right">
          <ul className={styles.ffilter__dropdownList}>
            <li>
              <Button
                onClick={() => handleChangeSorting("likes_count")}
                className={styles.filter__dropdownItem}
              >
                Most Liked
              </Button>
            </li>

            <li>
              <Button
                onClick={() => handleChangeSorting("views_count")}
                className={styles.filter__dropdownItem}
              >
                Most Viewed
              </Button>
            </li>
          </ul>
        </DropmenuBubble>
      )}
    </Dropdown>
  );
};

export default ButtonDropdownFilter;
