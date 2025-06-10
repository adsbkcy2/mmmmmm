const fs = require('fs');
const path = require('path');

// دالة لقراءة ملفات Markdown وتحويلها إلى JSON
function processMarkdownFiles(dirPath, outputPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`المجلد غير موجود: ${dirPath}`);
    return;
  }

  const files = fs.readdirSync(dirPath);
  const markdownFiles = files.filter(file => file.endsWith('.md'));
  
  const processedData = markdownFiles.map(file => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // فصل front matter عن المحتوى
    const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    if (frontMatterMatch) {
      const frontMatter = frontMatterMatch[1];
      const body = frontMatterMatch[2];
      
      // تحويل front matter إلى object
      const data = {};
      const lines = frontMatter.split('\n');
      let currentKey = '';
      let inArray = false;
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;
        
        if (trimmedLine.endsWith(':')) {
          currentKey = trimmedLine.slice(0, -1);
          if (currentKey === 'gallery' || currentKey === 'materials' || currentKey === 'features' || currentKey === 'tags' || currentKey === 'images') {
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
      
      // إضافة المحتوى
      data.body = body.trim();
      data.slug = path.basename(file, '.md');
      
      return data;
    }
    
    return null;
  }).filter(item => item !== null);
  
  // كتابة البيانات المعالجة إلى ملف JSON
  if (processedData.length > 0) {
    fs.writeFileSync(outputPath, JSON.stringify(processedData, null, 2), 'utf8');
    console.log(`تم معالجة ${processedData.length} ملف من ${dirPath} وحفظها في ${outputPath}`);
  }
}

// دالة لنسخ ملفات JSON إلى مجلد public
function copyJSONToPublic(sourceDir, publicDir) {
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const jsonFiles = fs.readdirSync(sourceDir).filter(file => file.endsWith('.json'));
  
  jsonFiles.forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const destPath = path.join(publicDir, file);
    fs.copyFileSync(sourcePath, destPath);
    console.log(`تم نسخ ${file} إلى ${publicDir}`);
  });
}

// التأكد من وجود مجلد البيانات
const dataDir = path.join(__dirname, '../src/data');
const publicDataDir = path.join(__dirname, '../public/data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// إنشاء مجلدات فرعية
const subDirs = ['team', 'projects', 'testimonials', 'blog', 'gallery'];
subDirs.forEach(dir => {
  const fullPath = path.join(dataDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// معالجة ملفات Markdown في كل مجلد
const markdownDirs = [
  { source: path.join(dataDir, 'projects'), output: path.join(dataDir, 'projects.json') },
  { source: path.join(dataDir, 'team'), output: path.join(dataDir, 'team.json') },
  { source: path.join(dataDir, 'testimonials'), output: path.join(dataDir, 'testimonials.json') },
  { source: path.join(dataDir, 'blog'), output: path.join(dataDir, 'blog.json') },
  { source: path.join(dataDir, 'gallery'), output: path.join(dataDir, 'gallery.json') }
];

markdownDirs.forEach(({ source, output }) => {
  processMarkdownFiles(source, output);
});

// نسخ ملفات JSON إلى مجلد public
copyJSONToPublic(dataDir, publicDataDir);

// إنشاء ملف فهرس شامل
const indexData = {
  lastUpdated: new Date().toISOString(),
  collections: {}
};

// قراءة جميع ملفات JSON المُنشأة
markdownDirs.forEach(({ output }) => {
  const collectionName = path.basename(output, '.json');
  if (fs.existsSync(output)) {
    try {
      const data = JSON.parse(fs.readFileSync(output, 'utf8'));
      indexData.collections[collectionName] = {
        count: data.length,
        lastModified: fs.statSync(output).mtime.toISOString()
      };
    } catch (e) {
      console.error(`خطأ في قراءة ${output}:`, e.message);
    }
  }
});

// حفظ ملف الفهرس
fs.writeFileSync(
  path.join(dataDir, 'index.json'),
  JSON.stringify(indexData, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(publicDataDir, 'index.json'),
  JSON.stringify(indexData, null, 2),
  'utf8'
);

console.log('تم إنشاء وتحديث جميع ملفات البيانات بنجاح!');
console.log('الملفات المُنشأة:');
console.log('- projects.json');
console.log('- team.json');
console.log('- testimonials.json');
console.log('- blog.json');
console.log('- gallery.json');
console.log('- index.json');

// إنشاء ملف sitemap.json للمساعدة في SEO
const sitemapData = {
  pages: [
    { url: '/', priority: 1.0, changefreq: 'weekly' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/works', priority: 0.9, changefreq: 'weekly' },
    { url: '/contact', priority: 0.7, changefreq: 'monthly' }
  ],
  lastGenerated: new Date().toISOString()
};

// إضافة صفحات المشاريع
if (fs.existsSync(path.join(dataDir, 'projects.json'))) {
  try {
    const projects = JSON.parse(fs.readFileSync(path.join(dataDir, 'projects.json'), 'utf8'));
    projects.forEach(project => {
      if (project.published) {
        sitemapData.pages.push({
          url: `/work/${project.slug}`,
          priority: 0.6,
          changefreq: 'monthly'
        });
      }
    });
  } catch (e) {
    console.error('خطأ في معالجة المشاريع للـ sitemap:', e.message);
  }
}

// إضافة صفحات المدونة
if (fs.existsSync(path.join(dataDir, 'blog.json'))) {
  try {
    const blogPosts = JSON.parse(fs.readFileSync(path.join(dataDir, 'blog.json'), 'utf8'));
    blogPosts.forEach(post => {
      if (post.published) {
        sitemapData.pages.push({
          url: `/blog/${post.slug}`,
          priority: 0.5,
          changefreq: 'monthly'
        });
      }
    });
  } catch (e) {
    console.error('خطأ في معالجة المدونة للـ sitemap:', e.message);
  }
}

fs.writeFileSync(
  path.join(dataDir, 'sitemap.json'),
  JSON.stringify(sitemapData, null, 2),
  'utf8'
);

fs.writeFileSync(
  path.join(publicDataDir, 'sitemap.json'),
  JSON.stringify(sitemapData, null, 2),
  'utf8'
);

console.log('تم إنشاء sitemap.json بنجاح!');

