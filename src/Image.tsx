import React, { FC, ReactHTMLElement, ReactHTML, HTMLAttributes } from 'react';
import { Asset } from 'contentful';
import { getUrl } from './urlBuilder';
import { ImageProps, Format } from './types';

interface Props extends ImageProps, HTMLAttributes<HTMLImageElement> {
  asset: Asset;
}

interface SourceProps {
  imgProps: ImageProps;
  asset: Asset;
  format: Format;
}

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

const Source: FC<SourceProps> = ({ format, asset, imgProps }) => (
  <source
    srcSet={getUrl(asset.fields.file.url, imgProps, format.name)}
    type={format.type}
  />
);

const Image: FC<Props> = ({ asset, size, fit, ...props }) => {
  const imgProps = { size, fit };
  return (
    <picture>
      {formats.map(format => (
        <Source
          key={format.name}
          asset={asset}
          imgProps={imgProps}
          format={format}
        />
      ))}
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
