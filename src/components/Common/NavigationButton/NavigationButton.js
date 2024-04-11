import React from 'react';
import './NavigationButton.css'; // Import CSS file for styling
import chevronLeftIcon from '../../../images/chevron-left-solid.svg';
import chevronRightIcon from '../../../images/chevron-right-solid.svg';


const NavigationButton = ({backVisibility, nextVisibility, backText, nextText, backFunction, nextFunction }) => {
  return (
    <div>
      <div className='background' />
      {backVisibility
      ?
      <button className='back-button nav-button' onClick={() => backFunction()}>
        <img src={chevronLeftIcon} alt="Back" />
        <div className='button-text'>
          {backText}
        </div>
      </button>
      :
      null}
      {nextVisibility
      ?
      <button className='next-button nav-button' onClick={() => nextFunction()}>
        <div className='button-text'>
          {nextText}
        </div>
        <img src={chevronRightIcon} alt="Next" />
      </button>
      :
      null}
    </div>
  );
};

export default NavigationButton;
