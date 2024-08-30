import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import HomePage from '@/pages/HomePage';
import SearchFormPage from '@/pages/SearchFormPage';
import { AnimatePresence } from 'framer-motion';
import MyCoursePage from '@/pages/MyCoursePage';
import LoginPage from '@/pages/LoginPage';

function DynamicRouter() {
  return (
    <BrowserRouter>
      <AnimatePresence>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search-form" element={<SearchFormPage />} />
            <Route path="/headcount-form" element={<>Login</>} />
            <Route path="/preference-form" element={<>Login</>} />
            <Route path="/onboarding" element={<>Login</>} />
            <Route path="/favorites" element={<>favorites</>} />
            <Route path="/my-course/:courseId" element={<MyCoursePage />} />
            <Route path="/profile" element={<>profile</>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default DynamicRouter;
