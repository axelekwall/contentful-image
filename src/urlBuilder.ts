import { ImageProps, ImageSize, FormatName } from './types';

const addFormat = (url: string, format: string): string => {
  if (format === 'jpg') {
    return `${url}&fm=jpg&fl=progressive`;
  } else if (format !== 'original') {
    return `${url}&fm=${format}`;
  }
  return url;
};

const addSize = (
  url: string,
  size: ImageSize,
  resolution: number = 1
): string => {
  let sizeString = '';
  if (size.width) sizeString += `&w=${size.width * resolution}`;
  if (size.height) sizeString += `&h=${size.width * resolution}`;
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

const addFit = (url: string, fit: string) => `${url}&fit=${fit}`;

export const getUrl = (
  baseUrl: string,
  props: ImageProps,
  format: FormatName,
  resolution?: number
) => {
  const { size, fit } = props;
  let queryString = '';
  if (size) queryString = addSize(queryString, size, resolution);
  if (fit) queryString = addFit(queryString, fit);
  queryString = addFormat(queryString, format);

  return addQueryString(baseUrl, queryString);
};
