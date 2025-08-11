import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

const OutletWrapper = ({ context, children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Outlet context={context} />}>
          <Route index element={children} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default OutletWrapper;
