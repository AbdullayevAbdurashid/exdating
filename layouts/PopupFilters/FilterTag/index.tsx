// Import LAYOUTS
import FilterTemplate from "../FilterTemplate";

type Props = {
  className?: string;
  style?: React.CSSProperties;
  register: () => RefReturn;
  onBack: () => void;
  onSave: () => void;
};

const FilterTag: React.FC<Props> = ({
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
      label="Tag"
      input={{ name: "tag", placeholder: "Search" }}
      register={register}
      className={classNames}
      onBack={onBack}
      onSave={onSave}
    >
      Hello Tag
    </FilterTemplate>
  );
};

export default FilterTag;
