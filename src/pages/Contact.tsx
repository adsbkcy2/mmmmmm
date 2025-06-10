
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال النموذج
    setTimeout(() => {
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white font-cairo">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
            alt="تواصل معنا"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-xl text-gray-200">
            نحن هنا لمساعدتك في تحويل أحلامك إلى واقع
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  معلومات <span className="text-luxury-600">التواصل</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  نحن متاحون للإجابة على جميع استفساراتكم ومساعدتكم في تحقيق رؤيتكم للمساحة المثالية.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-luxury-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-luxury-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">العنوان</h3>
                    <p className="text-gray-600">
                      شارع التحرير، القاهرة الجديدة<br />
                      مصر - 11828
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-luxury-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-luxury-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">الهاتف</h3>
                    <p className="text-gray-600">
                      +20 123 456 7890<br />
                      +20 111 222 3333
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-luxury-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-luxury-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">البريد الإلكتروني</h3>
                    <p className="text-gray-600">
                      info@luxury-design.com<br />
                      contact@luxury-design.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-luxury-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-luxury-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ساعات العمل</h3>
                    <p className="text-gray-600">
                      السبت - الخميس: 9:00 ص - 6:00 م<br />
                      الجمعة: مغلق
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0755789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقعنا على الخريطة"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  أرسل لنا <span className="text-luxury-600">رسالة</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-500 focus:border-luxury-500 transition-colors"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        البريد الإلكتروني *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-500 focus:border-luxury-500 transition-colors"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-500 focus:border-luxury-500 transition-colors"
                        placeholder="+20 123 456 7890"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        موضوع الرسالة *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-500 focus:border-luxury-500 transition-colors"
                      >
                        <option value="">اختر موضوع الرسالة</option>
                        <option value="consultation">استشارة تصميم</option>
                        <option value="project">مشروع جديد</option>
                        <option value="quote">طلب عرض سعر</option>
                        <option value="general">استفسار عام</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      الرسالة *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-luxury-500 focus:border-luxury-500 transition-colors resize-vertical"
                      placeholder="أخبرنا عن مشروعك أو استفسارك بالتفصيل..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-luxury-600 hover:bg-luxury-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>جاري الإرسال...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>إرسال الرسالة</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              الأسئلة <span className="text-luxury-600">الشائعة</span>
            </h2>
            <p className="text-xl text-gray-600">
              إجابات على أكثر الأسئلة شيوعاً حول خدماتنا
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                كم يستغرق تنفيذ مشروع التصميم الداخلي؟
              </h3>
              <p className="text-gray-600">
                يختلف الوقت حسب حجم المشروع ومدى تعقيده. عادة ما تتراوح المدة بين 4-12 أسبوع للمشاريع السكنية المتوسطة.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                هل تقدمون خدمة الاستشارة المجانية؟
              </h3>
              <p className="text-gray-600">
                نعم، نقدم استشارة أولية مجانية لمدة ساعة لمناقشة مشروعكم ووضع خطة أولية للتصميم.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                هل تتولون توريد وتركيب الأثاث؟
              </h3>
              <p className="text-gray-600">
                نعم، نقدم خدمة متكاملة تشمل التصميم وتوريد الأثاث والديكورات والإشراف على التنفيذ.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                ما هي تكلفة خدمات التصميم الداخلي؟
              </h3>
              <p className="text-gray-600">
                تختلف التكلفة حسب نوع المشروع ومساحته ومستوى التشطيب المطلوب. نقدم عروض أسعار مفصلة بعد المعاينة.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
