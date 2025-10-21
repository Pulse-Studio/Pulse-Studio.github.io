import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { footerContent } from './data/footerContent';
import Home from './pages/Home';
import { ProjectPage } from './pages/ProjectPage';
import { AnnihilationPage } from './pages/AnnihilationPage';
import { AnnihilationNewsPage } from './pages/AnnihilationNewsPage';
import { AnnihilationChangelogPage } from './pages/AnnihilationChangelogPage';
import { projectsContent } from './data/content';

const ProjectPageWrapper: FC<{ validIds: string[] }> = ({ validIds }) => {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !validIds.includes(id)) {
    return <Navigate to="/" replace />;
  }

  return <ProjectPage />;
};

const AppContent: FC = () => {
  const location = useLocation();
  const showFooter = !location.pathname.includes('/projects/annihilation');

  return (
    <div className="min-h-screen bg-dark-bg text-white flex flex-col">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects/annihilation" element={<AnnihilationPage />} />
          <Route path="/projects/annihilation/news" element={<AnnihilationNewsPage />} />
          <Route path="/projects/annihilation/changelog" element={<AnnihilationChangelogPage />} />
          <Route 
            path="/:id" 
            element={<ProjectPageWrapper validIds={projectsContent.projects.map(p => p.id)} />} 
          />
        </Routes>
      </main>
      {showFooter && <Footer content={footerContent} />}
    </div>
  );
};

const App: FC = () => {
  const basename = import.meta.env.BASE_URL || '';

  return (
    <Router basename={basename}> 
      <ScrollToTop />
      <AppContent />
    </Router>
  );
};

export default App;