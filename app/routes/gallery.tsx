import { useState } from "react";
import { Hero } from "../components/Hero";
import { Lightbox } from "../components/Lightbox";
import { galleryPhotos } from "../data/gallery";

function GalleryImage({
  src,
  caption,
  orientation,
  onClick,
}: {
  src: string;
  caption: string;
  orientation: string;
  onClick: () => void;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="gallery-item" onClick={onClick}>
      <img
        src={src}
        className={`${orientation}${loaded ? " loaded" : ""}`}
        alt={caption}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <>
      <Hero
        title="Photography Gallery"
        subtitle="A collection of miscellaneous photos"
      />

      <section className="gallery">
        {galleryPhotos.map((photo, i) => (
          <GalleryImage
            key={photo.src}
            src={photo.src}
            caption={photo.caption}
            orientation={photo.orientation}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </section>

      <Lightbox
        images={galleryPhotos}
        open={lightboxIndex !== null}
        currentIndex={lightboxIndex ?? 0}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
