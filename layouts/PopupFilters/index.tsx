import { useState } from "react";

// Import COMPONENTS
import { Text, Tag, Button } from "components";

// Import LAYOUTS
import { WrapperPopup } from "layouts";
import FilterTemplate from "./FilterTemplate";
import FilterCountry from "./FilterCountry";
import FilterCity from "./FilterCity";
import FilterTag from "./FilterTag";
import FilterSocialNetwork from "./FilterSocialNetwork";

// Import MEDIA
import ChevronDownIcon from "public/icons/icon-chevron-down-custom.svg";

// Import STYLES
import styles from "./PopupFilters.module.scss";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  onClose: () => void;
  register: () => RefReturn;
};

const PopupFilters: React.FC<Props> = ({
  className,
  style,
  onClose,
  register,
}) => {
  const classNames = [styles.popup, className].join(" ");
  const [menuActiveStatusList, setMenuActiveStatusList] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const handleToggleCountryMenu = () => {
    setMenuActiveStatusList((prevState) =>
      toggleMenuActiveStatusState(prevState, 1)
    );
  };

  const handleToggleCityMenu = () => {
    setMenuActiveStatusList((prevState) =>
      toggleMenuActiveStatusState(prevState, 2)
    );
  };
  const handleToggleSocialMenu = () => {
    setMenuActiveStatusList((prevState) =>
      toggleMenuActiveStatusState(prevState, 3)
    );
  };
  const handleToggleTagMenu = () => {
    setMenuActiveStatusList((prevState) =>
      toggleMenuActiveStatusState(prevState, 0)
    );
  };

  function toggleMenuActiveStatusState(prevState: boolean[], index: number) {
    const newState = [...prevState];

    newState[index] = !prevState[index];

    return newState;
  }

  const handleSaveDumb = () => {
    console.log("handleSaveDumb!");
  };

  return (
    <WrapperPopup onClose={onClose} style={style} className={classNames}>
      <FilterTemplate
        label="All filters"
        renderFilters={() => (
          <ul className={styles.popup__filtersList}>
            <li className={styles.popup__filtersListItem}>
              <Tag theme="destructible">Moscow</Tag>
            </li>
            <li className={styles.popup__filtersListItem}>
              <Tag theme="destructible">Russia</Tag>
            </li>
          </ul>
        )}
        input={{ name: "searchmobile", placeholder: "Enter name" }}
        register={register}
      >
        <ul className={styles.popup__filtersButtons}>
          <li className={styles.popup__filtersButtonsItem}>
            <Button
              onClick={handleToggleTagMenu}
              className={styles.popup__filtersButtonsItemBtn}
            >
              <Text size="sm" fontWeight="semibold" color="greyDark">
                Tags
              </Text>
              <div className={styles.popup__filtersButtonsItemIcon}>
                <ChevronDownIcon />
              </div>
            </Button>
          </li>
          <li className={styles.popup__filtersButtonsItem}>
            <Button
              onClick={handleToggleCountryMenu}
              className={styles.popup__filtersButtonsItemBtn}
            >
              <Text size="sm" fontWeight="semibold" color="greyDark">
                Country
              </Text>
              <div className={styles.popup__filtersButtonsItemIcon}>
                <ChevronDownIcon />
              </div>
            </Button>
          </li>
          <li className={styles.popup__filtersButtonsItem}>
            <Button
              onClick={handleToggleCityMenu}
              className={styles.popup__filtersButtonsItemBtn}
            >
              <Text size="sm" fontWeight="semibold" color="greyDark">
                City
              </Text>
              <div className={styles.popup__filtersButtonsItemIcon}>
                <ChevronDownIcon />
              </div>
            </Button>
          </li>
          <li className={styles.popup__filtersButtonsItem}>
            <Button
              onClick={handleToggleSocialMenu}
              className={styles.popup__filtersButtonsItemBtn}
            >
              <Text size="sm" fontWeight="semibold" color="greyDark">
                Social network
              </Text>
              <div className={styles.popup__filtersButtonsItemIcon}>
                <ChevronDownIcon />
              </div>
            </Button>
          </li>
        </ul>
      </FilterTemplate>

      <FilterTag
        className={`${styles.popup__filterSubMenu} ${
          menuActiveStatusList[0] ? styles.popup__filterSubMenu_active : ""
        }`}
        register={register}
        onBack={handleToggleTagMenu}
        onSave={handleSaveDumb}
      />

      <FilterCountry
        className={`${styles.popup__filterSubMenu} ${
          menuActiveStatusList[1] ? styles.popup__filterSubMenu_active : ""
        }`}
        register={register}
        onBack={handleToggleCountryMenu}
        onSave={handleSaveDumb}
      />

      <FilterCity
        className={`${styles.popup__filterSubMenu} ${
          menuActiveStatusList[2] ? styles.popup__filterSubMenu_active : ""
        }`}
        register={register}
        onBack={handleToggleCityMenu}
        onSave={handleSaveDumb}
      />

      <FilterSocialNetwork
        className={`${styles.popup__filterSubMenu} ${
          menuActiveStatusList[3] ? styles.popup__filterSubMenu_active : ""
        }`}
        register={register}
        onBack={handleToggleSocialMenu}
        onSave={handleSaveDumb}
      />
    </WrapperPopup>
  );
};

export default PopupFilters;
