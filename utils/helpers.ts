import { FieldErrors } from "react-hook-form";

function throttle(callback: Function, limit: number) {
  let waiting = false;

  return function cb(this: any, ...args: any[]): any {
    if (!waiting) {
      callback.apply(this, args);
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

function debounce<F extends Procedure>(
  func: F,
  waitMilliseconds = 50,
  options: Options = {
    isImmediate: false,
  }
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;

    const doLater = function () {
      timeoutId = undefined;
      func.apply(context, args);
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      func.apply(context, args);
    }
  };
}

function lessString(string: string, maxStringLength: number): string {
  if (string.length >= maxStringLength) {
    return `${string.slice(0, maxStringLength - 3)}...`;
  }
  return string;
}

type Image = {
  path: string;
  width: number;
  height: number;
};

export type ResponsiveImage = {
  width: number;
  height: number;
  placeholder: string;
  src: string;
  srcSet: string; // comma separated
  images: Image[];
};

function retinaConverter(img: ResponsiveImage): ResponsiveImage {
  const newImg = { ...img };
  const src2x = `${img.images[0].path} 2x`;
  const src = img.images[1].path;
  const scrSet = `${src}, ${src2x}`;

  newImg.src = src;
  newImg.srcSet = scrSet;

  return newImg;
}

export enum Direction {
  Right = "to right",
  Left = "to left",
  Down = "to bottom",
  Up = "to top",
}

interface ITrackBackground {
  min: number;
  max: number;
  values: number[];
  colors: string[];
  direction?: Direction;
  rtl?: boolean;
}

function getTrackBackground({
  values,
  colors,
  min,
  max,
  direction = Direction.Right,
  rtl = false,
}: ITrackBackground) {
  let currentDirection = direction;

  if (rtl && currentDirection === Direction.Right) {
    currentDirection = Direction.Left;
  } else if (rtl && Direction.Left) {
    currentDirection = Direction.Right;
  }
  const progress = values.map((value) => ((value - min) / (max - min)) * 100);
  const middle = progress.reduce(
    (acc, point, index) =>
      `${acc}, ${colors[index]} ${point}%, ${colors[index + 1]} ${point}%`,
    ""
  );
  return `linear-gradient(${currentDirection}, ${colors[0]} 0%${middle}, ${
    colors[colors.length - 1]
  } 100%)`;
}

function toDoubleNumberString(indexNumber: number): string {
  const stringNumber = (indexNumber + 1).toString();

  if (stringNumber.length < 2) {
    return `0${stringNumber}`;
  }

  return stringNumber;
}

function isStringEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function getFilterString(
  filter: { [key: string]: string | Array<string | null> },
  initialQuery: string
) {
  const filterKeyList = Object.keys(filter);

  const getFilterValue = (key: string) => {
    const filterValue = filter[key];

    if (Array.isArray(filterValue)) {
      let calculatedFilter = "";

      filterValue.forEach((value) => {
        calculatedFilter = calculatedFilter === "" ? "" : "&";

        if (value === null) {
          calculatedFilter = `${calculatedFilter}[${key}][_null]=true`;
        } else if (value === "_or") {
          calculatedFilter = `${calculatedFilter}[${key}][_logical]=or`;
        } else {
          calculatedFilter = `${calculatedFilter}[${key}][_eq]=${value}`;
        }
      });

      return calculatedFilter;
    }

    return `[${key}][_eq]=${filter[key]}`;
  };

  let newQuery = `${initialQuery}`;

  filterKeyList.forEach((filterKey) => {
    newQuery = `${newQuery}${
      newQuery === "" ? "/?" : "&"
    }filter${getFilterValue(filterKey)}`;
  });

  return newQuery;
}

function dataURItoBlob(dataURI: string) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);
  // separate out the mime component
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

function formatUserNames(
  fistname?: string | null,
  lastname?: string | null,
  isAnonymous?: 0 | 1
) {
  return `${
    fistname == null && lastname == null
      ? isAnonymous === 1
        ? "Anonymous"
        : "Unknown"
      : `${fistname || ""} ${lastname || ""}`
  }`;
}

function formatLocation(country: string | null, city: string | null) {
  if (country == null && city == null) {
    return "Unknown";
  }

  return `${country != null ? country : ""}${city != null ? ` ${city}` : ""}`;
}

function isFormHasErrors(errors: FieldErrors) {
  const errorList = Object.keys(errors);

  return errorList.length > 0;
}

function buildFormData(formData: FormData, data: any, parentKey?: string) {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    if (parentKey != null) {
      const value = data == null ? "" : data;

      formData.append(parentKey, value);
    }
  }
}

const getDirtyValues = (dirtyFields: any, allValues: any): object => {
  // NOTE: Recursive function.

  // If *any* item in an array was modified, the entire array must be submitted, because there's no
  // way to indicate "placeholders" for unchanged elements. `dirtyFields` is `true` for leaves.
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues;
  }

  // Here, we have an object.
  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) => [
      key,
      getDirtyValues(dirtyFields[key], allValues[key]),
    ])
  );
};

export {
  throttle,
  debounce,
  lessString,
  retinaConverter,
  getTrackBackground,
  toDoubleNumberString,
  isStringEmail,
  getFilterString,
  dataURItoBlob,
  formatUserNames,
  formatLocation,
  isFormHasErrors,
  buildFormData,
  getDirtyValues,
};
