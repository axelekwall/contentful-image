import React, { FC } from 'react';
import { Asset } from 'contentful';
import { getUrl } from './urlBuilder';
import { ImageProps } from './types';

interface Props extends ImageProps {
  asset: Asset;
}

const Image: FC<Props> = ({ asset, fit, size, ...props }) => {
  const imgProps = { fit, size };
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
        alt={asset.fields.description}
      />
    </picture>
  );
};

export default Image;
