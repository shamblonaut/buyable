import styled from "styled-components";

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  flex: 1;
`;

const Heading = styled.h2`
  text-align: center;
  margin-bottom: 16px;
`;

const Disclaimer = styled.p`
  font-size: 1.25rem;
`;

const CheckoutPage = () => (
  <Page>
    <Heading>Checkout</Heading>
    <Disclaimer>
      Sorry to disappoint you, but this was a fake online store that I built to
      practice React development. Good luck on your shopping endeavours!
      <br />
      <br />
      P.S. Shop responsibly!
    </Disclaimer>
  </Page>
);

export default CheckoutPage;
