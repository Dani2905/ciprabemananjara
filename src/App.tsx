import { lazy, Suspense, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLocation, useRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import CmsBootstrap from './components/CmsBootstrap';
import { pageVariants } from './lib/motion';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Expertises = lazy(() => import('./pages/Expertises'));
const ExpertiseDetail = lazy(() => import('./pages/ExpertiseDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'));
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

function LoadingState() {
  return <div className="flex min-h-[50vh] items-center justify-center px-6 text-sm text-gray-500">Chargement…</div>;
}

function RouteContent() {
  const location = useLocation();
  const element = useRoutes(
    [
      { path: '/', element: <Home /> },
      { path: '/cabinet', element: <About /> },
      { path: '/expertises', element: <Expertises /> },
      { path: '/expertises/:slug', element: <ExpertiseDetail /> },
      { path: '/actualites', element: <News /> },
      { path: '/actualites/:id', element: <NewsDetail /> },
      { path: '/contact', element: <Contact /> },
      { path: '/mentions-legales', element: <MentionsLegales /> },
      { path: '/politique-confidentialite', element: <PolitiqueConfidentialite /> },
      { path: '/admin/*', element: <AdminDashboard /> },
      { path: '*', element: <NotFound /> },
    ],
    location,
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="flex min-h-[50vh] w-full flex-col"
      >
        <Suspense fallback={<LoadingState />}>{element}</Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  if (isAdmin) return <>{children}</>;

  return (
    <div className="flex min-h-screen flex-col bg-brand-white">
      <Navbar />
      <div className="flex flex-1 flex-col">{children}</div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <CmsBootstrap />
      <SiteLayout>
        <RouteContent />
      </SiteLayout>
    </>
  );
}
