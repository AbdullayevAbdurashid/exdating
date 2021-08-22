import { useEffect, useMemo, useState } from "react";
import useSWR, { keyInterface } from "swr";

// Import UTILS
import { helpers } from "utils";

type Options = {
  fields?: string;
  filter?: { [key: string]: string | Array<string | null> };
};

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());

const useFetcher = <T>(key: keyInterface, options?: Options) => {
  const { getFilterString } = helpers;

  const setSubQuery = useMemo(() => {
    let subQuery = "";

    if (options) {
      if (options.fields) {
        subQuery = `${subQuery}/?fields=${options.fields}`;
      }

      if (options.filter) {
        subQuery = getFilterString(options.filter, subQuery);
      }
    }

    return subQuery;
  }, [options]);

  const [isLoading, setIsLoading] = useState(true);
  const { isValidating, mutate, revalidate, data, error } = useSWR<T>(
    `${key}${setSubQuery}`,
    fetcher
  );

  useEffect(() => {
    if (data != null) {
      setIsLoading(false);
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("isValidating: ", isValidating);
  // }, [isValidating]);

  return { isValidating, mutate, revalidate, data, error, isLoading };
};

export default useFetcher;
