import { useRouteError, Link } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <h2>
        Error {error.status}: {error.statusText}
      </h2>
      <p>{error.data}</p>
      <Link to="/">
        <button>Return to Home</button>
      </Link>
    </div>
  );
};

export default ErrorPage;
