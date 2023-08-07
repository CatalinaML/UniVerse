import React, { useState } from "react";
import { Post as PostComponent } from "../../../components";

export function Post() {
  const [reload, setReload] = useState(false);

  //funcion para recargar pagina automaticamente
  const onReload = () => setReload((prevState) => !prevState);

  return (
    <div>
      <PostComponent onReload={onReload} reload={reload} />
    </div>
  );
}
