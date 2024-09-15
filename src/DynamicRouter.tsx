import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/common/Layout';
import {
  HeadcountFormPage,
  HomePage,
  LoginPage,
  MyCoursePage,
  OnboardingPage,
  PreferenceFormPage,
  SearchFormPage,
} from '@/pages';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import CoursePage from './pages/CoursePage';
import ScrollToTop from './components/ScrollToTop';

function DynamicRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/search-form" element={<SearchFormPage />} />
            <Route path="/headcount-form" element={<HeadcountFormPage />} />
            <Route path="/preference-form" element={<PreferenceFormPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/my-course/:courseId" element={<MyCoursePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default DynamicRouter;
