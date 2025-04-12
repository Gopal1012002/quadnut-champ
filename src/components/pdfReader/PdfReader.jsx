import React, { useState } from "react";
import "../../assets/css/video-player.css";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { FaSquareCaretLeft, FaSquareCaretRight } from "react-icons/fa6";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.mjs`;

const PdfReader = ({ src, playNextVideo, playPrevVideo }) => {
  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div
      className="container-fluid height-pdf-viewer"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div
        className="pdf-viewer-container height-pdf-viewer"
        style={{
          height: "100vh", // Adjust as needed
          overflowY: "scroll",
          border: "1px solid #ccc", // Optional: for visual clarity
          //   textAlign:"center"
        }}
      >
        {/* <div className="left-play-button">
          <GrFormPrevious size={35} onClick={playPrevVideo} />
        </div>
        <div className="right-play-button">
          <GrFormNext size={35} onClick={playNextVideo} />
        </div> */}
        <Document file={src} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Page key={index} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default PdfReader;
