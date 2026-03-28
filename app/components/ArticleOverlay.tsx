import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import type { Project } from "../data/projects";

interface ArticleOverlayProps {
  project: Project | null;
  onClose: () => void;
}

export function ArticleOverlay({ project, onClose }: ArticleOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
      scrollRef.current?.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  return (
    <Dialog.Root
      open={!!project}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Content
          className="article-overlay"
          aria-describedby={undefined}
        >
          <VisuallyHidden.Root asChild>
            <Dialog.Title>{project?.title ?? ""}</Dialog.Title>
          </VisuallyHidden.Root>

          <div
            ref={scrollRef}
            className="article-overlay-scroll"
            onClick={(e) => {
              if (!(e.target as HTMLElement).closest(".article-overlay-panel")) {
                onClose();
              }
            }}
          >
            <div className="article-overlay-panel">
              <img
                className="article-overlay-img"
                src={project?.image}
                alt={project?.alt ?? ""}
              />
              <div className="article-overlay-body">
                <h1 className="article-overlay-title">{project?.title}</h1>
                <div className="project-tags">
                  {project?.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                {project?.article?.map((section, i) => (
                  <div key={i}>
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Dialog.Close asChild>
            <button className="close-btn" aria-label="Close article">
              &#10005;
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
