import React from 'react';
import './GraphEntry.css';

const GraphEntry = ({category, posCount, negCount}) => {
  return (
    <div className="graph-entry">
        <div className="row-label">
            {category}
        </div>
        <div className="posCount">
            Positive Comments: {posCount}
        </div>
        <div className="negCount">
            Negative Comments: {negCount}
        </div>
    </div>
  );
};

export default GraphEntry;
