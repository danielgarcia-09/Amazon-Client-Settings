import styled from "@emotion/styled";

export const PaymentMethods = styled.div`
  margin: 1rem 0;
  padding: 2rem 1rem;
  background-color: #adc2a9;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow-x: hidden;
  overflow-y: auto;
  text-align: center;
  height: inherit;

  a {
    text-decoration: none;
    color: inherit;
  }

  span, p {
    font-size: 1.5rem
  }

  @media (max-width: 652px) {
    & {
      margin: 0 auto;
      width: 70%;
      padding: 2rem;
    }
    span, p {
      font-size: 1rem
    }
  }
`;

export const PaymentService = styled.div`
  position: relative;
  padding: 3rem 5rem;
  width: 50%;
  margin: 1rem;
  border-radius: 12px;
  background-color: #d3e4cd;
  font-size: 0.9rem;
  text-align: center;

  span {
    margin-top: 0.6rem;
    width: 50px;
  }
`;



export const PaymentCompany = styled.div`
position: absolute;
top: 0;
left: 0;
padding: 0.6rem 1.2rem;
border-radius: 12px 0 12px 0;
background-color: #99a799;
font-weight: bold;
`;

export const PaymentDelete = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0 12px 0 12px;
  background-color: red;
  font-weight: bold;
  cursor: pointer;
  height: initial;
  transition: transform 0.2s; /* Animation */

  &:hover {
    transform: scale(1.2);
  }
`;

export const PaymentButtonBlock = styled.div`
  margin: -80px auto;
  height: 100px !important;
  display: flex !important;
  justify-content: space-around;
  align-content: center;
  flex-direction: row !important;
  flex-wrap: wrap;


  @media ( max-width: 640px ) {
    &{ 
      width: 200px;
      margin-bottom: 0;
    }
  }

  @media( min-width: 600px ) {
    button {
      margin-bottom: 1rem;  
    }
  }
`;

export const PaymentSubmitButton = styled.button`
  padding: 0.8rem 7rem;
  border: none;
  border-radius: 12px;
  background-color: #adc2a9;
  color: #636e63;
  font-size: 1.6rem;
  font-weight: bold;
  transition: 0.5s;

  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;
