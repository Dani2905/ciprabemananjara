import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import IpSimulator from '../components/IpSimulator';
import { ArrowUpRightIcon } from '@heroicons/react/24/outline';
import { getNews, type NewsItem } from '../data/news';
import { getBannerItems, type BannerItem } from '../data/banner';
import { easeInstitutional } from '../lib/motion';
import { getSiteContent, getHeroImages, type SiteContent } from '../data/siteContent';
import { getSitePagesContent, type SitePagesContent } from '../data/sitePages';
import { getExpertiseContent, type ExpertiseContentItem } from '../data/expertiseContent';
import React from 'react';

const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const heroElement = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeInstitutional,
    },
  },
};

const sectionHeaderAnim = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeInstitutional,
    },
  },
};

export default function Home() {
  const { i18n } = useTranslation();
  const isFr = i18n.language.startsWith('fr');

  const [images, setImages] = useState<string[]>(getHeroImages);
  const [siteContent, setSiteContent] = useState<SiteContent>(getSiteContent);
  const [currentImg, setCurrentImg] = useState(0);
  const [newsList, setNewsList] = useState<NewsItem[]>(getNews);
  const [bannerItems, setBannerItems] = useState<BannerItem[]>(getBannerItems);
  const [sitePages, setSitePages] = useState<SitePagesContent>(getSitePagesContent);
  const [expertisePages, setExpertisePages] = useState<ExpertiseContentItem[]>(getExpertiseContent);
  const language = isFr ? 'fr' : 'en';

  useEffect(() => {
    const refreshImages = () => {
      setImages(getHeroImages());
      setCurrentImg(0);
    };
    const refreshContent = () => setSiteContent(getSiteContent());
    const refreshNews = () => setNewsList(getNews());
    const refreshBanner = () => setBannerItems(getBannerItems());
    const refreshSitePages = () => setSitePages(getSitePagesContent());
    const refreshExpertise = () => setExpertisePages(getExpertiseContent());
    const refreshFromStorage = () => {
      refreshImages();
      refreshContent();
      refreshNews();
      refreshBanner();
      refreshSitePages();
      refreshExpertise();
    };

    window.addEventListener('storage', refreshFromStorage);
    window.addEventListener('heroImagesUpdated', refreshImages);
    window.addEventListener('appSiteContentUpdated', refreshContent);
    window.addEventListener('appNewsUpdated', refreshNews);
    window.addEventListener('appBannerUpdated', refreshBanner);
    window.addEventListener('sitePagesUpdated', refreshSitePages);
    window.addEventListener('expertiseContentUpdated', refreshExpertise);
    return () => {
      window.removeEventListener('storage', refreshFromStorage);
      window.removeEventListener('heroImagesUpdated', refreshImages);
      window.removeEventListener('appSiteContentUpdated', refreshContent);
      window.removeEventListener('appNewsUpdated', refreshNews);
      window.removeEventListener('appBannerUpdated', refreshBanner);
      window.removeEventListener('sitePagesUpdated', refreshSitePages);
      window.removeEventListener('expertiseContentUpdated', refreshExpertise);
    };
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <main className="bg-brand-white min-h-screen pt-32 md:pt-40 pb-24">
      
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={heroElement}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-surface border border-brand-border text-[11px] font-semibold tracking-widest uppercase text-gray-500 mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                {sitePages.home.heroBadge[language]}
              </div>
            </motion.div>

            <motion.h1 
              variants={heroElement}
              className="text-5xl lg:text-7xl font-display font-light leading-[1.05] tracking-tight text-brand-black mb-8"
            >
              <span className="font-bold">{sitePages.home.heroTitle[language]}</span><br />
              <span className="text-brand-accent italic">{isFr ? siteContent.heroAccentFr : siteContent.heroAccentEn}</span>
            </motion.h1>

            <motion.p 
              variants={heroElement}
              className="text-lg text-gray-500 font-light max-w-lg mb-10 leading-relaxed"
            >
              {isFr ? siteContent.heroDescriptionFr : siteContent.heroDescriptionEn}
            </motion.p>

            <motion.div 
              variants={heroElement}
              className="flex flex-wrap items-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-block bg-brand-black text-brand-white px-8 py-4 rounded-full text-sm font-semibold hover:bg-brand-accent transition-colors shadow-sm">
                  {sitePages.home.heroContactCta[language]}
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/expertises" className="inline-block px-8 py-4 rounded-full text-sm font-semibold text-brand-black border border-brand-border hover:border-brand-black hover:bg-white transition-colors">
                  {sitePages.home.heroExpertisesCta[language]}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.9, ease: easeInstitutional, delay: 0.15 }} 
            className="relative h-[480px] lg:h-[620px] rounded-[2rem] overflow-hidden bg-brand-surface shadow-md"
          >
            <AnimatePresence mode="sync">
              {images.length > 0 && (
                <motion.img
                  key={currentImg}
                  src={images[currentImg]}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover grayscale-[15%] contrast-105"
                  alt="Cabinet C.IP Rabemananjara"
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5 pointer-events-none z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="w-full bg-brand-black py-4 overflow-hidden mb-32 flex whitespace-nowrap border-y border-brand-accent/20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>
        
        <motion.div 
          className="flex items-center text-sm md:text-base font-medium tracking-widest uppercase text-gray-300"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center shrink-0">
              {bannerItems.map(item => (
                <React.Fragment key={item.id}>
                  <span className="mx-6 md:mx-8">{isFr ? item.fr : item.en}</span>
                  <span className="text-brand-accent/60 text-lg">✦</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bento Grid Services */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <motion.div 
          variants={sectionHeaderAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight text-brand-black">
            {sitePages.home.areasTitle[language]}
          </h2>
          <Link to="/expertises" className="text-sm font-semibold text-brand-accent hover:text-brand-black transition-colors flex items-center gap-1 group">
             <span>{sitePages.home.areasLink[language]}</span>
             <ArrowUpRightIcon className="h-[16px] w-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </motion.div>
        
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {expertisePages.map((page, index) => {
            const title = isFr ? page.titleFr : page.titleEn;
            const summary = isFr ? page.summaryFr : page.summaryEn;
            const category = sitePages.expertiseOverview.categories.find((item) => item.slug === page.slug);
            return (
              <motion.article
                key={page.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.25), ease: easeInstitutional }}
                whileHover={{ y: -4 }}
                className="group flex min-h-[280px] flex-col items-start justify-between rounded-[2rem] border border-brand-border bg-brand-surface p-8 transition-all hover:border-brand-accent/50 hover:bg-white lg:p-9"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-accent">{category ? category[language] : (isFr ? 'Expertise' : 'Expertise')}</span>
                    <span className="font-display text-xs text-gray-300">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-7 text-2xl font-display text-brand-black transition-colors group-hover:text-brand-accent">{title}</h3>
                  <p className="mt-4 text-sm font-light leading-7 text-gray-600">{summary}</p>
                </div>
                <Link to={`/expertises/${page.slug}`} aria-label={`${isFr ? 'Découvrir' : 'Explore'} ${title}`} className="mt-7 flex h-11 w-11 items-center justify-center rounded-full border border-brand-border text-brand-black transition-all group-hover:border-brand-black group-hover:bg-brand-black group-hover:text-white">
                  <ArrowUpRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* Actualités / News */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <motion.div 
          variants={sectionHeaderAnim}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <h2 className="text-3xl lg:text-4xl font-display tracking-tight text-brand-black">
            {sitePages.home.newsTitle[language]}
          </h2>
          <Link to="/actualites" className="text-sm font-semibold text-brand-accent hover:text-brand-black transition-colors flex items-center gap-1 group">
             <span>{sitePages.home.newsLink[language]}</span>
             <ArrowUpRightIcon className="h-[16px] w-[16px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {newsList.slice(0, 3).map((news, idx) => (
            <motion.div
              key={news.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.09, ease: easeInstitutional }}
              whileHover={{ y: -4 }}
              className="h-full"
            >
              <Link to="/actualites" className="bg-brand-surface p-8 lg:p-10 rounded-[2rem] flex flex-col h-full group border border-brand-border/60 hover:border-brand-border transition-all cursor-pointer">
                <span className="text-xs font-semibold text-brand-accent mb-4 uppercase tracking-widest">{isFr ? news.date : news.dateEn || news.date}</span>
                <h3 className="text-xl font-display text-brand-black mb-4 group-hover:text-brand-accent transition-colors leading-snug">{isFr ? news.title : news.titleEn || news.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8 flex-1 text-sm line-clamp-3">{isFr ? news.desc : news.descEn || news.desc}</p>
                
                <div className="w-10 h-10 rounded-full border border-brand-border flex items-center justify-center group-hover:bg-brand-black group-hover:text-brand-white group-hover:border-brand-black transition-all text-brand-black mt-auto">
                  <ArrowUpRightIcon className="h-[18px] w-[18px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
          {newsList.length === 0 && <p className="rounded-2xl border border-dashed border-brand-border bg-brand-surface p-8 text-sm text-gray-600 md:col-span-3">{sitePages.home.newsEmpty[language]}</p>}
        </div>
      </section>

      {/* IP Simulator */}
      <section className="max-w-6xl mx-auto px-6 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: easeInstitutional }}
        >
          <IpSimulator />
        </motion.div>
      </section>
    </main>
  );
}