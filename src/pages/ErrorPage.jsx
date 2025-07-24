import { useRouteError, Link } from "react-router-dom";
import styled from "styled-components";

const PageContainer = styled.main`
  height: 100svh;
  display: flex;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <PageContainer>
      <h2>
        Error {error.status}: {error.statusText}
      </h2>
      <p>{error.data}</p>
      <Link to="/">Return to Home</Link>
    </PageContainer>
  );
};

export default ErrorPage;
