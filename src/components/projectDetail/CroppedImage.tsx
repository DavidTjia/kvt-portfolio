import Image from "next/image";
import type { CSSProperties } from "react";
import type { LogoCrop } from "@/types/projectDetail";

interface CroppableImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  unoptimized?: boolean;
  crop?: LogoCrop;
}

interface CroppedImageProps {
  image: CroppableImage;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  priority?: boolean;

  fit?: "width" | "height";
}

export function CroppedImage({
  image,
  sizes,
  className,
  style,
  priority,
  fit = "width",
}: CroppedImageProps) {
  const { crop } = image;

  const frameStyle: CSSProperties = {
    aspectRatio: crop
      ? `${crop.width} / ${crop.height}`
      : image.width && image.height
        ? `${image.width} / ${image.height}`
        : "16 / 9",
  };

  const innerStyle: CSSProperties = crop
    ? {
        left: `${(-crop.x / crop.width) * 100}%`,
        top: `${(-crop.y / crop.height) * 100}%`,
        width: `${(crop.naturalWidth / crop.width) * 100}%`,
        height: `${(crop.naturalHeight / crop.height) * 100}%`,
      }
    : { left: 0, top: 0, width: "100%", height: "100%" };

  return (
    <div
      className={fit === "height" ? "relative h-full w-auto" : "relative w-full"}
      style={frameStyle}
    >
      <div className="absolute" style={innerStyle}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          unoptimized={image.unoptimized}
          sizes={sizes}
          className={["object-contain", className].filter(Boolean).join(" ")}
          style={style}
        />
      </div>
    </div>
  );
}
