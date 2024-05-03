import React from 'react';

const TextureDropDown = ({ options }) => {
  return (
    <select>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          <img src={option.image} alt={option.label} /> {option.label}
        </option>
      ))}
    </select>
  );
};

export default TextureDropDown;
