import React, { FC, HTMLAttributes, useCallback, useMemo } from 'react';
import { Asset } from 'contentful';
import { getUrl } from './urlBuilder';
import { ImageProps, Format, ImageSize } from './types';
import config from './config';

interface Props extends ImageProps, HTMLAttributes<HTMLImageElement> {
  asset: Asset;
}

interface SourceProps {
  imgProps: ImageProps;
  asset: Asset;
  format: Format;
}

const Source: FC<SourceProps> = ({ format, asset, imgProps }) => (
  <source
    srcSet={`${getUrl(asset.fields.file.url, imgProps, format.name)},
    ${getUrl(asset.fields.file.url, imgProps, format.name, 1.5)} 1.5x, 
    ${getUrl(asset.fields.file.url, imgProps, format.name, 2)} 2x`}
    type={format.type}
  />
);

const getAspectRatio = (asset: Asset, size?: ImageSize) => {
  const original =
    asset.fields.file.details.image.width /
    asset.fields.file.details.image.height;

  console.log(original);
  if (size && size.height && size.width) {
    return size.width / size.height;
  }
  return original;
};

const Image: FC<Props> = ({ asset, size, fit, style, className, ...props }) => {
  const imgProps = { size, fit };
  const aspectRation = useMemo(() => getAspectRatio(asset, size), [
    asset,
    size,
  ]);
  const onLoaded = useCallback(() => {
    console.log('loaded!');
  }, []);
  return (
    <div
      style={{
        width: size.width || asset.fields.file.details.image.width,
        height:
          (size.width || asset.fields.file.details.image.width) / aspectRation,
        ...style,
      }}
      className={className}
    >
      <picture>
        {config.formats.map(format => (
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
          loading="lazy"
          onLoad={onLoaded}
          alt={
            asset.fields.description
              ? asset.fields.description
              : asset.fields.title
          }
        />
      </picture>
    </div>
  );
};

export default Image;
