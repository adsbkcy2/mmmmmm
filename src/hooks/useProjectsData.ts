
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
}

// قائمة ملفات المشاريع المتاحة
const PROJECT_FILES = [
  'غرفة-معيشة-عصرية-فاخرة',
  'مطبخ-عصري-فاخر',
  'غرفة-نوم-هادئة',
  'مكتب-شركة-محاماة',
  'حمام-سبا-فاخر',
  'مشروع-سكني-فاخر'
];

const parseMarkdownFrontmatter = (content: string) => {
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!frontmatterMatch) return null;

  const frontmatter = frontmatterMatch[1];
  const data: any = {};
  
  const lines = frontmatter.split('\n');
  let currentKey = '';
  let inArray = false;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    if (trimmedLine.endsWith(':')) {
      currentKey = trimmedLine.slice(0, -1);
      if (currentKey === 'gallery' || currentKey === 'materials' || currentKey === 'features') {
        data[currentKey] = [];
        inArray = true;
      } else {
        inArray = false;
      }
    } else if (trimmedLine.startsWith('- ')) {
      if (inArray && currentKey) {
        const value = trimmedLine.slice(2).replace(/^["']|["']$/g, '');
        data[currentKey].push(value);
      }
    } else if (trimmedLine.includes(': ')) {
      const [key, ...valueParts] = trimmedLine.split(': ');
      let value = valueParts.join(': ').replace(/^["']|["']$/g, '');
      
      if (value === 'true') value = true;
      if (value === 'false') value = false;
      
      data[key] = value;
      currentKey = key;
      inArray = false;
    }
  }
  
  return data;
};

export const useProjectsData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const loadedProjects: Project[] = [];

        // محاولة تحميل المشاريع الفعلية من ملفات .md
        for (const fileName of PROJECT_FILES) {
          try {
            const response = await fetch(`/src/data/projects/${fileName}.md`);
            if (response.ok) {
              const content = await response.text();
              const parsedData = parseMarkdownFrontmatter(content);
              
              if (parsedData && parsedData.published) {
                const project: Project = {
                  id: fileName,
                  title: parsedData.title || '',
                  category: parsedData.category || '',
                  client: parsedData.client || '',
                  location: parsedData.location || '',
                  date: parsedData.date || '',
                  duration: parsedData.duration || '',
                  area: parsedData.area || '',
                  mainImage: parsedData.mainImage || '',
                  gallery: Array.isArray(parsedData.gallery) ? parsedData.gallery : [parsedData.mainImage || ''],
                  description: parsedData.description || '',
                  challenge: parsedData.challenge || '',
                  solution: parsedData.solution || '',
                  materials: Array.isArray(parsedData.materials) ? parsedData.materials : [],
                  features: Array.isArray(parsedData.features) ? parsedData.features : [],
                  featured: parsedData.featured === true,
                  published: parsedData.published === true
                };
                
                loadedProjects.push(project);
              }
            }
          } catch (fileError) {
            console.log(`Could not load project file: ${fileName}`, fileError);
          }
        }

        // إذا لم يتم تحميل أي مشاريع، استخدم البيانات الافتراضية
        if (loadedProjects.length === 0) {
          console.log('No projects loaded from files, using default data');
          const defaultProjects: Project[] = [
            {
              id: '1',
              title: 'غرفة معيشة عصرية فاخرة',
              category: 'غرف المعيشة',
              client: 'عائلة أحمد',
              location: 'الرياض',
              date: '2024-01-15',
              duration: '3 أشهر',
              area: '80 متر مربع',
              mainImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
              gallery: [
                'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
                'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800'
              ],
              description: 'تصميم عصري يجمع بين الأناقة والراحة',
              challenge: 'تحدي المساحة المفتوحة',
              solution: 'حلول تصميمية مبتكرة',
              materials: ['رخام طبيعي', 'خشب الجوز'],
              features: ['إضاءة ذكية', 'نظام صوتي'],
              featured: true,
              published: true
            },
            {
              id: '2',
              title: 'مطبخ حديث بتصميم مفتوح',
              category: 'المطابخ',
              client: 'عائلة سالم',
              location: 'جدة',
              date: '2024-02-20',
              duration: '6 أسابيع',
              area: '40 متر مربع',
              mainImage: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800',
              gallery: [
                'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
              ],
              description: 'مطبخ عملي وأنيق مع تقنيات حديثة',
              challenge: 'تحسين المساحة',
              solution: 'تصميم ذكي',
              materials: ['رخام كرارا'],
              features: ['جزيرة مطبخ'],
              featured: false,
              published: true
            },
            {
              id: '3',
              title: 'مكتب تنفيذي راقي',
              category: 'المكاتب',
              client: 'شركة النجاح',
              location: 'الدمام',
              date: '2024-03-05',
              duration: '8 أسابيع',
              area: '120 متر مربع',
              mainImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
              gallery: [
                'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800'
              ],
              description: 'مساحة عمل محفزة وأنيقة للمديرين',
              challenge: 'بيئة عمل احترافية',
              solution: 'تصميم كلاسيكي معاصر',
              materials: ['خشب الماهوجني'],
              features: ['غرف اجتماعات'],
              featured: true,
              published: true
            },
            {
              id: '4',
              title: 'غرفة نوم رومانسية',
              category: 'غرف النوم',
              client: 'عائلة الزهراني',
              location: 'مكة',
              date: '2024-01-10',
              duration: '4 أسابيع',
              area: '35 متر مربع',
              mainImage: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800',
              gallery: [
                'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=800'
              ],
              description: 'تصميم هادئ ومريح للاسترخاء',
              challenge: 'خلق أجواء رومانسية',
              solution: 'ألوان هادئة وإضاءة ناعمة',
              materials: ['خشب البلوط'],
              features: ['دولاب مدمج'],
              featured: false,
              published: true
            }
          ];
          
          setProjects(defaultProjects);
        } else {
          console.log(`Loaded ${loadedProjects.length} projects from files`);
          setProjects(loadedProjects);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
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
    return projects.find(project => project.id === id);
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
