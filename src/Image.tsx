import React, { FC, ReactHTMLElement, ReactHTML, HTMLAttributes } from 'react';
import { Asset } from 'contentful';
import { getUrl } from './urlBuilder';
import { ImageProps } from './types';

interface Props extends ImageProps, HTMLAttributes<HTMLImageElement> {
  asset: Asset;
}

const Image: FC<Props> = ({ asset, size, fit, ...props }) => {
  const imgProps = { size, fit };
  return (
    <picture>
      <source
        srcSet={getUrl(asset.fields.file.url, imgProps, 'webp')}
        type="image/webp"
      />
      <source
        srcSet={getUrl(asset.fields.file.url, imgProps, 'jpg')}
        type="image/jpeg"
      />
      <source
        srcSet={getUrl(asset.fields.file.url, imgProps, 'png')}
        type="image/png"
      />
      <img
        {...props}
        src={getUrl(asset.fields.file.url, imgProps, 'original')}
        alt={
          asset.fields.description
            ? asset.fields.description
            : asset.fields.title
        }
      />
    </picture>
  );
};

export default Image;
