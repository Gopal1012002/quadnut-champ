import { useEffect } from "react";

const PreventF11 = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "F11") {
        event.preventDefault(); // Prevent default fullscreen behavior
        alert("F11 is disabled on this page!");
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null; // This component does not render anything
};

export default PreventF11;
