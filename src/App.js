import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "./style.css";

//Component
import Nav from "./Component/Nav";

//pages
import MainPage from "./Page/MainPage/MainPage";
import ItemPage from "./Page/ItemPage/ItemPage";
import DataPage from "./Page/DataPage/DataPage";
import FavoritePage from "./Page/FavoritePage/FavoritePage";

function App() {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <div className="App">
      <div className={`${sticky ? "sticky" : ""}`}>
        <Nav />
      </div>
      <div className="container">
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/itemPage" Component={ItemPage} />
          <Route path="/DataPage/:name" Component={DataPage} />
          <Route path="/favorite" Component={FavoritePage} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
