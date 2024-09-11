import { useState } from "react";
import "./App.css";
import Search from "./components/search";
import Table from "./components/table";

function App() {
  const [searchText, setSearchText] = useState('');

  return (
    <div className="layout-container">
      <Search searchText={searchText} handleSearchTextChange={(text) => setSearchText(text)} />
      < Table searchText={searchText} />
    </div>
  )
}

export default App;
