import { useState, useEffect } from 'react';

export const useCMSData = <T>(filePath: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Ensure we are fetching from the public/data directory where built assets reside
        const response = await fetch(`/data/${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${filePath}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        console.error('Error loading CMS data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [filePath]);

  return { data, loading, error };
};

export const useMarkdownFiles = (jsonFileName: string) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        // Fetch the generated JSON file from public/data directory
        const response = await fetch(`/data/${jsonFileName}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${jsonFileName}`);
        }
        const jsonData = await response.json();
        setFiles(jsonData);
      } catch (err) {
        console.error('Error loading markdown files from JSON:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setFiles([]);
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [jsonFileName]);

  return { files, loading, error };
};

