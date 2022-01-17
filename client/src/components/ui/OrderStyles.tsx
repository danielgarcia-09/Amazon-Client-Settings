import styled from "@emotion/styled";

const OrdersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.2rem;

  th {
    text-align: left;
    padding-bottom: 1rem;
    color: #636e63;
  }

  tbody > tr {
    border-top: 1px solid grey;
  }

  tr > td {
    padding: 2rem 0;
  }

  @media (max-width: 500px) {
    & {
      width: 90%;
      font-size: 0.8rem;
    }
  }
`;

export default OrdersTable;