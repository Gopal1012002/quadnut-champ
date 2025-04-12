import React, { useState } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemTypes = {
  FILE: 'file',
};

const FileDropzone = () => {
  const [files, setFiles] = useState([]);

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.FILE,
    drop: (item, monitor) => handleDrop(monitor),
  }));

  const handleDrop = (monitor) => {
    const droppedFiles = monitor.getItem().files;
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileInput = (e) => {
    const selectedFiles = e.target.files;
    setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
  };

  return (
    <div>
      <div
        ref={drop}
        style={{
          width: '100%',
          height: '200px',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        <p>Drag & Drop files here or click to upload</p>
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          style={{
            opacity: 0,
            position: 'absolute',
            width: '100%',
            height: '100%',
            cursor: 'pointer',
          }}
        />
      </div>
      <div>
        <h3>Uploaded Files</h3>
        <ul>
          {files.map((file, index) => (
            <li key={index}>{file.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const DragAndDropFile = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '20px' }}>
        <h1>Drag and Drop File Upload</h1>
        <FileDropzone />
      </div>
    </DndProvider>
  );
};

export default DragAndDropFile;
