import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Recipes from './components/Recipes/Recipes';
import { createContext, useState } from 'react';
import { THEME } from './constants';

import RecipeStore from "./store/RecipeStore";

export const ThemeContext = createContext();

function App() {

  const [theme, setTheme] = useState(THEME.LIGHT)

  const store = new RecipeStore();

  const changeTheme = (value) => {
    setTheme(value)
  }

  return (
    <div className={`${theme}`}>
      <ThemeContext.Provider value={{ theme, changeTheme }}>
        <Header store={store} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Recipes store={store} />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
