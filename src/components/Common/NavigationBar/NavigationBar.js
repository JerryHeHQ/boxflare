import React from 'react';
import './NavigationBar.css'; // Import CSS file for styling
import checkIcon from '../../../images/check-solid.svg'; // Import SVG file

const ProgressNavigation = ({ steps, currentStep, setCurrentStep }) => {
  // Ensure steps is defined before mapping
  if (!steps || steps.length === 0) return null;

  return (
    <div>
      <div className="progress-overlay"></div> {/* White overlay */}
      <div className="progress-navigation">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && <div className={`line ${index <= currentStep ? 'active-line' : ''}`}></div>}
            <div className={`step ${index <= currentStep ? 'active' : ''}`}>
              {currentStep > index ? (
                <img src={checkIcon} alt="Check mark" style={{ width: '25px', height: '25px' }} />
              ) : null}
              <div className="step-content">
                <div className="step-text">{step}</div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressNavigation;
