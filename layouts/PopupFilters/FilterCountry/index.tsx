// Import LAYOUTS
import FilterTemplate from "../FilterTemplate";
import FilterList from "../FilterList";

// Import TEMPLATES
import { COUNTRY_LIST } from "./FilterCountry.temp";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  register: () => RefReturn;
  onBack: () => void;
  onSave: () => void;
};

const FilterCountry: React.FC<Props> = ({
  className,
  style,
  register,
  onBack,
  onSave,
}) => {
  const classNames = [className].join(" ");

  return (
    <FilterTemplate
      style={style}
      label="Country"
      input={{ name: "country", placeholder: "Search" }}
      register={register}
      className={classNames}
      onBack={onBack}
      onSave={onSave}
    >
      <FilterList list={COUNTRY_LIST} />
    </FilterTemplate>
  );
};

export default FilterCountry;
