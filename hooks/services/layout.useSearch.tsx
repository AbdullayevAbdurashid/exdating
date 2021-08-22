import { useCallback, useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";

// Import API
import { getPopularHashtags } from "api/general";

// import CONTEXT
import { context } from "context";

// Import HOOKS
import { commonHooks } from "hooks";

// Import COMPONENTS
import { Text } from "components";

// Import TEMPLATES
import { OPTIONS_CITIES } from "layouts/PageGlobalSearch/PageGlobalSearch.temp";

type ItemNode = { item: React.ReactNode; id: string; value: string };

const STYLE = { lineHeight: "30px", paddingLeft: "10px", paddingRight: "10px" };

const useSearch = () => {
  // CONTEXTS
  const { useGeneralContext } = context;
  const { countries: countriesList } = useGeneralContext();

  // STATES
  const [countriesOptionList, setCountriesOptionList] = useState<ItemNode[]>(
    []
  );
  const [countryListFilter, setCountryListFilter] = useState<string>("");
  const [citiesList, setCitiesListState] = useState<ItemNode[]>([]);
  const [popupFilterState, setPopupFilterState] = useState(false);
  const [popularHashtagList, setPopularHashtagList] = useState<
    { name: string; id: string }[]
  >([]);

  // HOOKS
  const { useDimension } = commonHooks;
  const { width } = useDimension();

  // FORMS
  const {
    register,
    watch,
    reset,
    setValue,
    getValues,
    formState: { isDirty },
  } = useForm<FeedbacksSearchQueryForm>({
    defaultValues: {
      enterField: "",
      tags: "",
      sorted: "likes_count",
      countries: [],
    },
  });
  const enterField = watch("enterField");
  const tags = watch("tags");
  const sorted = watch("sorted");
  const countries = watch("countries");
  const allFormData = watch();

  useEffect(() => {
    console.log("allFormData: ", allFormData);
  }, [allFormData]);

  useEffect(function registerCustomFields() {
    register("tags");
    register("sorted");
    register("countries");
  }, []);

  useEffect(
    function fetchPopularHashtags() {
      getPopularHashtags().then((popularHashtagsResponse) => {
        console.log("popularHashtagsResponse: ", popularHashtagsResponse);
        if (popularHashtagsResponse.status) {
          setPopularHashtagList(
            popularHashtagsResponse.payload.data.map((popHashtag) => ({
              id: popHashtag.name,
              name: popHashtag.name,
            }))
          );
        }
      });
    },
    [getPopularHashtags]
  );

  useEffect(
    function closePopupFilterOnDesktop() {
      if (popupFilterState && width && width >= 768) {
        setPopupFilterState(false);
      }
    },
    [width, popupFilterState]
  );

  useEffect(
    function convertCountries() {
      const countriesListConverted: ItemNode[] = countriesList.map(
        (country) => ({
          id: country.id,
          value: country.value,
          item: (
            <Text style={STYLE} size="sm" color="greyDark">
              {country.value}
            </Text>
          ),
        })
      );

      const citiesListConverted: ItemNode[] = OPTIONS_CITIES.map((city) => ({
        id: city.id,
        value: city.name,
        item: (
          <Text style={STYLE} size="sm" color="greyDark">
            {city.name}
          </Text>
        ),
      }));

      setCountriesOptionList(countriesListConverted);
      setCitiesListState(citiesListConverted);
    },
    [countriesList]
  );

  const selectedCountries = useMemo(() => {
    const selectedCountryList = countries.map((country) => {
      let pickedCountryItem: null | { name: string; id: string } = null;

      for (let index = 0; index < countriesList.length; index += 1) {
        const element = countriesList[index];

        if (element.id === country) {
          pickedCountryItem = { id: element.id, name: element.value };
          break;
        }
      }

      return pickedCountryItem;
    });

    function notEmpty<TValue>(
      value: TValue | null | undefined
    ): value is TValue {
      return value !== null && value !== undefined;
    }

    return selectedCountryList.filter(notEmpty);
  }, [countriesList, countries]);

  const handleClearForm = () => {
    reset();
    register("tags");
    register("sorted");
    register("countries");
  };

  const handleChangeTags = (tagName: string) => {
    const reg = /(#[a-zA-Z0-9]+,? *)*#[a-zA-Z0-9]+/;
    const tagResult = tagName.match(reg);

    // console.log("tagResult: ", tagResult);

    if (tagResult != null) {
      // console.log("tagResult string: ", tagResult[0]);
      const tagResultCleared = tagResult[0].replace(/[^a-zA-Z0-9#]/g, "");
      const tagResultFinal = tagResultCleared.split("#");
      // console.log("tagResultCleared: ", tagResultCleared);
      // console.log("tagResultFinal: ", tagResultFinal);
      setValue("tags", `#${tagResultFinal[1]}`, { shouldDirty: true });
    }
  };

  const handleClearTags = () => {
    setValue("tags", "");
  };

  const handleFilterCountries = useCallback(
    (filterText: string) => {
      setCountryListFilter(filterText);
    },
    [countriesOptionList]
  );

  const filteredCountriesOptionList = useMemo(() => {
    const reg = new RegExp(`^${countryListFilter}`, "gi");

    return countriesOptionList.filter(
      (countryOption) => countryOption.value.match(reg) != null
    );
  }, [countryListFilter, countriesOptionList]);

  const handleToggleCountry = (countryId: string) => {
    const currentCountiesArray = getValues("countries");
    const currentCountriesMap = new Map(
      currentCountiesArray.map((currentCountry) => [
        currentCountry,
        currentCountry,
      ])
    );

    if (currentCountriesMap.has(countryId)) {
      currentCountriesMap.delete(countryId);
    } else {
      currentCountriesMap.set(countryId, countryId);
    }

    setValue("countries", Array.from(currentCountriesMap.keys()));
  };

  const handleSortChange = useCallback((sort: SortFilter) => {
    setValue("sorted", sort, { shouldDirty: true });
  }, []);

  const form = {
    register,
    isDirty,
    handleClearForm,
    states: {
      enterField,
      tags,
      sorted,
      countries,
    },
  };

  const actions = {
    setPopupFilterState,
    handleChangeTags,
    handleSortChange,
    handleClearTags,
    handleToggleCountry,
    handleFilterCountries,
  };

  const states = {
    isPopupFilterActive: popupFilterState,
    popularHashtagList,
    filteredCountriesOptionList,
    citiesList,
    selectedCountries,
  };

  return {
    form,
    actions,
    states,
  };
};

export default useSearch;
