import { createContext, useContext, useState } from "react";

type ScrollType = { barWidth: number; positionY: number };

export type DefaultState = {
  countries: CountryFormatted[];
  selectedCountryId: string | null;
  cities: CityFormatted[];
  isPopupOpen: boolean;
  scroll: ScrollType;
  actions: GeneralActions;
};

export type GeneralActions = {
  changePopupState: (state: boolean) => void;
  changeScrollbarWidth: (barWidth: number) => void;
  changeScrollbarPositionY: (positionY: number) => void;
  changeCountriesList: (countries: CountryFormatted[]) => void;
  changeCitiesList: (cities: CityFormatted[]) => void;
  dropCountryList: () => void;
  dropCitiesList: () => void;
  selectCountryId: (id: string) => void;
};

const defaultState: DefaultState = {
  countries: [],
  selectedCountryId: null,
  cities: [],
  isPopupOpen: false,
  scroll: {
    barWidth: 0,
    positionY: 0,
  },
  actions: {
    changePopupState: () => { },
    changeScrollbarWidth: () => { },
    changeScrollbarPositionY: () => { },
    changeCountriesList: () => { },
    changeCitiesList: () => { },
    dropCountryList: () => { },
    dropCitiesList: () => { },
    selectCountryId: () => { },
  },
};

const generalContext = createContext<DefaultState>(defaultState);

const GeneralProvider: React.FC = ({ children }) => {
  const value = useGeneralContextState();

  return (
    <generalContext.Provider value={value}>{children}</generalContext.Provider>
  );
};

function useGeneralContextState() {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<ScrollType>({
    barWidth: 0,
    positionY: 0,
  });
  const [countries, setCountries] = useState<CountryFormatted[]>([]);
  const [selectedCountryId, setSelectCountryId] = useState<string | null>(null);
  const [cities, setCities] = useState<CityFormatted[]>([]);

  const actions = {
    changePopupState: (newState: boolean): void => {
      setIsPopupOpen(newState);
    },
    changeScrollbarWidth: (barWidth: number): void => {
      setScroll((prevState) => ({ ...prevState, barWidth }));
    },
    changeScrollbarPositionY: (positionY: number): void => {
      setScroll((prevState) => ({ ...prevState, positionY }));
    },
    changeCountriesList: (countriesList: CountryFormatted[]): void => {
      setCountries(countriesList);
    },
    dropCountryList: () => {
      setCountries([]);
    },
    selectCountryId: (id: string): void => {
      setSelectCountryId(id);
    },
    changeCitiesList: (citiesList: CityFormatted[]) => {
      setCities(citiesList);
    },
    dropCitiesList: () => {
      setCities([]);
    },
  };

  return {
    isPopupOpen,
    actions,
    scroll,
    countries,
    selectedCountryId,
    cities,
  };
}

const useGeneralContext = () => useContext(generalContext);

export { GeneralProvider, useGeneralContext };
