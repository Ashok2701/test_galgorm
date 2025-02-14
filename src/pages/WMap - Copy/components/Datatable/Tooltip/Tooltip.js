import React from "react";
import "./tooltip.css";

export const Tooltip = ({ pageX, pageY, children }) => {
  const styles = {
    left: `${pageX}px`,
    top: `${pageY}px`,
  };

  return (
    <div className="tmr-tooltip" style={styles}>
      {children}
    </div>
  );
};