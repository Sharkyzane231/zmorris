import { useState } from "react";
import { Hero } from "../components/Hero";
import { ProjectCard } from "../components/ProjectCard";
import { ArticleOverlay } from "../components/ArticleOverlay";
import { projects, type Project } from "../data/projects";

export function meta() {
  return [{ title: "Projects — Zane Morris" }];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Hero title="Projects" subtitle="A selection of my work" />

      <section className="projects-grid">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            onClick={
              project.article
                ? () => setSelectedProject(project)
                : undefined
            }
          />
        ))}
      </section>

      <ArticleOverlay
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
