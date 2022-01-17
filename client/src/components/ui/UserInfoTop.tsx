import styled from "@emotion/styled";
import { IUser } from "../../types";

const UserTopBlock = styled.div`
  display: flex;
  align-items: center;
  max-width: 500px;

  h1 {
    color: #636e63;
  }
`;
const Arrow = styled.div`
  font-size: 3rem;
  color: #99a799;
`;

const UserIcon = styled.div`
  padding: 1.5rem 1.8rem;
  background-color: #e1e1e1;
  border: 1px solid #d3e4cd;
  border-radius: 100%;
  max-width: 150px;
  margin: 0 1.2rem;
`;

const UserTop = ({ name }: {name: string | undefined}) => {
  return (
    <UserTopBlock>
      <Arrow>&#8592;</Arrow>
      <UserIcon>a</UserIcon>
      <h1>{name}</h1>
    </UserTopBlock>
  );
};

export default UserTop;
