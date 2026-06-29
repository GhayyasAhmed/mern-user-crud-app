import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="app-shell d-flex justify-content-center align-items-center">
      <div className="form-panel border bg-white rounded p-4 shadow-sm text-center">
        <p className="text-uppercase text-muted mb-2">404</p>
        <h2 className="mb-3">Page not found</h2>
        <p className="text-muted mb-4">
          The page you are trying to open does not exist or may have been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Back to Users
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
