import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./Users";
// import Home from './pages/Home'

const CreateUser = lazy(() => import("./CreateUser"));
const UpdateUser = lazy(() => import("./UpdateUser"));
const NotFound = lazy(() => import("./NotFound"));

function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="app-shell d-flex justify-content-center align-items-center">
            <div className="form-panel border bg-white rounded p-4 shadow-sm text-center">
              <div className="lazy-loader text-muted">Loading page...</div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
