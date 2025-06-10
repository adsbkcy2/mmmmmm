import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CounterAnimation from '@/components/CounterAnimation';
import HeroSlider from '@/components/HeroSlider';
import ScrollAnimation from '@/components/ScrollAnimation';
import { ArrowLeft, Star, Users, Award, Home } from 'lucide-react';
import { useProjectsData } from '@/hooks/useProjectsData';
import { useCMSData } from '@/hooks/useCMSData';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects, featuredProjects, loading } = useProjectsData();
  const { data: heroData } = useCMSData<any>('hero.json');
  const { data: aboutData } = useCMSData<any>('about-section.json');
  const { data: servicesData } = useCMSData<any>('services.json');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // استخدام البيانات من CMS مع fallback
  const displayProjects = featuredProjects.length > 0 ? featuredProjects.slice(0, 3) : [
    {
      id: 1,
      title: 'غرفة معيشة فاخرة',
      category: 'غرف المعيشة',
      mainImage: 'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'بلمسة عصرية'
    },
    {
      id: 2,
      title: 'مكتب مميز لرجل أعمال ناجح',
      category: 'المكاتب',
      mainImage: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'تصميم احترافي'
    },
    {
      id: 3,
      title: 'تصميم مطبخ حديث',
      category: 'المطابخ',
      mainImage: 'https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'عملي وأنيق'
    }
  ];

  const latestProjects = projects.length > 0 ? projects.slice(0, 3) : displayProjects;

  return (
    <div className="min-h-screen bg-white font-cairo">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 text-center text-white px-6 max-w-6xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {heroData?.title || 'تصميم داخلي معاصر'}
              <br />
              <span className="text-blue-400">
                {heroData?.subtitle || 'وأنيق'}
              </span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
              {heroData?.description || 'نحول مساحاتكم إلى تحفة فنية معاصرة تجمع بين الأناقة والوظائف العملية'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                onClick={handleNavClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <span>{heroData?.primaryButtonText || 'تواصل معنا'}</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <Link
                to="/works"
                onClick={handleNavClick}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                <span>{heroData?.secondaryButtonText || 'استكشف أعمالنا'}</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <ScrollAnimation>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {aboutData?.title || 'حول التصميم الداخلي'}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {aboutData?.description || 'نحن وكالة التصميم الداخلي الرائدة التي تتخصص في إنشاء مساحات استثنائية تجمع بين الجمال والوظائف العملية. فريقنا من المصممين المحترفين يعمل على تحويل رؤيتكم إلى واقع ملموس.'}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-gray-800">جائزة التميز</h3>
                    <p className="text-gray-600">أفضل تصميم 2024</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8" />
                    </div>
                    <h3 className="font-bold text-gray-800">عملاء راضون</h3>
                    <p className="text-gray-600">+500 عميل سعيد</p>
                  </div>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="تصميم داخلي"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">مشاريع مكتملة</h4>
                      <p className="text-blue-600 font-semibold">
                        <CounterAnimation end={150} duration={2000} />+
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Services Section */}
      <ScrollAnimation>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {servicesData?.title || 'خدماتنا المتميزة'}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {servicesData?.description || 'نقدم مجموعة شاملة من خدمات التصميم الداخلي لتلبية جميع احتياجاتكم'}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(servicesData?.services || [
                { name: 'تصميم غرف المعيشة', description: 'تصاميم عصرية ومريحة', icon: '🛋️' },
                { name: 'تصميم المطابخ', description: 'مطابخ عملية وأنيقة', icon: '🍳' },
                { name: 'تصميم غرف النوم', description: 'مساحات هادئة ومريحة', icon: '🛏️' },
                { name: 'تصميم المكاتب', description: 'بيئات عمل محفزة', icon: '💼' },
                { name: 'تصميم الحمامات', description: 'حمامات فاخرة وعملية', icon: '🚿' },
                { name: 'استشارات التصميم', description: 'نصائح من خبراء', icon: '💡' }
              ]).map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Featured Projects Section */}
      <ScrollAnimation>
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                مشاريعنا المميزة
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                اكتشف مجموعة من أحدث مشاريعنا التي تعكس إبداعنا وخبرتنا في التصميم الداخلي
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.mainImage || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800'}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <Link
                      to={`/work/${project.id}`}
                      onClick={handleNavClick}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                    >
                      <span>عرض التفاصيل</span>
                      <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                to="/works"
                onClick={handleNavClick}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                <span>عرض جميع المشاريع</span>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Stats Section */}
      <ScrollAnimation>
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <CounterAnimation end={150} duration={2000} />+
                </div>
                <p className="text-blue-100">مشروع مكتمل</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <CounterAnimation end={500} duration={2000} />+
                </div>
                <p className="text-blue-100">عميل سعيد</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <CounterAnimation end={15} duration={2000} />+
                </div>
                <p className="text-blue-100">سنة خبرة</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <CounterAnimation end={25} duration={2000} />+
                </div>
                <p className="text-blue-100">جائزة تميز</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>

      {/* Testimonials Section */}
      <ScrollAnimation>
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                آراء عملائنا
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                اكتشف ما يقوله عملاؤنا عن تجربتهم معنا
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'أحمد محمد',
                  role: 'مدير تنفيذي',
                  content: 'تجربة رائعة مع فريق محترف. تم تنفيذ المشروع بدقة عالية وفي الوقت المحدد.',
                  rating: 5
                },
                {
                  name: 'فاطمة السالم',
                  role: 'ربة منزل',
                  content: 'أحببت التصميم كثيراً. المنزل أصبح أكثر جمالاً وعملية من قبل.',
                  rating: 5
                },
                {
                  name: 'خالد العتيبي',
                  role: 'رجل أعمال',
                  content: 'خدمة ممتازة وأسعار معقولة. أنصح بالتعامل معهم بشدة.',
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="mr-4">
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollAnimation>

      <Footer />
    </div>
  );
};

export default Index;

