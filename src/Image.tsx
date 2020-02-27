import React, { FC, HTMLAttributes, useMemo, CSSProperties } from 'react';
import { Asset } from 'contentful';
import { getUrl } from './urlBuilder';
import { ImageProps, Format, ImageSize } from './types';
import config from './config';
import useImgLazyLoad from './useImgLazyLoad';

interface Props extends ImageProps, HTMLAttributes<HTMLImageElement> {
  asset: Asset;
  imgStyle?: CSSProperties;
  imgClassName?: string;
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
  if (size && size.height && size.width) {
    return size.width / size.height;
  }
  return original;
};

const Image: FC<Props> = ({
  asset,
  size,
  fit,
  style,
  imgStyle,
  className,
  ...props
}) => {
  const imgProps = { size, fit };
  const aspectRation = useMemo(() => getAspectRatio(asset, size), [
    asset,
    size,
  ]);
  const { loaded, preloaded, onLoaded, preloadedUrl } = useImgLazyLoad(
    getUrl(
      asset.fields.file.url,
      {
        size: { width: 20 },
      },
      'jpg'
    )
  );
  return (
    <div
      style={{
        width: size.width || asset.fields.file.details.image.width,
        height:
          (size.width || asset.fields.file.details.image.width) / aspectRation,
        filter: loaded ? 'blur(0px)' : 'blur(10px)',
        transition: 'filter 200ms',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: preloaded ? `url(${preloadedUrl})` : '',
        ...style,
      }}
      className={className}
    >
      {preloaded && (
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
            style={{
              width: '100%',
              height: '100%',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 200ms',
              objectFit: 'cover',
              objectPosition: 'center',
              ...imgStyle,
            }}
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
      )}
    </div>
  );
};

export default Image;
