import type { FC, CSSProperties } from "react";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  style?: CSSProperties;
}

export const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  loading,
  decoding,
  style,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding={decoding}
      style={style}
    />
  );
};
