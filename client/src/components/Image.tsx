import type { FC } from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
};
