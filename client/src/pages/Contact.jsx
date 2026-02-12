import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, MessageSquareText } from 'lucide-react';

const InputField = ({ label, placeholder, name, value, onChange, type = 'text', multiline = false }) => (
  <div className="mb-6 flex-1">
    <label className="block text-xs font-semibold text-gray-400 mb-1">{label}</label>
    {multiline ? (
      <textarea
        className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors resize-none text-sm text-gray-700 h-24 shadow-inner"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    ) : (
      <input
        type={type}
        className="w-full border-b border-gray-300 py-2 focus:border-blue-600 outline-none transition-colors text-sm text-gray-700 shadow-inner"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
    )}
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [smartAnalysis, setSmartAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const analyzeMessage = () => {
    if (!formData.message || formData.message.length < 5) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setSmartAnalysis(
        'አስቸኳይ ጭነት መሆኑን ያመለክታል፣ የፈጣን አየር መጓጓዣ ሊያስፈልግ ይችላል።'
      );
      setIsAnalyzing(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('መልዕክትዎ በተሳካ ሁኔታ ተልኳል! የSmartCargo ቡድናችን በቅርቡ ያግኙዎታል።');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-16 px-4 pb-12 
  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">


      {/* Header */}
      <div className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact US</h1>
        <p className="text-gray-500 text-sm leading-relaxed px-4">
          ለንግድዎ የተመረጡ የሎጂስቲክስ መፍትሄዎችና የታመነ የአቅርቦት ሰንሰለት አውታረ መረብ።
        </p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-5xl bg-white rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[550px]">

        {/* Left Panel */}
        <div className="md:w-1/3 bg-blue-200 p-10 flex flex-col text-blue-600 m-3 rounded-[32px] justify-between relative shadow-lg">
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-blue-600/80 text-xs mb-10 leading-relaxed font-medium">
              ከ500+ በላይ ዓለም አቀፍ መንገዶች ላይ የሚሰሩ ዘመናዊ የሎጂስቲክስ መፍትሄዎችና የቀጥታ ክትትል።
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/10 p-2.5 rounded-lg shadow-md">
                  <Phone size={18} />
                </div>
                <div className="text-sm font-medium">
                  <p>+251 58 220 1234</p>
                  <p>+251 91 234 5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-600/10 p-2.5 rounded-lg shadow-md">
                  <Mail size={18} />
                </div>
                <p className="text-sm font-medium">support@smartcargo.com</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-600/10 p-2.5 rounded-lg shadow-md">
                  <MapPin size={18} />
                </div>
                <p className="text-sm font-medium">ባህር ዳር፣ ኢትዮጵያ</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-2/3 p-10 md:p-14 relative shadow-lg rounded-xl">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <InputField label="ስምዎ" placeholder="ስምዎን ያስገቡ" name="name" value={formData.name} onChange={handleInputChange}/>
              <InputField label="ኢሜይልዎ" placeholder="ኢሜይልዎን ያስገቡ" name="email" type="email" value={formData.email} onChange={handleInputChange}/>
            </div>

            <InputField label="ርዕሰ ጉዳይ" placeholder="ርዕሰ ጉዳዩን ያስገቡ" name="subject" value={formData.subject} onChange={handleInputChange}/>

            <div className="relative group">
              <InputField
                label="መልዕክት"
                placeholder="መልዕክትዎን እዚህ ይጻፉ"
                name="message"
                multiline
                value={formData.message}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={analyzeMessage}
                disabled={isAnalyzing || !formData.message}
                className="absolute right-0 top-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 disabled:opacity-50"
              >
                {isAnalyzing ? <Loader2 className="animate-spin" size={12}/> : <MessageSquareText size={12}/>}
                የስማርት ትንታኔ
              </button>
            </div>

            {smartAnalysis && (
              <div className="mb-6 p-3 bg-blue-50 rounded-xl border border-blue-200 shadow-inner">
                <p className="text-[10px] font-bold uppercase mb-1 text-blue-600">
                  የAI የሎጂስቲክስ ቅድመ እይታ፦
                </p>
                <p className="text-xs italic font-medium text-blue-800">
                  "{smartAnalysis}"
                </p>
              </div>
            )}

            <div className="mt-8">
              <button type="submit" disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2 disabled:opacity-70">
                {isSubmitting ? <Loader2 className="animate-spin" size={18}/> : <Send size={18}/>}
                {isSubmitting ? 'በመላክ ላይ...' : 'መልዕክት ላክ'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-gray-400 text-[10px] font-medium tracking-widest uppercase flex items-center gap-4">
        <span>© 2018 SmartCargo ዓለም አቀፍ ሎጂስቲክስ</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>የግላዊነት ፖሊሲ</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>የአገልግሎት መመሪያዎች</span>
      </div>

    </div>
  );
};

export default ContactPage;
