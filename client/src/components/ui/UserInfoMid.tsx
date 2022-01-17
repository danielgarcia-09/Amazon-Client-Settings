import React from "react";
import { IUser } from "../../types";
import {MainSection, Section} from "./Sections";
import InfoInput from "./InfoInput";
import { Link } from "react-router-dom";

type Props = {
  user: IUser;
  children: React.ReactNode;
};

const UserMid = ({ user, children }: Props) => {
  return (
    <MainSection>
      <h1>Info Account</h1>
      <Section>
        {Object.entries(user).map((p) => (
          <InfoInput key={Math.random()} name={p[0]} value={p[1]} />
        ))}
      </Section>
      
        <Link className="main" to={`/edit_user/${user.id}`}>
          Edit account
        </Link>

      <hr />
      {children}
    </MainSection>
  );
};

export default UserMid;
