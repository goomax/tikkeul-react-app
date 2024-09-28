import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/common/Layout';
import {
  AgeFormPage,
  CoursePage,
  FavoritesPage,
  GenderFormPage,
  HeadcountFormPage,
  HomePage,
  LoginPage,
  MyCoursePage,
  NameFormPage,
  OnboardingPage,
  PreferenceFormPage,
  ProfilePage,
  SearchFormPage,
  DayFormPage,
  MyCourseResultPage,
  SharePage,
} from '@/pages';
import ScrollToTop from './components/ScrollToTop';
import { FormDataProvider } from './FormDataProvider';
import { CreateGroupFormData, initialCreateGroupFormData } from './schemas/createGroup';
import { initialSignUpFormData, SignUpFormData } from './schemas/signup';

function DynamicRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AnimatePresence>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* 회원 가입 퍼넬 */}
            <Route element={<FormDataProvider<SignUpFormData> initialData={initialSignUpFormData} />}>
              <Route path="/signup" element={<NameFormPage />} />
              <Route path="/signup-age" element={<AgeFormPage />} />
              <Route path="/signup-gender" element={<GenderFormPage />} />
            </Route>
            {/* 그룹 생성 퍼넬 */}
            <Route element={<FormDataProvider<CreateGroupFormData> initialData={initialCreateGroupFormData} />}>
              <Route path="/headcount-form" element={<HeadcountFormPage />} />
              <Route path="/day-form" element={<DayFormPage />} />
              <Route path="/preference-form" element={<PreferenceFormPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
            </Route>
            <Route path="/search-form" element={<SearchFormPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/courses/:courseId" element={<CoursePage />} />
            <Route path="/my-course" element={<MyCoursePage />} />
            <Route path="/my-course-result" element={<MyCourseResultPage />} />
            <Route path="/share" element={<SharePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default DynamicRouter;
