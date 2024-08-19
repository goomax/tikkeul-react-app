import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '@/components/common/Layout';

function DynamicRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<>Home</>} />
          <Route path='/auth' element={<>Login</>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default DynamicRouter;
