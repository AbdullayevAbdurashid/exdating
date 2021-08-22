import { memo } from "react";

// Import CONTROLLERS
import usePageFeedbacksController from "../PageFeedbacks/PageFeedbacks.controller";

// Import COMPONENTS
import {
  ButtonDropdownSearch,
  Container,
  BoxFeedback,
  Flexbox,
  Tag,
  Text,
  Input,
  InputWithSelectSocial,
  Button,
  PopupSimple,
  ButtonDropdownFilter,
} from "components";

// Import LAYOUTS
import { PopupFilters } from "layouts";

// Import SERVICES
import { serviceHooks } from "hooks";

// Import MEDIA
import CloseIcon from "public/icons/icon-close.svg";
import FilterIcon from "public/icons/icon-filter.svg";

// Import STYLES
import styles from "./PageGlobalSearch.module.scss";

type Props = {
  className?: string;
  feedbacks: APIResponseWithData<SearchGlobalResponse>;
};

const PageGlobalSearch: React.FC<Props> = ({ className, feedbacks }) => {
  const classNames = [styles.globalSearch, className].join(" ");

  // SERVICES
  const { useSearch } = serviceHooks;
  const {
    form: {
      register,
      isDirty,
      handleClearForm,
      states: { enterField, tags, sorted, countries },
    },
    actions: {
      setPopupFilterState,
      handleChangeTags,
      handleSortChange,
      handleClearTags,
      handleToggleCountry,
      handleFilterCountries,
    },
    states: {
      isPopupFilterActive,
      popularHashtagList,
      filteredCountriesOptionList,
      citiesList,
      selectedCountries,
    },
  } = useSearch();

  // CONTROLLERS
  const {
    states: { feedbacksList, isLoading, isCanLoadMore },
    actions: { loadMoreFeedbacks },
  } = usePageFeedbacksController(
    feedbacks,
    { enterField, tags, sorted, countries },
    isDirty
  );

  const handleOpenMobileFilter = () => {
    setPopupFilterState(true);
  };

  const handleOnClose = () => {
    setPopupFilterState(false);
  };

  return (
    <main className={classNames}>
      <Flexbox
        direction="column"
        align="center"
        className={styles.globalSearch__title}
      >
        <Text
          className={styles.globalSearch__titleText}
          as="h2"
          color="greyDark"
        >
          Global search
        </Text>

        <Text
          className={styles.globalSearch__titleTextSub}
          size="md"
          color="greyMedium"
        >
          Find a feedback about a specific person
        </Text>
      </Flexbox>

      <section className={styles.globalSearch__section}>
        <form className={styles.globalSearch__search}>
          <Container className={styles.globalSearch__searchContainer}>
            <div className={styles.globalSearch__searchFilters}>
              <Input
                name="enterField"
                register={register}
                className={styles.globalSearch__searchItem}
                isSearchType
                placeholder="Search"
              />

              <ButtonDropdownSearch
                className={styles.globalSearch__searchItem}
                label="Tags"
                name="tags"
                popularList={popularHashtagList}
                onCloseChange={handleChangeTags}
                onPopularChange={handleChangeTags}
              />

              <ButtonDropdownSearch
                className={styles.globalSearch__searchItem}
                label={`${
                  selectedCountries.length === 0
                    ? ""
                    : `${selectedCountries.length} `
                }Country`}
                name="country"
                selectedList={selectedCountries}
                optionsList={filteredCountriesOptionList}
                onOptionPick={(pickedOption) =>
                  handleToggleCountry(pickedOption.id)
                }
                onOptionDelete={(optionToDelete) =>
                  handleToggleCountry(optionToDelete.id)
                }
                onChange={handleFilterCountries}
              />

              <ButtonDropdownSearch
                className={styles.globalSearch__searchItem}
                label="City"
                name="city"
                optionsList={citiesList}
                // isDisabled={selectedCountries.length === 0}
                isDisabled
              />

              <ButtonDropdownSearch
                className={styles.globalSearch__searchItem}
                label="Social network"
                isDisabled
              >
                <InputWithSelectSocial
                  nameInput="socialurl"
                  nameSelect="socialtype"
                  register={register}
                />
              </ButtonDropdownSearch>
            </div>

            <div className={styles.globalSearch__searchClear}>
              {isDirty && (
                <Button
                  className={styles.globalSearch__searchClearBtn}
                  theme="transparent"
                  onClick={handleClearForm}
                >
                  <CloseIcon width={9} height={9} viewBox="0 0 13 13" />
                  <Text
                    className={styles.globalSearch__searchClearText}
                    color="orange"
                    size="sm"
                  >
                    Clear all
                  </Text>
                </Button>
              )}
            </div>
          </Container>
        </form>

        <Button
          onClick={handleOpenMobileFilter}
          className={styles.globalSearch__searchBtn}
          theme="bordered"
        >
          <FilterIcon width={14} height={14} />
          <Text
            className={styles.globalSearch__searchBtnText}
            color="orange"
            size="sm"
            fontWeight="semibold"
          >
            Filters
          </Text>
        </Button>

        <div className={styles.globalSearch__result}>
          <Container className={styles.globalSearch__resultContainer}>
            <div className={styles.globalSearch__resultTags}>
              {tags && tags.length > 0 && (
                <Tag
                  theme="destructible"
                  className={styles.globalSearch__resultTag}
                  onClose={handleClearTags}
                >
                  {tags}
                </Tag>
              )}
            </div>

            <div className={styles.globalSearch__resultStats}>
              <Text size="sm" color="moonlight">
                NO API result
              </Text>

              <div className={styles.globalSearch__resultFilter}>
                <Text inline size="sm" color="moonlight">
                  Sort by:
                </Text>

                <ButtonDropdownFilter
                  onSortChange={handleSortChange}
                  value={sorted}
                  className={styles.globalSearch__resultFilterDropdown}
                />
              </div>
            </div>

            <div className={styles.globalSearch__resultWrapper}>
              {isLoading ? (
                <Text>Loading...</Text>
              ) : feedbacksList.length > 0 ? (
                <ul className={styles.globalSearch__resultList}>
                  {feedbacksList.map((feedback) => (
                    <li
                      key={feedback.id}
                      className={styles.globalSearch__resultItem}
                    >
                      <BoxFeedback content={feedback} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.globalSearch__resultNoResult}>
                  <Text color="moonlight">No feedbacks found</Text>
                </div>
              )}

              {isCanLoadMore && (
                <Button
                  className={styles.globalSearch__resultLoadMoreBtn}
                  onClick={loadMoreFeedbacks}
                  theme="gradient"
                >
                  <Text
                    color="white"
                    size="sm"
                    fontWeight="semibold"
                    className={styles.mainBFeedbacks__addBtnText}
                  >
                    Load more
                  </Text>
                </Button>
              )}
            </div>
          </Container>
        </div>
      </section>

      <PopupSimple
        className="fullscreen"
        onClose={handleOnClose}
        open={isPopupFilterActive}
        modal
      >
        {(close) => <PopupFilters register={register} onClose={close} />}
      </PopupSimple>
    </main>
  );
};

const PageGlobalSearchMemoized = memo(PageGlobalSearch);

export default PageGlobalSearchMemoized;
