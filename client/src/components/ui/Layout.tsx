import styled from "@emotion/styled";
import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "./Navbar";
type Props = {
  children: React.ReactNode;
};

const MainContainer = styled.div`
  padding: 1.5rem;
`;

const Layout = ({ children }: Props) => {
  return (
    <Fragment>
      <Navbar/>
      <MainContainer>{children}</MainContainer>;
    </Fragment>
  )
};

export default Layout;
