export interface GalleryPhoto {
  src: string;
  caption: string;
  orientation: "portrait" | "landscape";
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: "/images/gallery/photo01.webp", caption: "Sky Tower - Nikon F2, Amber 800T", orientation: "portrait" },
  { src: "/images/gallery/photo03.webp", caption: "Tuff Crater Bench - Canon AE-1 Program, Ultramax 400", orientation: "portrait" },
  { src: "/images/gallery/photo02.webp", caption: "Sunset at Takapuna - Canon AE-1 Program, Ultramax 400", orientation: "landscape" },
  { src: "/images/gallery/photo09.webp", caption: "Victoria Street W - Nikon F2, Gold 200", orientation: "landscape" },
  { src: "/images/gallery/photo10.webp", caption: "Symonds Street - Canon AE-1 Program, Colourplus 200", orientation: "landscape" },
  { src: "/images/gallery/photo05.webp", caption: "Lorne Street - Nikon F2, Gold 100 @ ISO25", orientation: "landscape" },
  { src: "/images/gallery/photo06.webp", caption: "Whatever this plant is - Nikon F2AS, Gold 200", orientation: "landscape" },
  { src: "/images/gallery/photo04.webp", caption: "Omanawanui - Nikon F2AS, Portra 800", orientation: "portrait" },
  { src: "/images/gallery/photo07.webp", caption: "Pacifica - Nikon F2AS, Ilford HP5 Plus", orientation: "portrait" },
  { src: "/images/gallery/photo08.webp", caption: "Logging - Nikon F2, Portra 160", orientation: "portrait" },
  { src: "/images/gallery/photo11.webp", caption: "Wellesley Street W - Canon AE-1 Program, Colourplus 200", orientation: "portrait" },
  { src: "/images/gallery/photo12.webp", caption: "Gone Fishing - Nikon F2, Gold 200", orientation: "landscape" },
  { src: "/images/gallery/photo13.webp", caption: "Mezze - Nikon F2, Gold 200", orientation: "landscape" },
];
