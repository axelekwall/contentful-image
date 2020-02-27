import { ImageProps, Format, ImageSize } from './types';

const addFormat = (url: string, format: string): string => {
  if (format === 'jpg') {
    return `${url}&fm=jpg&fl=progressive`;
  } else if (format !== 'original') {
    return `${url}&fm=${format}`;
  }
  return url;
};

const addSize = (url: string, size: ImageSize): string => {
  let sizeString = '';
  if (size.width) sizeString += `&w=${size.width}`;
  if (size.height) sizeString += `&h=${size.width}`;
  return url + sizeString;
};

const addQueryString = (url: string, queryString: string) =>
  queryString.length > 0
    ? `https:${url}?${
        queryString[0] === '&'
          ? queryString.slice(1, queryString.length)
          : queryString
      }`
    : `https:${url}`;

export const getUrl = (
  baseUrl: string,
  props: ImageProps,
  format: Format,
  resolution?: number
) => {
  const { size, fit } = props;
  let queryString = '';
  if (size) {
    queryString = addSize(queryString, size);
  }
  queryString = addFormat(queryString, format);

  return addQueryString(baseUrl, queryString);
};
