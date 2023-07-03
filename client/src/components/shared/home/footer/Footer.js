import React from 'react'
import {Button, Image} from "semantic-ui-react"
import { map } from 'lodash'
import { socialData } from '../../../../utils'
import { image } from '../../../../assets'
import "./Footer.scss"

export function Footer() {
  return (
    <div className='footer'>

      <div className='footer__top'>

        <div className='footer__top-left'>
            <Image size='small' src={image.logo}/>
        </div>


        <div className='footer__top-right'>
        <div>
            {map(socialData, (social) => (
              <Button
                key={social.type}
                as="a"
                target="_blank"
                href={social.link}
                color={social.type}
                icon={social.type}
              />
          ))}
        </div>
        <div className='footer__top-right-rights'>
          <span>© 2023 | Catalina Liste | Web developer</span>
        </div>
        </div>
      </div>
      

      <div className='footer__bottom'>

        <span>
            UniVerse es un lugar donde las voces individuales se unen para formar una colección diversa y fascinante de contenido generado por la comunidad.
            <br/>
            Aquí en nuestra plataforma, te invitamos a escribir sobre cualquier tema que te apasione: desde viajes y aventuras, hasta consejos prácticos, reflexiones personales o cualquier otra cosa que desees.
        </span>

        <span>
            Valoramos la diversidad y el intercambio de ideas, y creemos que cada persona tiene algo único que aportar. 
            <br/>
            ¡Te invitamos a unirte y compartir tus palabras con nosotros!
            <br/>
            Tu voz importa y esperamos con ansias tus aportes a nuestra comunidad en crecimiento.
        </span>
          
          <span>
            Como creadora de UniVerse, mi objetivo es proporcionar una plataforma que fomente la creatividad, la expresión personal y el aprendizaje mutuo. 
            <br/>
            Estoy emocionada de ver qué tipo de contenido valioso y sorprendente se compartirá aquí.
            </span>
      </div>
      
    </div>
  )
}
