import React from "react";
import { Button, Image } from "semantic-ui-react";
import { map } from "lodash";

import { socialData } from "../../../../utils";
import { image } from "../../../../assets";

import "./Footer.scss";

export function Footer() {
  return (
    <div className="footer">
      <div className="footer__left">
        <Image size="small" src={image.logo} />

        <div className="social">
          {map(socialData, (social) => (
            <Button
              key={social.type}
              as="a"
              target="_blank"
              href={social.link}
              color={social.type == "github" ? "grey" : social.type}
              icon={social.type}
            />
          ))}
        </div>

        <div className="footer__left-rights">
          <span>© 2023 | Catalina Liste | Web developer</span>
        </div>
      </div>

      <div className="footer__right">
        <span>
          UniVerse es un lugar donde las voces individuales se unen para formar
          una colección diversa y fascinante de contenido generado por la
          comunidad.
          <br />
          Te invitamos a escribir sobre cualquier tema que te apasione: desde
          viajes y aventuras, hasta consejos prácticos, reflexiones personales o
          cualquier otra cosa que desees. ¡Te invitamos a unirte y compartir tus
          palabras con nosotros!
          <br />
          Tu voz importa y esperamos con ansias tus aportes a nuestra comunidad
          en crecimiento.
        </span>
      </div>
    </div>
  );
}
