import "./App.css";
import { Images } from "./components/Images/Images";

function App() {
  return (
    <div className="hero is-fullheight is-bold is-info">
      <div className="hero-body">
        <div className="container">
          <div className="header content">
            <h2 className="subtitle is-6">Project Practice</h2>
            <h1 className="title is-1">
              React Infinite Scroll Gallery Unsplash
            </h1>
          </div>
          <Images />
        </div>
      </div>
    </div>
  );
}

export default App;
