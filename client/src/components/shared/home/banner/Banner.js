import React from 'react'
import {Container} from "semantic-ui-react"
import "./Banner.scss"

export function Banner() {
  return (
    <div className='banner'>
      <Container>
        <h1>Lee, crea y comparte!</h1>
        <h2>Bienvenido/a a nuestra comunidad en línea, un espacio abierto y 
          colaborativo donde puedes compartir tus historias, experiencias 
          o cualquier tipo de información. 
          <br/>
          <br/>
          Únete a nosotros y comparte tu voz con el mundo
        </h2>

      </Container>
      
      <div className='banner__dark'>

      </div>
    </div>
  )
}
