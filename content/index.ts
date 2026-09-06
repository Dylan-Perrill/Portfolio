import { projects } from "./projects";
import type { Project } from "./types";

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectSlugs = projects.map((p) => p.slug);
