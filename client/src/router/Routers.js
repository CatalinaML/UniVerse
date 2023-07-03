import React from 'react'
import {Route, Routes} from "react-router-dom"
import {Home, Post, Auth, HomeBlogger, Profile} from "../pages"
import {UserLayout, BloggerLayout} from "../layout"

import { useAuth } from '../hooks'

export function Routers() {

    const {user} = useAuth();

    const loadLayout = (Layout, Page) => {
        return(
            <Layout>
                <Page/>
            </Layout>
        );
    };

  return (
    <Routes>
        {!user ? (
            <>
                <Route path='/' element={loadLayout(UserLayout, Home)}></Route>
                <Route path='/post/:id' element={loadLayout(UserLayout, Post)}></Route>
                <Route path='/blogger/*' element={loadLayout(UserLayout, Auth)}></Route>
            </>
        ) : 
        (
            <>
            {["/", "/blogger", "/blogger/home"].map((path) => (
                <Route key={path} path={path} element={loadLayout(BloggerLayout, HomeBlogger)}></Route>
            ))}
                <Route path='/blogger/profile' element={loadLayout(BloggerLayout, Profile)}></Route>
                <Route path='/post/:id' element={loadLayout(BloggerLayout, Post)}></Route>
            </>
        )}
        
    </Routes>
  )
}