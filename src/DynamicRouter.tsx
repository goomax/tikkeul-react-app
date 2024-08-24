import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/common/Layout';
import HomePage from './pages/HomePage';

function DynamicRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<>Home-ssr</>} />
          <Route path="/auth" element={<>Login</>} />
          <Route path="/headcount-form" element={<>Login</>} />
          <Route path="/preference-form" element={<>Login</>} />
          <Route path="/onboarding" element={<>Login</>} />
          <Route path="/like-courses" element={<>Login</>} />
          <Route path="/my-course/:courseId" element={<>Login</>} />
          <Route path="/my-page" element={<>Login</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default DynamicRouter;
