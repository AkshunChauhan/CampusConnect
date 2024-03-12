import React from "react";
import "./App.css";
import FileUpload from "./components/FileUpload";
import FileList from "./components/FileList";
import filesData from "./data/filesData";

function App() {
  return (
    <div className="App">
      <h1>File Sharing Feature</h1>
      <FileUpload />
      <FileList files={filesData} />
    </div>
  );
}

export default App;
