/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Heart,
  UserCheck,
  ShieldAlert,
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Icon mapping helper
const IconMap: Record<string, React.ElementType> = {
  Heart,
  UserCheck,
  ShieldAlert
};

export default function App() {
  const [data, setData] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    fetch('/data/content.json')
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error('Failed to load content:', err));

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold text-blue-600 tracking-tight">
            {data.brand}
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 items-center">
            {data.navMenu.map((item: any) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`font-medium transition-colors hover:text-blue-600 ${scrolled ? 'text-slate-700' : 'text-slate-800'}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-white shadow-xl border-t md:hidden"
            >
              <ul className="p-6 flex flex-col gap-4">
                {data.navMenu.map((item: any) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block text-lg font-medium text-slate-700 hover:text-blue-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={data.hero.bgImage}
            alt="Hero Background"
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6 whitespace-pre-line">
              {data.hero.title}
            </h2>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-lg">
              {data.hero.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559234938-b60fff04894d?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="About Us"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>

            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                {data.about.subtitle}
              </span>
              <h3 className="text-4xl font-bold text-slate-900 mb-8">
                {data.about.title}
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-12">
                {data.about.description}
              </p>

              <div className="grid grid-cols-3 gap-6">
                {data.about.stats.map((stat: any) => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <p className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</p>
                    <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="text-4xl font-bold text-slate-900 mb-6">{data.services.title}</h3>
            <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {data.services.items.map((item: any, idx: number) => {
              const IconComponent = IconMap[item.icon] || Heart;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-slate-100 group"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h4>
                  <p className="text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h4 className="text-2xl font-bold text-white mb-6">{data.brand}</h4>
              <p className="max-w-md mb-8 leading-relaxed">
                우리는 모든 어르신들이 행복한 세상을 꿈꿉니다.
                여러분의 참여가 세상을 바꿉니다.
              </p>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Contact Info</h5>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPin size={20} className="text-blue-500 shrink-0 mt-1" />
                  <span>{data.contact.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={20} className="text-blue-500 shrink-0" />
                  <span>{data.contact.phone}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail size={20} className="text-blue-500 shrink-0" />
                  <span>{data.contact.email}</span>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="text-white font-bold mb-6">Quick Links</h5>
              <ul className="flex flex-col gap-4">
                {data.navMenu.map((item: any) => (
                  <li key={item.label}>
                    <a href={item.href} className="hover:text-blue-500 transition-colors">{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© 2026 {data.brand}. All rights reserved.</p>
            <p>사업자등록번호: {data.contact.businessNumber}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
