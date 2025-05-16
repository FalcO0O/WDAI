import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import komponentów
import Home from './components/Home';
import Blog from './components/Blog';
import AddArticle from './components/AddArticle';
import Article from './components/Article';
import Navbar from './components/Navbar'; // opcjonalny navbar, aby nawigacja była wygodniejsza

function App() {
    return (
        <Router>
            <div>
                {/* Możesz umieścić tutaj wspólny nagłówek, np. Navbar */}
                <Navbar />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blog" element={<Blog />} />
                    {/* :id będzie parametrem dynamicznym dla id artykułu */}
                    <Route path="/article/:id" element={<Article />} />
                    <Route path="/dodaj" element={<AddArticle />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
