import React from 'react';

const TextBoxOverlay = ({ children, onOverlayClose }) => (
  <div className="textbox__overlay">
    <div className="textbox__overlay-content">{children}</div>
    <button
      type="button"
      className="pure-button pure-button-primary textbox__overlay-button"
      onClick={onOverlayClose}
    >
      close
    </button>
  </div>
);
export default TextBoxOverlay;
