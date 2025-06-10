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
      frontMatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > -1) {
          const key = line.substring(0, colonIndex).trim();
          let value = line.substring(colonIndex + 1).trim();
          
          // إزالة علامات الاقتباس
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
          }
          
          // معالجة القوائم
          if (value.startsWith('[') && value.endsWith(']')) {
            try {
              value = JSON.parse(value);
            } catch (e) {
              // إذا فشل التحويل، اتركه كما هو
            }
          }
          
          // معالجة القيم المنطقية
          if (value === 'true') value = true;
          if (value === 'false') value = false;
          
          data[key] = value;
        }
      });
      
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

// دالة لمعالجة ملفات YAML المعقدة
function parseComplexYaml(yamlString) {
  const lines = yamlString.split('\n');
  const result = {};
  let currentKey = null;
  let currentArray = null;
  let indentLevel = 0;
  
  for (let line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;
    
    const currentIndent = line.length - line.trimLeft().length;
    
    if (trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      const value = valueParts.join(':').trim();
      
      if (value === '') {
        // هذا مفتاح لكائن أو مصفوفة
        currentKey = key.trim();
        if (currentIndent === 0) {
          result[currentKey] = {};
        }
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // مصفوفة بسيطة
        try {
          result[key.trim()] = JSON.parse(value);
        } catch (e) {
          result[key.trim()] = value;
        }
      } else {
        // قيمة بسيطة
        let processedValue = value;
        if (value.startsWith('"') && value.endsWith('"')) {
          processedValue = value.slice(1, -1);
        }
        if (value === 'true') processedValue = true;
        if (value === 'false') processedValue = false;
        
        result[key.trim()] = processedValue;
      }
    } else if (trimmedLine.startsWith('-')) {
      // عنصر في مصفوفة
      const value = trimmedLine.substring(1).trim();
      if (!result[currentKey]) {
        result[currentKey] = [];
      }
      result[currentKey].push(value);
    }
  }
  
  return result;
}

// التأكد من وجود مجلد البيانات
const dataDir = path.join(__dirname, '../src/data');
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

console.log('تم إنشاء sitemap.json بنجاح!');

