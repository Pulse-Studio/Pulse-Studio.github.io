import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { footerContent } from './data/footerContent';
import Home from './pages/Home';
import { ProjectPage } from './pages/ProjectPage';
import { projectsContent } from './data/content';

const ProjectPageWrapper: FC<{ validIds: string[] }> = ({ validIds }) => {
  const { id } = useParams<{ id: string }>();
  
  if (!id || !validIds.includes(id)) {
    return <Navigate to="/" replace />;
  }

  return <ProjectPage />;
};

const App: FC = () => {
  const validProjectIds = projectsContent.projects.map(p => p.id);
  const basename = import.meta.env.BASE_URL || '';

  return (
    <Router basename={basename}> 
      <div className="min-h-screen bg-dark-bg text-white flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/:id" 
              element={<ProjectPageWrapper validIds={validProjectIds} />} 
            />
          </Routes>
        </main>
        <Footer content={footerContent} />
      </div>
    </Router>
  );
};

export default App;