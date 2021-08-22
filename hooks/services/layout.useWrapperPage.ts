import { useEffect, useLayoutEffect } from "react";

// import CONTEXT
import { context } from "context";

// Import API
import { getSelf } from "api/user";
import { getCountries, getCities } from "api/general";

const useWrapperPage = (
  self?: UserSelf | null,
  fetchLocationsData?: boolean
) => {
  const { useGeneralContext, useUserContext } = context;
  const {
    isPopupOpen,
    countries,
    selectedCountryId,
    scroll: { barWidth },
    actions: {
      changeScrollbarWidth,
      changeCountriesList,
      dropCitiesList,
      changeCitiesList,
    },
  } = useGeneralContext();
  const {
    actions: { setUserData, destroyUserData },
  } = useUserContext();

  useEffect(() => {
    if (self == null) {
      getSelf().then((selfResponse) => {
        if (selfResponse.status) {
          setUserData(selfResponse.payload.data);
        } else {
          destroyUserData();
        }
      });
    } else {
      setUserData(self);
    }
  }, [self]);

  useEffect(
    function fetchCountriesList() {
      if (countries.length === 0 && fetchLocationsData) {
        getCountries().then((countriesResponse) => {
          if (countriesResponse.status) {
            const formattedCountriesList: CountryFormatted[] = countriesResponse.payload.data.map(
              (country) => ({
                id: country.isoCode,
                value: country.name,
              })
            );

            changeCountriesList(formattedCountriesList);
          }
        });
      }
    },
    [countries, fetchLocationsData]
  );

  useEffect(
    function fetchCitiesBySelectedCountry() {
      if (selectedCountryId != null) {
        getCities(selectedCountryId).then((citiesResponse) => {
          console.log("citiesResponse: ", citiesResponse);

          if (citiesResponse.status) {
            const formattedCitiesList: CityFormatted[] = citiesResponse.payload.data.map(
              (city) => ({ id: city.name, value: city.name })
            );

            changeCitiesList(formattedCitiesList);
          } else {
            dropCitiesList();
          }
        });
      } else {
        dropCitiesList();
      }
    },
    [selectedCountryId]
  );

  useEffect(function setPageScrollbarWidth() {
    if (typeof window !== "undefined") {
      const windowWidth = window.innerWidth;
      const { clientWidth } = document.body;
      const scrollbarWidth = windowWidth - clientWidth;

      changeScrollbarWidth(scrollbarWidth);
    }
  }, []);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflowY = isPopupOpen ? "hidden" : "auto";
      document.body.style.paddingRight = isPopupOpen ? `${barWidth}px` : "0px";
    }
  }, [isPopupOpen, barWidth]);
};

export default useWrapperPage;
