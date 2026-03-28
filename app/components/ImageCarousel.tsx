import { useState } from "react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) return null;

  const goTo = (n: number) =>
    setCurrent((n + images.length) % images.length);

  return (
    <div className="project-img-wrap">
      <img src={images[current]} alt={alt} />
      {images.length > 1 && (
        <>
          <button
            className="img-nav img-prev"
            onClick={(e) => {
              e.stopPropagation();
              goTo(current - 1);
            }}
          >
            &#8249;
          </button>
          <button
            className="img-nav img-next"
            onClick={(e) => {
              e.stopPropagation();
              goTo(current + 1);
            }}
          >
            &#8250;
          </button>
          <div className="img-dots">
            {images.map((_, i) => (
              <span
                key={i}
                className={`img-dot${i === current ? " active" : ""}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
