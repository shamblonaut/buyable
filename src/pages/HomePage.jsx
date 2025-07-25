import { Link, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import Carousel from "../components/Carousel";

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  flex: 1;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const HeroText = styled.p`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  margin-top: 32px;
`;

const CTAButton = styled(Link)`
  margin-top: 32px;
  cursor: pointer;

  & button {
    padding: 8px 16px;
    font-size: 1.25rem;
    font-weight: 500;
  }
`;

const Loading = styled.p`
  margin: 32px;
`;

const HomePage = () => {
  const { productsData, productsLoading } = useOutletContext();

  return (
    <Page>
      <HeroSection>
        {productsLoading ? (
          <Loading>Loading Carousel...</Loading>
        ) : (
          productsData && <Carousel items={productsData.slice(0, 11)} />
        )}
        <HeroText>Buy to your heart's content!</HeroText>
        <CTAButton to="/shop">
          <button>Explore Products</button>
        </CTAButton>
      </HeroSection>
    </Page>
  );
};

export default HomePage;
