import React, {useContext, useEffect, useState} from 'react';
import {Route,BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
//
import Layout from "./components/Layout";
import HeroSection from "./components/sections/HeroSection";
import {BlogSection} from "./components/sections/BlogSection";
import {Post} from './components/Post';
import {WorksSection} from "./components/sections/WorksSection";
import Project from "./components/Project";
import {ContactSection} from "./components/sections/ContactSection";
import {SignupSection} from "./components/sections/SignupSection";
import NewPost from "./components/sections/Blog/NewPost";
import Login from "./components/sections/Login";
// import useAuth from "./utils/AuthHook";
import {Auth1Context, Auth1ContextProvider} from "./context/Auth1Context";
import axios from "axios";

// let logoutTimer: string | number | NodeJS.Timeout | undefined;

function App() {
    let context= useContext(Auth1Context);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAxiosHeaders=(token:any)=> {
        if (token) {
             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
            /*if setting null does not remove `Authorization` header then try
              delete axios.defaults.headers.common['Authorization'];
            */
        }
    };

    useEffect(() => {
        setIsAuthenticated(context.checkAuth());
        isAuthenticated && setAxiosHeaders(context.token);
        console.log('token', context.token)
        console.log('isAuthenticated', isAuthenticated)
    }, [context]);


    const blog =
        <div className="blog-section container text-center w-max h-max">
            <BlogSection/>
        </div>
    const hero =
        <div className="hero-section container text-center w-max h-max">
            <HeroSection />
        </div>

    return (

        <Router>
            <Auth1ContextProvider>
            <Layout>
                <Routes>
                    <Route path={'/'} element={hero}/>
                    <Route path={'/blog'} element={blog}/>
                    <Route path={'/blog/:slug'} element={<Post/>}/>
                    <Route path={'/works'} element={<WorksSection />}/>
                    <Route path={'/works/projects/:slug'} element={<Project />} />
                    <Route path={'/contact-me'} element={<ContactSection />} />
                    <Route path={'/blog/signup'} element={isAuthenticated? hero:<SignupSection/>} />
                    <Route path={'/blog/login'} element={isAuthenticated? hero:<Login/>} />
                    <Route path={'/blog/create-post'} element={ isAuthenticated? <NewPost/>: blog}  />
                </Routes>
            </Layout>
            </Auth1ContextProvider>
        </Router>




    );
}


export default App;
