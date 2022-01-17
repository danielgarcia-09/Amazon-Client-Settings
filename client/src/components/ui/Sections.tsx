import styled from "@emotion/styled";

export const MainSection = styled.div`
  min-height: 500px;
  max-width: 85%;
  padding: 2rem;
  margin: 2rem auto;
  border-radius: 8px;
  box-shadow: 0.7px 2.2px 4.5px rgba(0, 0, 0, 0.07),
    1.9px 6px 12.5px rgba(0, 0, 0, 0.1), 4.5px 14.5px 30.1px rgba(0, 0, 0, 0.13),
    15px 48px 100px rgba(0, 0, 0, 0.2);
  background-color: #d3e4cd;
  text-align: end;

  &> section.payments {
    height: 300px;
    max-height: 600px;
  }

  & > h1 {
    text-align: center;
    color: #636e63;
  }

  button.main,
  a.main {
    margin: 0 4rem 4rem 0.5rem;
    padding: 0.8rem 3rem;
    border: none;
    border-radius: 12px;
    background-color: #adc2a9;
    color: #636e63;
    font-size: 1.6rem;
    font-weight: bold;
    transition: 0.5s;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    text-decoration-color: #99a799;
  }

  button.main:hover,
  a.main:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }

  hr {
    margin: 6rem 0 2rem 0;
  }

  @media (max-width: 910px) {
    & {
      text-align: center;
    }

    button.main,
    a.main {
      margin: 1.8rem auto 5rem auto;
    }
  }

  @media (max-width: 580px) {
    button {
      margin-top: 1.2rem;
    }
  }
`;

export const Section = styled.section`
  height: 400px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  @media (max-width: 910px) {
    & {
      flex-shrink: 0;
      align-content: center;
      height: 800px;
    }
  }
`;

export const Form = styled.form`

  text-align: end;

  & > div {
    height: 500px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin-bottom: 1rem;
  }

  @media (max-width: 910px) {
    & > div {
      flex-shrink: 0;
      align-content: center;
      height: 600px;
    }
    & {
      text-align: center;
    }
  }
`;


