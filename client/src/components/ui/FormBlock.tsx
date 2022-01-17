import styled from "@emotion/styled";

const FormBlock = styled.div`
  padding: 1rem 2rem 2.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 450px;
  flex: 0;
  flex-wrap: wrap;
  text-align: left;

  input {
    padding: 1rem;
    width: 80%;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #adc2a9;
  }

  label {
    width: 100%;
    font-size: 1.2rem;
    font-weight: bold;
    color: #636e63;
    margin-bottom: .6rem;
  }

  @media ( max-width: 850px ) {
    input {
      width: 100%;
    }
  }

  @media (max-width: 580px) {
    label {
      margin-bottom: 0.5rem;
    }
  }
`;

export default FormBlock;