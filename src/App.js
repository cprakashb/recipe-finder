import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Recipes } from './components/Recipes/Recipes';
import { Header } from './components/Header/Header';
import { createContext, useState } from 'react';
import Footer from './components/Footer/Footer';
import { THEME } from './constants';

export const ThemeContext = createContext();

function App() {

  const [theme, setTheme] = useState(THEME.LIGHT)

  const changeTheme = (value) => {
    setTheme(value)
  }

  return (
    <div className={`${theme}`}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Recipes />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
