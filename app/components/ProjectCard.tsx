import { useState } from "react";
import { ImageCarousel } from "./ImageCarousel";
import type { Project, PhotoEntry } from "../data/projects";

function GooglePhotosIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 192 192"
      aria-hidden="true"
    >
      <path d="M96 16a32 32 0 0 1 32 32H64A32 32 0 0 1 96 16z" fill="#4285F4" />
      <path d="M160 96a32 32 0 0 1-32 32V64a32 32 0 0 1 32 32z" fill="#EA4335" />
      <path d="M96 176a32 32 0 0 1-32-32h64a32 32 0 0 1-32 32z" fill="#FBBC05" />
      <path d="M32 96a32 32 0 0 1 32-32v64A32 32 0 0 1 32 96z" fill="#34A853" />
    </svg>
  );
}

function PhotoCarousel({
  photos,
  alt,
}: {
  photos: PhotoEntry[];
  alt: string;
}) {
  const [current, setCurrent] = useState(0);
  const photo = photos[current];

  const goTo = (n: number) =>
    setCurrent((n + photos.length) % photos.length);

  return (
    <>
      <div className="project-img-wrap">
        <img src={photo.src} alt={alt} />
        {photos.length > 1 && (
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
              {photos.map((_, i) => (
                <span
                  key={i}
                  className={`img-dot${i === current ? " active" : ""}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="photo-img-bar">
        <span>{photo.caption}</span>
        {photo.link && (
          <a
            className="photo-img-bar-link"
            href={photo.link}
            aria-label="View on Google Photos"
            onClick={(e) => e.stopPropagation()}
          >
            <GooglePhotosIcon />
          </a>
        )}
      </div>
    </>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick?: () => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const hasArticle = !!project.article;
  const images = project.images ?? [project.image];

  return (
    <div
      className={`project-card${project.featured ? " featured" : ""}`}
      {...(hasArticle ? { "data-article": "" } : {})}
      style={{ animationDelay: `${index * 80}ms` }}
      onClick={hasArticle ? onClick : undefined}
    >
      {project.photos ? (
        <PhotoCarousel photos={project.photos} alt={project.alt} />
      ) : (
        <ImageCarousel images={images} alt={project.alt} />
      )}

      <div className="project-body">
        <h3>{project.title}</h3>
        {hasArticle && <span className="card-chevron" />}
        <p>{project.description}</p>
      </div>

      <div className="project-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
