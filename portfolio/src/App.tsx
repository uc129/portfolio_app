import React, {useContext, useEffect, useState} from 'react';
import {Route,BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
//
import HeroSection from "./components/sections/HeroSection";
import {WorksSection} from "./components/sections/WorksSection";
import {ContactSection} from "./components/sections/ContactSection";
import {SignupSection} from "./components/sections/SignupSection";
import NewPost from "./components/sections/blog/NewPost";
import LoginSection from "./components/sections/LoginSection";
import {Auth1Context, Auth1ContextProvider} from "./context/Auth1Context";
import axios from "axios";
import UpdateProfile from "./components/sections/profile/UpdateProfile";
import Profile from "./components/sections/profile/Profile";
import {BlogSection} from "./components/sections/blog/BlogSection";
import {Post} from "./components/sections/blog/Post";
import ManagePosts from "./components/sections/blog/ManagePosts";
import EditPost from "./components/sections/blog/EditPost";
import Layout from "./components/Layout";
import Project from "./components/Project";
import BooksLibrary from "./components/sections/interests/Books Section/BooksLibrary";
import MusicLibrary from "./components/sections/interests/Music Section/MusicLibrary";



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
    }, [context, isAuthenticated]);


    const blog =
        <div className="blog-section  text-center ">
            <BlogSection/>
        </div>
    const hero =
        <div className="hero-section  text-center ">
            <HeroSection />
        </div>

    return (

        <Router>
            <Auth1ContextProvider>
            <Layout>
                <Routes>
                    {/**/}
                    {/*App Routes*/}
                    <Route path={'/'} element={hero}/>
                    <Route path={'/blog'} element={blog}/>
                    <Route path={'/blog/:slug'} element={<Post/>}/>
                    <Route path={'/works'} element={<WorksSection />}/>
                    <Route path={'/works/projects/:slug'} element={<Project />} />
                    <Route path={'/contact-me'} element={<ContactSection />} />
                    {/**/}
                    {/*Blog Routes*/}
                    <Route path={'/blog/signup'} element={isAuthenticated? hero:<SignupSection/>} />
                    <Route path={'/blog/login'} element={isAuthenticated? hero:<LoginSection/>} />
                    <Route path={'/blog/create-post'} element={ isAuthenticated? <NewPost/>: blog}  />
                    <Route path={'/blog/manage-posts'} element={isAuthenticated? <ManagePosts/>: blog} />
                    <Route path={'/blog/post/edit/:post_id'} element={isAuthenticated? <EditPost/>: blog} />
                    {/**/}
                    {/*Interests Routes*/}

                    <Route path={'/interests/reading/library'} element={<BooksLibrary/>}/>
                    <Route path={'/interests/music/library'} element={<MusicLibrary/>}/>



                    {/**/}
                    {/*Auth Routes*/}
                    <Route path={'/profile/'} element={ isAuthenticated? <Profile/>: blog}  />
                    <Route path={'/profile/update-profile'} element={ isAuthenticated? <UpdateProfile/>: blog}  />
                     {/**/}

                </Routes>
            </Layout>
            </Auth1ContextProvider>
        </Router>




    );
}


export default App;
