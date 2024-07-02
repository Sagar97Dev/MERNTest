import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';
import CreateArticle from './components/CreateArticle';


const App = () => {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/create" element={<CreateArticle />} />
        </Routes>
    </>
  );
};
  
export default App;
