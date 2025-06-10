
import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollAnimation from '@/components/ScrollAnimation';
import CounterAnimation from '@/components/CounterAnimation';
import { Award, Users, Target, Heart, Star, Trophy, Medal, Crown } from 'lucide-react';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-cairo">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
            alt="من نحن"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <ScrollAnimation animation="fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">من نحن</h1>
            <p className="text-xl text-gray-200">
              رحلتنا في عالم التصميم الداخلي والإبداع
            </p>
          </ScrollAnimation>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation animation="slide-right">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  قصة <span className="text-luxury-600">نجاحنا</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  بدأت رحلتنا عام 2015 بحلم بسيط: تحويل المساحات العادية إلى تحف فنية استثنائية. اليوم، نفخر بكوننا من الرواد في مجال التصميم الداخلي في المنطقة.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  نؤمن بأن كل مساحة لها روح وشخصية فريدة، ومهمتنا هي إبراز هذه الشخصية وتحويلها إلى واقع يعكس ذوق وشخصية أصحابها.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-6">
                  <div className="text-center">
                    <CounterAnimation end={150} suffix="+" className="text-3xl font-bold text-luxury-600" />
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
                  alt="فريق العمل"
                  className="rounded-lg w-full"
                />
                <div className="absolute -bottom-6 -right-6 bg-luxury-600 text-white p-6 rounded-lg">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Award className="h-8 w-8 text-luxury-200" />
                    <div>
                      <div className="font-bold text-lg">منذ 2015</div>
                      <div className="text-sm text-luxury-200">سنوات من الخبرة</div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                قيمنا <span className="text-luxury-600">ومبادئنا</span>
              </h2>
              <p className="text-xl text-gray-600">ما يميزنا ويدفعنا للتميز كل يوم</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: 'الدقة والإتقان', desc: 'نهتم بأدق التفاصيل في كل مشروع' },
              { icon: Heart, title: 'الشغف والإبداع', desc: 'نضع قلوبنا في كل تصميم نقوم به' },
              { icon: Users, title: 'فريق متخصص', desc: 'خبراء في مختلف مجالات التصميم' },
              { icon: Award, title: 'الجودة العالية', desc: 'نلتزم بأعلى معايير الجودة العالمية' }
            ].map((value, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 200}>
                <div className="text-center bg-white p-8 rounded-lg hover:transform hover:translateY-[-4px] transition-all duration-300">
                  <div className="w-16 h-16 bg-luxury-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-luxury-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                فريق <span className="text-luxury-600">الخبراء</span>
              </h2>
              <p className="text-xl text-gray-600">مجموعة من أفضل المصممين والمهندسين</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'أحمد محمد', role: 'المدير الإبداعي', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', experience: '15 سنة خبرة' },
              { name: 'فاطمة أحمد', role: 'مصممة داخلية رئيسية', image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', experience: '12 سنة خبرة' },
              { name: 'محمد علي', role: 'مهندس تنفيذ', image: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400', experience: '10 سنوات خبرة' }
            ].map((member, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 200}>
                <div className="text-center bg-gray-50 p-8 rounded-lg hover:transform hover:translateY-[-4px] transition-all duration-300">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto mb-6"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-luxury-600 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.experience}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-20 bg-luxury-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                جوائز <span className="text-luxury-600">وشهادات التقدير</span>
              </h2>
              <p className="text-xl text-gray-600">إنجازاتنا وتقديرنا في عالم التصميم</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Trophy, title: 'جائزة أفضل تصميم', year: '2024', desc: 'جائزة التميز في التصميم الداخلي' },
              { icon: Medal, title: 'شهادة الجودة الدولية', year: '2023', desc: 'ISO 9001 لضمان الجودة' },
              { icon: Crown, title: 'أفضل مشروع سكني', year: '2023', desc: 'مسابقة التصميم الإقليمية' },
              { icon: Star, title: 'تقدير العملاء', year: '2024', desc: '98% معدل رضا العملاء' }
            ].map((award, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 200}>
                <div className="text-center bg-white p-8 rounded-lg hover:transform hover:translateY-[-4px] transition-all duration-300">
                  <div className="w-16 h-16 bg-luxury-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <award.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{award.title}</h3>
                  <p className="text-luxury-600 font-medium mb-2">{award.year}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{award.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-luxury-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation animation="fade-up">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">إنجازاتنا بالأرقام</h2>
              <p className="text-xl text-luxury-100">أرقام تتحدث عن نفسها</p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: 150, suffix: '+', label: 'مشروع مكتمل' },
              { number: 98, suffix: '%', label: 'رضا العملاء' },
              { number: 50, suffix: '+', label: 'عميل سعيد' },
              { number: 9, suffix: '', label: 'سنوات خبرة' }
            ].map((stat, index) => (
              <ScrollAnimation key={index} animation="fade-up" delay={index * 200}>
                <div className="text-center">
                  <CounterAnimation 
                    end={stat.number} 
                    suffix={stat.suffix} 
                    className="text-4xl md:text-5xl font-bold text-white mb-2" 
                  />
                  <p className="text-luxury-100 text-lg">{stat.label}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
