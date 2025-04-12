import React from "react";
import Select from "react-select";

// Modify RSelect to accept both props and ref
const RSelect = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div className="form-control-select">
      <Select
        ref={ref} // Pass the ref to the Select component
        className={`react-select-container ${className ? className : ""}`}
        classNamePrefix="react-select"
        {...props}
      />
    </div>
  );
});

export default RSelect;
