import { useOutletContext } from "react-router-dom";

import { Carousel } from "@/components";

import {
  Page,
  HeroSection,
  Info,
  HeroText,
  HeroHighlight,
  CTALink,
} from "./HomePage.styles";

const HomePage = () => {
  const { productsData, productsLoading } = useOutletContext();

  return (
    <Page>
      {productsLoading ? (
        <Info>Loading Carousel...</Info>
      ) : productsData ? (
        <Carousel items={productsData.slice(0, 11)} />
      ) : (
        <Info>Could not load carousel :(</Info>
      )}
      <HeroSection>
        <HeroText>
          I can't believe it's not
          <br />
          <HeroHighlight>BUYABLE</HeroHighlight>
        </HeroText>
        <CTALink to="/shop">Explore Products</CTALink>
      </HeroSection>
    </Page>
  );
};

export default HomePage;
