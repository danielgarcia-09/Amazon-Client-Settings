import styled from "@emotion/styled";
import React from "react";

type Props = {
    children: React.ReactNode
}

const MainContainer = styled.div`
    padding: 1.5rem;
    background-color: #FEF5ED;
`;

const Layout = ({children} : Props) => {
    return (
        <MainContainer>
            {children}
        </MainContainer>
    )
}

export default Layout;