
import { useState, useEffect } from 'react';

export const useCMSData = <T>(filePath: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(filePath);
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

export const useMarkdownFiles = (folderPath: string) => {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFiles = async () => {
      try {
        setLoading(true);
        // محاولة تحميل الملفات من المجلد
        const fileNames = [
          'مشروع-سكني-فاخر.md',
          'ahmed-hassan.md', 
          'client-satisfaction.md'
        ];
        
        const loadedFiles = [];
        for (const fileName of fileNames) {
          try {
            const response = await fetch(`${folderPath}/${fileName}`);
            if (response.ok) {
              const content = await response.text();
              // استخراج frontmatter
              const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
              if (frontmatterMatch) {
                const frontmatter = frontmatterMatch[1];
                const yamlContent = frontmatter.split('\n').reduce((acc: any, line) => {
                  const [key, ...valueParts] = line.split(':');
                  if (key && valueParts.length > 0) {
                    const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
                    acc[key.trim()] = value;
                  }
                  return acc;
                }, {});
                loadedFiles.push({ ...yamlContent, id: fileName.replace('.md', '') });
              }
            }
          } catch (fileError) {
            console.error(`Error loading ${fileName}:`, fileError);
          }
        }
        setFiles(loadedFiles);
      } catch (err) {
        console.error('Error loading markdown files:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, [folderPath]);

  return { files, loading, error };
};
