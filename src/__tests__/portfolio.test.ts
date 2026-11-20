import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import {
  HOMEPAGE_SLUGS,
  getHomepageProjects,
  projects,
} from "@/content/projects";
import { laurierCourses } from "@/data/courses";
import { experiences } from "@/data/portfolio";
import { siteConfig } from "@/lib/site";

describe("portfolio data and metadata integrity", () => {
  it("generates a sitemap with zero double slashes and all project routes", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(entries.length).toBe(projects.length + 2);
    expect(urls).toContain(new URL("/", siteConfig.url).toString());
    expect(urls).toContain(new URL("/projects", siteConfig.url).toString());

    for (const entry of entries) {
      const parsed = new URL(entry.url);
      expect(parsed.protocol).toBe("https:");
      expect(parsed.pathname).not.toContain("//");
      expect(entry.url.replace(/^https?:\/\//, "")).not.toContain("//");
    }

    for (const project of projects) {
      expect(urls).toContain(
        new URL(`/projects/${project.slug}`, siteConfig.url).toString(),
      );
    }
  });

  it("points robots.txt to a valid sitemap URL without double slashes", () => {
    const config = robots();
    expect(typeof config.sitemap).toBe("string");
    const sitemapUrl = config.sitemap as string;
    expect(new URL(sitemapUrl).pathname).toBe("/sitemap.xml");
    expect(sitemapUrl.replace(/^https?:\/\//, "")).not.toContain("//");
  });

  it("resolves every HOMEPAGE_SLUGS entry in getHomepageProjects()", () => {
    const homepageProjects = getHomepageProjects();
    expect(homepageProjects).toHaveLength(HOMEPAGE_SLUGS.length);
    expect(homepageProjects.map((project) => project.slug)).toEqual([
      ...HOMEPAGE_SLUGS,
    ]);
  });

  it("ensures all project slugs are unique", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("ensures every local project image exists on disk and is non-empty", () => {
    const projectsWithImages = projects.filter((project) => project.image);
    expect(projectsWithImages.length).toBeGreaterThan(0);

    for (const project of projectsWithImages) {
      const relative = project.image!.replace(/^\//, "");
      const filePath = path.join(process.cwd(), "public", relative);
      expect(fs.existsSync(filePath), `Missing image ${filePath}`).toBe(true);
      expect(fs.statSync(filePath).size).toBeGreaterThan(10_000);
    }
  });

  it("records Trillium Health Partners with completed dates (no stale Present)", () => {
    const thp = experiences.find((entry) =>
      entry.company.toLowerCase().includes("trillium health partners"),
    );

    expect(thp).toBeDefined();
    expect(thp?.period).not.toMatch(/present/i);
  });

  it("validates all Laurier coursework links as HTTPS URLs", () => {
    const courseEntries = Object.values(laurierCourses);
    expect(courseEntries.length).toBeGreaterThan(0);

    for (const course of courseEntries) {
      for (const rawUrl of [course.bohrUrl, course.calendarUrl]) {
        const parsed = new URL(rawUrl);
        expect(parsed.protocol).toBe("https:");
        expect(parsed.hostname.length).toBeGreaterThan(0);
      }
    }
  });
});
