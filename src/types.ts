import { Asset } from 'contentful';

export interface ImageSize {
  width?: number;
  height?: number;
}

export type Fit = 'crop' | 'scale' | 'pad' | 'fill';

export interface ImageProps {
  size?: ImageSize;
  fit?: Fit;
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
