import styled from "@emotion/styled";

const Err = styled.span`
  margin: 0.6rem 0;
  color: red;
`;

type Props = {
  active: boolean;
  message: string;
};
const InputError = ({ active, message }: Props) => {
  if (!active) return null;

  return (
    <Err>{message}</Err>
  )
};

export default InputError;
