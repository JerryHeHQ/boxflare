import React from 'react';
import './FeedbackEntry.css';

const FeedbackEntry = ({ label, text }) => {
  return (
    <div className='feedback-entry'>
      <div className='feedback-label'>
        {label}
      </div>
      <div className='feedback-text'>
        {text}
      </div>
    </div>
  );
};

export default FeedbackEntry;
