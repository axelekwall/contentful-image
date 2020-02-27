import { Format } from "./types";

const formats: Format[] = [
  {
    type: 'image/webp',
    name: 'webp',
  },
  {
    type: 'image/png',
    name: 'png',
  },
  {
    type: 'image/jpeg',
    name: 'jpg',
  },
];

const config = {
  contentful: {
    space: '7bfyx8yi9qet',
    accessToken: 'V4BarkgOMa3TObg7DF6aj_KcCfcX5pxv4llLd9JnW98',
  },
  contentType: 'post',
  formats,
};

export default config;
