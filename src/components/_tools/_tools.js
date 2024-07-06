import React from 'react';

export const PButton = ({ changer, modifier, deconnexion }) => {
  const handleClick = () => {
    if (changer) {
      changer();
    } else if (modifier) {
      modifier();
    } else if (deconnexion) {
      deconnexion();
    }
  };

  return (
    <button onClick={handleClick} className="pbutton">
      {changer ? 'Changer' : modifier ? 'Modifier' : deconnexion ? 'Déconnexion' : 'Button'}
    </button>
  );
};
