import React, { useState } from 'react';

const Burger = ({ handleShow }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prev => !prev);
    handleShow(); // trigger the off-canvas or menu action
  };

  return (
    <div className={`burger ${isActive ? 'active' : ''}`} onClick={handleClick}>
      <div className="strip burger-strip">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Burger;
