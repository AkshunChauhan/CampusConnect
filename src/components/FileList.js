import React from "react";

const FileList = ({ files }) => {
  return (
    <div>
      <h2>Shared Files:</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
