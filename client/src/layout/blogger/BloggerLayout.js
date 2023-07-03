import React from 'react'
import "./BloggerLayout.scss"
import { Header, Footer } from '../../components';

export function BloggerLayout(props) {
    const {children} = props;

  return (
    <div className='blogger-layout'>
      <div className='blogger-layout__header'>
        <Header/>
      </div>
      {children}
      <div className='blogger-layout__footer'>
        <Footer/>
      </div>
    </div>
  )
}
