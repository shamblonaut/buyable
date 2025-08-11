import { useRouteError, Link } from "react-router";

import { Page } from "./ErrorPage.styles";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Page>
      <h2>
        Error {error.status}: {error.statusText}
      </h2>
      <p>{error.data}</p>
      <Link to="/">Return to Home</Link>
    </Page>
  );
};

export default ErrorPage;
