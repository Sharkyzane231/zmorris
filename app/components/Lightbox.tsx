import { useState, useRef, useCallback, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import type { GalleryPhoto } from "../data/gallery";

interface NavStyles {
  zoneWidth: number;
  arrowPos: number;
  captionWidth: number;
}

interface LightboxProps {
  images: GalleryPhoto[];
  open: boolean;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  open,
  currentIndex,
  onClose,
  onNavigate,
}: LightboxProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const leftArrowRef = useRef<HTMLSpanElement>(null);
  const [leftHover, setLeftHover] = useState(false);
  const [rightHover, setRightHover] = useState(false);
  const [imgReady, setImgReady] = useState(true);
  const [navStyles, setNavStyles] = useState<NavStyles>({
    zoneWidth: 120,
    arrowPos: 30,
    captionWidth: 300,
  });

  const updateNavZones = useCallback(() => {
    const img = imgRef.current;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const gap = rect.left;
    const preferred = window.innerWidth <= 700 ? 60 : 120;
    const zoneWidth = Math.min(preferred, gap);
    const arrowFixed = 30;
    const arrowW = leftArrowRef.current?.offsetWidth ?? 24;
    const centered = gap / 2 - arrowW / 2;
    const arrowPos = Math.min(arrowFixed, centered);
    setNavStyles({ zoneWidth, arrowPos, captionWidth: rect.width * 0.85 });
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("resize", updateNavZones);
    return () => window.removeEventListener("resize", updateNavZones);
  }, [open, updateNavZones]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(updateNavZones);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, updateNavZones]);

  const navigate = useCallback(
    (newIndex: number) => {
      setImgReady(false);
      setTimeout(() => {
        onNavigate(newIndex);
      }, 80);
    },
    [onNavigate]
  );

  const next = useCallback(
    () => navigate((currentIndex + 1) % images.length),
    [currentIndex, images.length, navigate]
  );

  const prev = useCallback(
    () => navigate((currentIndex - 1 + images.length) % images.length),
    [currentIndex, images.length, navigate]
  );

  const handleImgLoad = useCallback(() => {
    setImgReady(true);
    updateNavZones();
  }, [updateNavZones]);

  const photo = images[currentIndex];
  if (!photo) return null;

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Content
          className="lightbox"
          aria-describedby={undefined}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") next();
            if (e.key === "ArrowLeft") prev();
          }}
          onClick={(e) => {
            const target = e.target as HTMLElement;
            if (
              target.classList.contains("nav-zone") ||
              target.classList.contains("nav") ||
              target.tagName === "IMG" ||
              target.id === "caption" ||
              target.closest(".close-btn")
            )
              return;
            onClose();
          }}
        >
          <VisuallyHidden.Root asChild>
            <Dialog.Title>Photo viewer</Dialog.Title>
          </VisuallyHidden.Root>

          <div
            className="nav-zone left-zone"
            style={{ width: navStyles.zoneWidth }}
            onClick={prev}
            onMouseEnter={() => setLeftHover(true)}
            onMouseLeave={() => setLeftHover(false)}
          />
          <span
            ref={leftArrowRef}
            className={`nav left${leftHover ? " nav-hover" : ""}`}
            style={
              { "--arrow-pos": `${navStyles.arrowPos}px` } as React.CSSProperties
            }
            onClick={prev}
          >
            &#8249;
          </span>

          <div className="lightbox-img-wrap">
            <img
              ref={imgRef}
              src={photo.src}
              alt={photo.caption}
              style={{ opacity: imgReady ? 1 : 0 }}
              onLoad={handleImgLoad}
            />
            <div id="caption" style={{ width: navStyles.captionWidth }}>
              {photo.caption}
            </div>
          </div>

          <span
            className={`nav right${rightHover ? " nav-hover" : ""}`}
            style={
              { "--arrow-pos": `${navStyles.arrowPos}px` } as React.CSSProperties
            }
            onClick={next}
          >
            &#8250;
          </span>
          <div
            className="nav-zone right-zone"
            style={{ width: navStyles.zoneWidth }}
            onClick={next}
            onMouseEnter={() => setRightHover(true)}
            onMouseLeave={() => setRightHover(false)}
          />

          <Dialog.Close asChild>
            <button className="close-btn" aria-label="Close lightbox">
              &#10005;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
