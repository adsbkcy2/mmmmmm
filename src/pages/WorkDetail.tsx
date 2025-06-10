
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Calendar, MapPin, User } from 'lucide-react';
import { useProjectsData } from '@/hooks/useProjectsData';

const WorkDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProjectById, loading, error } = useProjectsData();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (id && !loading) {
      const foundProject = getProjectById(id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        // إذا لم يتم العثور على المشروع، استخدم بيانات وهمية
        setProject({
          id: id,
          title: 'غرفة معيشة عصرية فاخرة',
          category: 'غرف المعيشة',
          client: 'أحمد محمد',
          location: 'القاهرة الجديدة',
          date: 'مارس 2024',
          duration: '6 أسابيع',
          area: '150 متر مربع',
          mainImage: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
          gallery: [
            'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=800',
            'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
          ],
          description: 'مشروع تصميم غرفة معيشة عصرية وفاخرة يجمع بين الأناقة والراحة. تم استخدام مواد عالية الجودة وألوان هادئة تبعث على الاسترخاء والدفء.',
          challenge: 'التحدي الأساسي في هذا المشروع كان في تحقيق التوازن بين الأناقة العصرية والدفء العائلي، مع الاستفادة القصوى من المساحة المتاحة وتوفير الإضاءة الطبيعية المناسبة.',
          solution: 'تم حل هذا التحدي من خلال استخدام تصميم مفتوح يربط بين المناطق المختلفة، مع اختيار قطع أثاث متعددة الوظائف وألوان محايدة تعكس الضوء وتضفي شعوراً بالرحابة.',
          materials: ['خشب البلوط الطبيعي', 'رخام كرارا الإيطالي', 'أقمشة مخملية فاخرة', 'إضاءة LED ذكية'],
          features: ['نظام إضاءة ذكي', 'أتمتة منزلية', 'نظام صوتي مدمج', 'مواد صديقة للبيئة']
        });
      }
    }
  }, [id, loading, getProjectById]);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate('/works');
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-cairo">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-luxury-600 mx-auto"></div>
            <p className="mt-4 text-xl text-gray-600">جاري تحميل تفاصيل المشروع...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white font-cairo">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-xl text-red-600">عذراً، لم يتم العثور على المشروع المطلوب</p>
            <button 
              onClick={handleBack}
              className="mt-4 bg-luxury-600 text-white px-6 py-2 rounded-lg hover:bg-luxury-700"
            >
              العودة إلى الأعمال
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
      
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={handleBack}
          className="flex items-center space-x-2 space-x-reverse text-luxury-600 hover:text-luxury-700 font-medium transition-colors"
        >
          <ArrowRight className="h-5 w-5" />
          <span>العودة إلى الأعمال</span>
        </button>
      </div>

      {/* Main Image */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-xl">
            <img 
              src={project.mainImage}
              alt={project.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="inline-block px-4 py-2 bg-luxury-600 text-sm font-semibold rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{project.title}</h1>
              <p className="text-xl text-gray-200">{project.location} • {project.date}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">وصف المشروع</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              {/* Challenge & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">التحدي</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.challenge}
                  </p>
                </div>
                <div className="bg-luxury-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">الحل</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Materials & Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">المواد المستخدمة</h3>
                  <ul className="space-y-2">
                    {project.materials?.map((material: string, index: number) => (
                      <li key={index} className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-2 h-2 bg-luxury-600 rounded-full"></div>
                        <span className="text-gray-600">{material}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">المميزات الخاصة</h3>
                  <ul className="space-y-2">
                    {project.features?.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-2 h-2 bg-luxury-600 rounded-full"></div>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Gallery */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">صور إضافية</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery?.map((image: string, index: number) => (
                    <div key={index} className="relative overflow-hidden rounded-lg group cursor-pointer">
                      <img 
                        src={image}
                        alt={`${project.title} - صورة ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Project Info */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6">معلومات المشروع</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <User className="h-5 w-5 text-luxury-600" />
                    <div>
                      <div className="text-sm text-gray-500">العميل</div>
                      <div className="font-semibold text-gray-900">{project.client}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <MapPin className="h-5 w-5 text-luxury-600" />
                    <div>
                      <div className="text-sm text-gray-500">الموقع</div>
                      <div className="font-semibold text-gray-900">{project.location}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Calendar className="h-5 w-5 text-luxury-600" />
                    <div>
                      <div className="text-sm text-gray-500">تاريخ الإنجاز</div>
                      <div className="font-semibold text-gray-900">{project.date}</div>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="text-sm text-gray-500 mb-1">مدة التنفيذ</div>
                    <div className="font-semibold text-gray-900">{project.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 mb-1">المساحة</div>
                    <div className="font-semibold text-gray-900">{project.area}</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-luxury-600 p-6 rounded-lg text-white text-center">
                <h3 className="text-xl font-bold mb-4">مشروع مشابه؟</h3>
                <p className="text-luxury-100 mb-6">
                  تواصل معنا لنناقش مشروعك ونحوله إلى واقع مذهل
                </p>
                <Link 
                  to="/contact" 
                  onClick={handleNavClick}
                  className="bg-white text-luxury-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center space-x-2 space-x-reverse"
                >
                  <span>تواصل معنا</span>
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WorkDetail;
