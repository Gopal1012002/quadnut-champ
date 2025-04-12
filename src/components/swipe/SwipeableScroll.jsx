import React, { useRef } from "react";

const SwipeableScroll = ({ parentList, selectedCategory, setSelectedCategory, onHandleCategoryChange }) => {
  const containerRef = useRef(null);
  let isDragging = false;
  let startX, scrollLeft;

  const startDrag = (e) => {
    isDragging = true;
    startX = e.pageX || e.touches[0].pageX; // For touch devices
    scrollLeft = containerRef.current.scrollLeft;
  };

  const doDrag = (e) => {
    if (!isDragging) return;
    // e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 2; // Adjust sensitivity
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const stopDrag = () => {
    isDragging = false;
  };

  return (
    <div
      ref={containerRef}
      className="scrollable-container"
      style={{
        display: "flex",
        overflowX: "auto",
        gap: "20px",
        padding: "10px",
        cursor: "grab",
      }}
      onMouseDown={startDrag}
      onMouseMove={doDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchStart={startDrag}
      onTouchMove={doDrag}
      onTouchEnd={stopDrag}
    >
      {parentList?.map((parentCategory, index) => (
        <div
          key={index}
          className={`category-item ${selectedCategory === index ? "active" : ""}`}
          style={{
            minWidth: "200px",
            padding: "10px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: selectedCategory === index ? "#007bff" : "#f0f0f0",
            color: selectedCategory === index ? "#fff" : "#000",
            borderRadius: "8px",
            flex: "0 0 auto",
          }}
          onClick={() => {
            setSelectedCategory(index);
            onHandleCategoryChange(index, "parent");
          }}
        >
          {parentCategory?.parentCategoryName ?? parentCategory?.categoryName}
        </div>
      ))}
    </div>
  );
};

export default SwipeableScroll;
