import React, { FC } from 'react';
import { Asset } from 'contentful';
import { getUrl } from './getUrl';

interface ImageSize {
  width?: number;
  height?: number;
}

export interface ImageProps {
  size?: ImageSize;
  fit?: string;
}

interface Props extends ImageProps {
  asset: Asset;
}

const Image: FC<Props> = ({ asset, children, ...imgProps }) => {
  console.log(asset.fields);
  return (
    <picture>
      <source
        src={getUrl(asset.fields.file.url, imgProps, 'webp')}
        type="image/webp"
      />
      <img
        src={getUrl(asset.fields.file.url, imgProps, 'original')}
        alt={asset.fields.description}
      />
    </picture>
  );
};

export default Image;
