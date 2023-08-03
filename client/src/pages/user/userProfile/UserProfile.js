import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  ListPostProfile,
  UserProfile as Profile,
} from "../../../components/shared/userProfile";
import "./UserProfile.scss";

export function UserProfile() {
  const { state } = useLocation();

  const [reload, setReload] = useState(false);

  //función autorecarga
  const onReload = () => setReload((prevState) => !prevState);
  return (
    <div className="profile-page">
      <div className="profile-page__info">
        <Profile id_author={state} />
      </div>
      <div className="profile-page__posts">
        <ListPostProfile
          id_author={state}
          onReload={onReload}
          reload={reload}
        />
      </div>
    </div>
  );
}
