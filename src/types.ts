import { Asset } from 'contentful';

export interface ImageSize {
  width?: number;
  height?: number;
}

export interface ImageProps {
  size?: ImageSize;
  fit?: string;
}

export type FormatName = 'jpg' | 'png' | 'webp' | 'original';

export interface Format {
  type: string;
  name: FormatName;
}

export interface Post {
  title: string;
  body: string;
  images: Array<Asset>;
}
