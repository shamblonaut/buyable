import { useOutletContext } from "react-router-dom";

import { Carousel } from "@/components";

import {
  Page,
  HeroSection,
  Loading,
  HeroText,
  CTAButton,
} from "./HomePage.styles";

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
