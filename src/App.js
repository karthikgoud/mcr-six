import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import RestaurantDetail from "./components/RestaurantDetail/RestaurantDetail";

function App() {
  return (
    <div className="App-header">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:resId" element={<RestaurantDetail />} />
      </Routes>
    </div>
  );
}

export default App;
