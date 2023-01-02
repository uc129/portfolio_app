import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Layout from "./components/Layout";
import HeroSection from "./components/sections/HeroSection";
import {BlogSection} from "./components/sections/BlogSection";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {Post} from './components/Post';
import {WorksSection} from "./components/sections/WorksSection";
import Project from "./components/Project";
import {ContactSection} from "./components/sections/ContactSection";
import {SignupSection} from "./components/sections/SignupSection";
import NewPost from "./components/sections/Blog/NewPost";


function App() {

    const [tools, setTools] = React.useState([]);
    const getToolbarOptions = (options:any) => {
        console.log(options)
        setTools(options)
    }

    const blog =
        <div className="blog-section container text-center w-max h-max">
            <BlogSection options={getToolbarOptions}/>
        </div>
    const hero =
        <div className="hero-section container text-center w-max h-max">
            <HeroSection options={getToolbarOptions} />
        </div>

    return (
        <Router>
            <Layout tools={tools}>
                <Routes>
                    <Route path={'/'} element={hero}/>
                    <Route path={'/blog'} element={blog}/>
                    <Route path={'/blog/:slug'} element={<Post/>}/>
                    <Route path={'/works'} element={<WorksSection options={getToolbarOptions} />}/>
                    <Route path={'/works/projects/:slug'} element={<Project options={getToolbarOptions} />} />
                    <Route path={'/contact-me'} element={<ContactSection options={getToolbarOptions} />} />
                    <Route path={'/blog/signup'} element={<SignupSection/>} />
                    <Route path={'/blog/create-post'} element={<NewPost/>}/>
                </Routes>

            </Layout>

        </Router>


    );
}


export default App;
