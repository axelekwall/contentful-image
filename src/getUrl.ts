import { ImageProps } from './Image';

export type Format = 'jpg' | 'png' | 'webp' | 'original';

const addFormat = (url: string, format: string): string => {
  if (format === 'jpg') {
    return `${url}?fm=jpg&fl=progressive`;
  } else if (format !== 'original') {
    return `${url}?fm=${format}`;
  }
  return url;
};

export const getUrl = (
  baseUrl: string,
  props: ImageProps,
  format: Format,
  resolution?: number
) => {
  const { size, fit } = props;
  let url = 'https:' + baseUrl;
  if (size) {
  }

  return addFormat(url, format);
};
