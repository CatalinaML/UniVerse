import React from 'react'
import {BrowserRouter} from "react-router-dom"
import {Routers} from './router'
import { AuthProvider } from './contexts/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routers/>
      </BrowserRouter>
    </AuthProvider>
  )
}

