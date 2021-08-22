// Import CONTROLLERS
import usePageFeedbacksController from "./PageFeedbacks.controller";

// Import COMPONENTS
import {
  Text,
  Container,
  Button,
  BoxFeedback,
  Input,
  ButtonDropdownSearch,
  InputWithSelectSocial,
  Tag,
  PopupSimple,
  Flexbox,
  ButtonDropdownFilter,
} from "components";

// Import LAYOUTS
import { ButtonLoadMore, PopupFilters } from "layouts";

// Import SERVICES
import { serviceHooks } from "hooks";

// Import MEDIA
import CloseIcon from "public/icons/icon-close.svg";
import FilterIcon from "public/icons/icon-filter.svg";

// Import STYLES
import styles from "./PageFeedbacks.module.scss";

type Props = {
  className?: string;
  feedbacks: APIResponseWithData<SearchGlobalResponse>;
};

const PageFeedbacks: React.FC<Props> = ({ className, feedbacks }) => {
  const classNames = [styles.feedbacks, className].join(" ");

  // SERVICES
  const { useSearch } = serviceHooks;
  const {
    form: {
      states: { countries, enterField, sorted, tags },
      isDirty,
      register,
      handleClearForm,
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
    states: { feedbacksList, isCanLoadMore, isLoading },
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
      <Container className={styles.feedbacks__titleContainer}>
        <Text className={styles.feedbacks__titleText} as="h3" color="greyDark">
          All feedbacks
        </Text>
      </Container>

      <section className={styles.feedbacks__feedbacks}>
        <form className={styles.feedbacks__search}>
          <Container className={styles.feedbacks__searchContainer}>
            <div className={styles.feedbacks__searchFilters}>
              <Input
                name="enterField"
                register={register}
                className={styles.feedbacks__searchItem}
                isSearchType
                placeholder="Search"
              />

              <ButtonDropdownSearch
                className={styles.feedbacks__searchItem}
                label="Tags"
                name="tags"
                popularList={popularHashtagList}
                onCloseChange={handleChangeTags}
                onPopularChange={handleChangeTags}
              />

              <ButtonDropdownSearch
                className={styles.feedbacks__searchItem}
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
                className={styles.feedbacks__searchItem}
                label="City"
                name="city"
                optionsList={citiesList}
                isDisabled
              />

              <ButtonDropdownSearch
                className={styles.feedbacks__searchItem}
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

            <div className={styles.feedbacks__searchClear}>
              {isDirty && (
                <Button
                  className={styles.feedbacks__searchClearBtn}
                  theme="transparent"
                  onClick={handleClearForm}
                >
                  <CloseIcon viewBox="0 0 13 13" width={9} height={9} />
                  <Text
                    className={styles.feedbacks__searchClearText}
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

        <div className={styles.feedbacks__result}>
          <Container className={styles.feedbacks__resultContainer}>
            <Button
              onClick={handleOpenMobileFilter}
              className={styles.feedbacks__searchBtn}
              theme="bordered"
            >
              <FilterIcon width={14} height={14} />
              <Text
                className={styles.feedbacks__searchBtnText}
                color="orange"
                size="sm"
                fontWeight="semibold"
              >
                Filters
              </Text>
            </Button>

            <div className={styles.feedbacks__resultTags}>
              {tags && tags.length > 0 && (
                <Tag
                  theme="destructible"
                  className={styles.feedbacks__resultTag}
                  onClose={handleClearTags}
                >
                  {tags}
                </Tag>
              )}
            </div>

            <div className={styles.feedbacks__sorting}>
              <Text
                size="sm"
                color="moonlight"
                className={styles.feedbacks__sortingResult}
              >
                NO API result
              </Text>

              <Flexbox align="center" className={styles.feedbacks__sortingBox}>
                <Text inline size="sm" color="moonlight">
                  Sort by:{" "}
                </Text>

                <ButtonDropdownFilter
                  onSortChange={handleSortChange}
                  value={sorted}
                  className={styles.feedbacks__sortingDropdown}
                />
              </Flexbox>
            </div>

            <div className={styles.feedbacks__resultWrapper}>
              {isLoading ? (
                <Text>Loading...</Text>
              ) : feedbacksList.length > 0 ? (
                <ul className={styles.feedbacks__feedbacksList}>
                  {feedbacksList.map((feedback) => (
                    <li
                      key={feedback.id}
                      className={styles.feedbacks__feedbacksListItem}
                    >
                      <BoxFeedback content={feedback} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className={styles.feedbacks__resultNotFound}>
                  <Text color="moonlight">No feedbacks found</Text>
                </div>
              )}

              {isCanLoadMore && (
                <ButtonLoadMore
                  className={styles.feedbacks__moreBtn}
                  onClick={loadMoreFeedbacks}
                />
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

export default PageFeedbacks;
