import React from 'react';
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
import useAuth from "./utils/AuthHook";

// let logoutTimer: string | number | NodeJS.Timeout | undefined;

function App() {
    const {isAuthenticated}:any= useAuth();
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

            <Layout>
                <Routes>
                    <Route path={'/'} element={hero}/>
                    <Route path={'/blog'} element={blog}/>
                    <Route path={'/blog/:slug'} element={<Post/>}/>
                    <Route path={'/works'} element={<WorksSection />}/>
                    <Route path={'/works/projects/:slug'} element={<Project />} />
                    <Route path={'/contact-me'} element={<ContactSection />} />
                    <Route path={'/blog/signup'} element={<SignupSection/>} />
                    <Route path={'/blog/login'} element={isAuthenticated?<h1>'Logged In'</h1>:<Login/>} />
                    <Route path={'/blog/create-post'} element={isAuthenticated? <NewPost/>: <Login/>}  />
                </Routes>
            </Layout>


        </Router>




    );
}


export default App;
