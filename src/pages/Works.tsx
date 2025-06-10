
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, Filter } from 'lucide-react';
import { useProjectsData } from '@/hooks/useProjectsData';

const Works = () => {
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [isVisible, setIsVisible] = useState(false);
  const [displayedProjects, setDisplayedProjects] = useState(6);
  const [isLoading, setIsLoading] = useState(false);

  const { projects, loading, error, getProjectsByCategory } = useProjectsData();

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  const categories = ['الكل', 'غرف المعيشة', 'المطابخ', 'غرف النوم', 'المكاتب', 'الحمامات'];

  const filteredProjects = getProjectsByCategory(selectedCategory);
  const visibleProjects = filteredProjects.slice(0, displayedProjects);
  const hasMoreProjects = displayedProjects < filteredProjects.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setDisplayedProjects(prev => prev + 6);
      setIsLoading(false);
    }, 500);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setDisplayedProjects(6);
  };

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-cairo">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-luxury-600 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600">جاري تحميل المشاريع...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white font-cairo">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-xl text-red-600">حدث خطأ في تحميل المشاريع</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-luxury-600 text-white px-6 py-2 rounded-lg hover:bg-luxury-700"
            >
              إعادة المحاولة
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-cairo">
      <Header />
      
      {/* Hero Section */}
      <section className={`relative h-96 flex items-center justify-center overflow-hidden ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
            alt="أعمالنا"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">أعمالنا</h1>
          <p className="text-xl text-gray-200">
            اكتشف مجموعة من أفضل مشاريعنا المتميزة ({projects.length} مشروع)
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-4">
              <Filter className="h-5 w-5 text-luxury-600" />
              <span className="text-lg font-semibold text-gray-700">فلترة حسب الفئة:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-luxury-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-luxury-50 hover:text-luxury-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/works/${project.id}`}
                onClick={handleNavClick}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:transform group-hover:scale-105">
                  <img 
                    src={project.mainImage}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="inline-block px-3 py-1 bg-luxury-600 text-xs font-semibold rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-luxury-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-200 mb-3">
                      {project.description}
                    </p>
                    <div className="flex items-center space-x-2 space-x-reverse text-luxury-300 group-hover:text-white transition-colors">
                      <span>عرض التفاصيل</span>
                      <ArrowLeft className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="bg-luxury-600 hover:bg-luxury-700 disabled:opacity-50 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center space-x-2 space-x-reverse"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>جاري التحميل...</span>
                  </>
                ) : (
                  <>
                    <span>تحميل المزيد من الأعمال</span>
                    <ArrowLeft className="h-5 w-5" />
                  </>
                )}
              </button>
              <p className="mt-4 text-gray-600">
                عرض {visibleProjects.length} من {filteredProjects.length} مشروع
              </p>
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl text-gray-500">لا توجد مشاريع في هذه الفئة حالياً</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            هل تريد مشروعاً مشابهاً؟
          </h2>
          <p className="text-xl text-luxury-100 mb-8">
            تواصل معنا لنناقش مشروعك ونحوله إلى واقع مذهل
          </p>
          <Link 
            to="/contact" 
            onClick={handleNavClick}
            className="bg-white text-luxury-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center space-x-2 space-x-reverse"
          >
            <span>ابدأ مشروعك الآن</span>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Works;
