"use client";

import React from 'react';

const ExampleComponent = () => {
  const handleClick = () => {
    console.log('Button clicked');
  };

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );
};

export default ExampleComponent;
