import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CounterAnimation from '@/components/CounterAnimation';
import HeroSlider from '@/components/HeroSlider';
import ScrollAnimation from '@/components/ScrollAnimation';
import { ArrowLeft, Star, Users, Award, Home } from 'lucide-react';
import { useProjectsData } from '@/hooks/useProjectsData';

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { projects, featuredProjects, loading } = useProjectsData();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // استخدام البيانات الحقيقية مع fallback
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

  const latestProjects = projects.length > 0 ? projects.slice(0, 3) : [
    {
      id: 1,
      title: 'مطبخ عصري فاخر',
      description: 'تصميم مبتكر يجمع بين الجمال والوظائف العملية',
      mainImage: 'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 2,
      title: 'مساحة عمل عصرية',
      description: 'بيئة عمل محفزة ومريحة',
      mainImage: 'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 3,
      title: 'غرفة نوم حالمة',
      description: 'مساحة استرخاء مثالية',
      mainImage: 'https://images.pexels.com/photos/1571467/pexels-photo-1571467.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-cairo">
      <Header />
      
      {/* Hero Section */}
      <section className={`relative h-screen flex items-center justify-center overflow-hidden ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <HeroSlider />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <ScrollAnimation animation="fade-up" delay={500}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              تصميم داخلي معاصر
              <br />
              <span className="text-luxury-300">وأنيق</span>
            </h1>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-up" delay={800}>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              نحول مساحاتكم إلى تحفة فنية معاصرة تجمع بين الأناقة والوظائف العملية
            </p>
          </ScrollAnimation>
          
          <ScrollAnimation animation="fade-up" delay={1100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/works" 
                onClick={handleNavClick}
                className="bg-luxury-600 hover:bg-luxury-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>استكشف أعمالنا</span>
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link 
                to="/contact" 
                onClick={handleNavClick}
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105"
              >
                تواصل معنا
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slide-right">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  حول <span className="text-luxury-600">التصميم الداخلي</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  نحن وكالة التصميم الداخلي الرائدة التي تتخصص في إنشاء مساحات استثنائية تجمع بين الجمال والوظائف العملية. فريقنا من المصممين المحترفين يعمل على تحويل رؤيتكم إلى واقع ملموس.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <CounterAnimation end={projects.length || 150} suffix="+" className="text-3xl font-bold text-luxury-600" />
                    <p className="text-gray-600 mt-2">مشروع مكتمل</p>
                  </div>
                  <div className="text-center">
                    <CounterAnimation end={98} suffix="%" className="text-3xl font-bold text-luxury-600" />
                    <p className="text-gray-600 mt-2">رضا العملاء</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation animation="slide-left" delay={200}>
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="فريق التصميم"
                  className="rounded-lg w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-luxury-600 text-white p-6 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Award className="h-8 w-8" />
                    <div>
                      <div className="font-bold text-lg">جائزة التميز</div>
                      <div className="text-sm text-luxury-200">أفضل تصميم 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Transform Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                حول <span className="text-luxury-600">مساحتك</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                تصميم داخلي مبتكر لنمط حياة عصري وفاخر
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <ScrollAnimation 
                key={project.id} 
                animation="fade-up" 
                delay={index * 200}
              >
                <Link
                  to={`/works/${project.id}`}
                  onClick={handleNavClick}
                  className="group cursor-pointer block"
                >
                  <div className="relative overflow-hidden rounded-lg">
                    <img 
                      src={project.mainImage}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm">{project.description}</p>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation animation="fade-up" delay={600}>
            <div className="text-center mt-12">
              <Link 
                to="/works" 
                onClick={handleNavClick}
                className="inline-flex items-center space-x-2 space-x-reverse text-luxury-600 hover:text-luxury-700 font-semibold text-lg group"
              >
                <span>عرض جميع الأعمال ({projects.length})</span>
                <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                ما <span className="text-luxury-600">نقدمه</span>
              </h2>
              <p className="text-xl text-gray-600">خدمات التصميم الداخلي المتكاملة</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Home, title: 'التصميم الداخلي المخصص', desc: 'نقوم بتصميم مساحات داخلية فريدة تعكس شخصيتكم وتلبي احتياجاتكم الخاصة.' },
              { icon: Users, title: 'استشارات التصميم', desc: 'فريق من الخبراء يقدم استشارات متخصصة لمساعدتكم في اتخاذ القرارات المناسبة.' },
              { icon: Star, title: 'تنفيذ المشاريع', desc: 'إدارة وتنفيذ المشاريع من البداية حتى النهاية بأعلى معايير الجودة.' }
            ].map((service, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 200}>
                <div className="bg-white p-8 rounded-lg hover:transform hover:translateY-[-4px] transition-all duration-300">
                  <div className="w-16 h-16 bg-luxury-100 rounded-lg flex items-center justify-center mb-6">
                    <service.icon className="h-8 w-8 text-luxury-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                استكشف أحدث <span className="text-luxury-600">مشاريعنا</span>
              </h2>
              <p className="text-xl text-gray-600">حيث يلتقي الابتكار مع الفخامة</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollAnimation animation="slide-right">
              <Link
                to={`/works/${latestProjects[0].id}`}
                onClick={handleNavClick}
                className="group cursor-pointer block"
              >
                <div className="relative overflow-hidden rounded-lg">
                  <img 
                    src={latestProjects[0].mainImage}
                    alt={latestProjects[0].title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{latestProjects[0].title}</h3>
                    <p className="text-luxury-200 mb-3">{latestProjects[0].description}</p>
                    <div className="inline-flex items-center space-x-2 space-x-reverse text-white hover:text-luxury-300 transition-colors">
                      <span>عرض التفاصيل</span>
                      <ArrowLeft className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollAnimation>

            <div className="space-y-8">
              {latestProjects.slice(1).map((project, index) => (
                <ScrollAnimation key={project.id} animation="slide-left" delay={index * 200}>
                  <Link
                    to={`/works/${project.id}`}
                    onClick={handleNavClick}
                    className="group cursor-pointer block"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img 
                        src={project.mainImage}
                        alt={project.title}
                        className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-lg font-bold">{project.title}</h3>
                        <p className="text-sm text-luxury-200">{project.description}</p>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <ScrollAnimation animation="fade-up" delay={600}>
            <div className="text-center mt-12">
              <Link 
                to="/works" 
                onClick={handleNavClick}
                className="bg-luxury-600 hover:bg-luxury-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center space-x-2 space-x-reverse"
              >
                <span>عرض جميع المشاريع</span>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                ما يقوله <span className="text-luxury-600">عملاؤنا</span>
              </h2>
              <p className="text-xl text-gray-600">تجارب حقيقية من عملائنا الكرام</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'أحمد محمد', job: 'رجل أعمال', review: 'تجربة رائعة مع فريق محترف. لقد حولوا منزلي إلى قصر حقيقي يعكس ذوقي الرفيع.', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150' },
              { name: 'سارة أحمد', job: 'مهندسة', review: 'احترافية عالية وذوق رفيع في اختيار التفاصيل. النتيجة فاقت توقعاتي بكثير.', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150' },
              { name: 'خالد عبدالله', job: 'طبيب', review: 'خدمة متميزة وتنفيذ دقيق للتفاصيل. أنصح بهم بشدة لكل من يريد تصميماً استثنائياً.', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150' }
            ].map((testimonial, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 200}>
                <div className="bg-white p-8 rounded-lg hover:transform hover:translateY-[-4px] transition-all duration-300">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.review}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ml-4"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-gray-500 text-sm">{testimonial.job}</div>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-luxury-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <h2 className="text-4xl font-bold text-white mb-6">
              هل أنت مستعد لتحويل مساحتك؟
            </h2>
            <p className="text-xl text-luxury-100 mb-8 leading-relaxed">
              دعنا نساعدك في إنشاء مساحة أحلامك. تواصل معنا اليوم للحصول على استشارة مجانية.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                onClick={handleNavClick}
                className="bg-white text-luxury-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105 inline-flex items-center justify-center space-x-2 space-x-reverse"
              >
                <span>احجز استشارة مجانية</span>
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <Link 
                to="/works" 
                onClick={handleNavClick}
                className="border-2 border-white text-white hover:bg-white hover:text-luxury-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:transform hover:scale-105"
              >
                شاهد أعمالنا
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
