import React from 'react'
import { Container } from 'semantic-ui-react';
import {ListPost , Banner} from "../../../components"
import "./Home.scss"

export function Home() {
  return (
    <div className='home'>
      <Banner/>
      <ListPost/>
    </div>
  )
}
