import React, { useState } from "react";

import {
  Profile as ProfileComponent,
  ListBloggerPosts,
} from "../../../components";

import "./Profile.scss";

export function Profile() {
  const [reload, setReload] = useState(false);

  //función autorecarga
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <div className="profile-page">
      <div className="profile-page__profile">
        <ProfileComponent onReload={onReload} reload={reload} />
      </div>

      <div className="profile-page__posts">
        <ListBloggerPosts onReload={onReload} reload={reload} />
      </div>
    </div>
  );
}
