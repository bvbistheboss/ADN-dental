import React, { useState } from 'react';
import { COURSES } from '../data/content';
import { Course } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, MapPin, Clock, User, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEnroll = (courseName: string) => {
    const SALES_NUM = '213698094000';
    const msg = encodeURIComponent(`Enrollment Request for Course: ${courseName}`);
    window.open(`https://wa.me/${SALES_NUM}?text=${msg}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-[#FF6600] font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>ADN Dental Academy • Algiers</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-black uppercase font-['Space_Grotesk'] tracking-tight">
            {t('courses_title')}
          </h1>
          <p className="text-zinc-600 text-sm">
            {t('courses_sub')}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-zinc-50 rounded-3xl border border-zinc-200/80 overflow-hidden shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video bg-zinc-200 overflow-hidden relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/85 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full font-['Space_Grotesk']">
                    {course.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#FF6600] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    {course.spotsLeft} {t('spots_remaining')}
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase font-['Space_Grotesk'] text-zinc-900 leading-tight">
                      {course.title}
                    </h2>
                    <p className="text-zinc-600 text-xs leading-relaxed">
                      {course.summary}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-zinc-700 bg-white p-3 rounded-xl border border-zinc-200/60">
                      <Calendar className="w-4 h-4 text-[#FF6600] shrink-0" />
                      <span className="font-bold">{course.date}</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-700 bg-white p-3 rounded-xl border border-zinc-200/60">
                      <Clock className="w-4 h-4 text-[#FF6600] shrink-0" />
                      <span className="font-bold">{course.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-700 bg-white p-3 rounded-xl border border-zinc-200/60 col-span-2">
                      <User className="w-4 h-4 text-[#FF6600] shrink-0" />
                      <span className="font-bold">{course.instructor}</span>
                    </div>
                  </div>

                  {/* Topics covered */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block font-['Space_Grotesk']">
                      Course Curriculum Highlights
                    </span>
                    <ul className="space-y-1.5 text-xs text-zinc-700">
                      {course.topics.map((t, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6600] shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              <div className="p-8 pt-0">
                <button
                  onClick={() => handleEnroll(course.title)}
                  className="w-full bg-[#FF6600] hover:bg-[#ff771c] text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t('btn_join')}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
