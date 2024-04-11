import React, {useState} from 'react'
import './ResultsScreen.css';
import GraphEntry from '../../Common/GraphEntry/GraphEntry';

function ResultsScreen() {
  {/* Temporary data: {CategoryName: [PosCount, NegCount] */}
  const menuItems = {
    'Contrast':[4,1], 
    'Typography':[2,2], 
    'Color':[0,2],
    'Balance':[2,0],
    'Layout':[1,1],
    'Saturation':[1,0]
  }
  const categories = ['Contrast', 'Typography', 'Color', 'Balance', 'Layout', 'Saturation'];

  return (
    <div className="resultsScreen">
      <div className="resultsContent">
        <div className="dot-display">
          **DISPLAY IMAGE**
        </div>

        <div className="graph">
          {categories.map((item) => (
            <GraphEntry category={item} posCount={menuItems[item][0]} negCount={menuItems[item][1]}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResultsScreen;