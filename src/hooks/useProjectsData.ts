import { useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  location: string;
  date: string;
  duration: string;
  area: string;
  mainImage: string;
  gallery: string[];
  description: string;
  challenge: string;
  solution: string;
  materials: string[];
  features: string[];
  featured: boolean;
  published: boolean;
  slug: string;
}

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        // Fetch the generated projects.json file from public directory
        const response = await fetch('/data/projects.json');
        if (!response.ok) {
          throw new Error(`Failed to load projects.json`);
        }
        const jsonData: Project[] = await response.json();
        
        // Process the data to ensure arrays are properly handled
        const processedProjects = jsonData.map(project => ({
          ...project,
          gallery: Array.isArray(project.gallery) ? project.gallery : [project.mainImage || ''],
          materials: Array.isArray(project.materials) ? project.materials : [],
          features: Array.isArray(project.features) ? project.features : [],
          id: project.slug || project.id || '',
        }));
        
        setProjects(processedProjects);
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
        // Fallback to empty array instead of default data
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  const getFeaturedProjects = () => {
    return projects.filter(project => project.featured && project.published);
  };

  const getPublishedProjects = () => {
    return projects.filter(project => project.published);
  };

  const getProjectsByCategory = (category: string) => {
    if (category === 'الكل') {
      return getPublishedProjects();
    }
    return projects.filter(project => project.category === category && project.published);
  };

  const getProjectById = (id: string) => {
    return projects.find(project => project.id === id || project.slug === id);
  };

  return {
    projects: getPublishedProjects(),
    featuredProjects: getFeaturedProjects(),
    loading,
    error,
    getProjectsByCategory,
    getProjectById
  };
};

