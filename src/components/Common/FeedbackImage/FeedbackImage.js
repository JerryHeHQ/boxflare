import React, { useEffect, useRef, useState } from 'react';
import './FeedbackImage.css';
import { addFeedback } from '../../../backend/FirebaseAPICalls/FirebaseAPI';

const FeedbackImage = ({ 
  isSender,
  image, 
  feedback, 
  displayDotFeedback, 
  isVisible, 
  clickPosX, 
  clickPosY, 
  updateUserClickPosition,
  updateUserEndPosition }) => {
  const imageRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedDots, setSelectedDots] = useState([]);

  const calcDotPosition = (xPercent, yPercent) => {
    const imageWidth = imageRef.current.width;
    const imageHeight = imageRef.current.height;

    const rect = imageRef.current.getBoundingClientRect();
    const rectLeft = rect.left;
    const rectTop = rect.top;

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    const xAbs = xPercent * imageWidth + rectLeft + scrollX;
    const yAbs = yPercent * imageHeight + rectTop + scrollY;

    return [xAbs, yAbs]
  }

  // const calcDotPositions = () => {
  //   var tempDotPositions = [];
  //   console.log(feedback);
  //   for (let i = 0; i < feedback['numDots']; i++) {
  //     var currDot = feedback[`dot${i}`];
  //     tempDotPositions[i] = calcDotPosition(currDot['x'], currDot['y'])
  //   }
  //   console.log(tempDotPositions);
  //   setDotPositions(tempDotPositions);
  // }

  useEffect(() => {
    if (imageLoaded && feedback != null) {
      setSelectedDots([]);
    }
  }, [image, imageLoaded, feedback])

  useEffect(() => {
    setImageLoaded(false);
  }, [image])

  const [isSelecting, setIsSelecting] = useState(false);
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [selectionDims, setSelectionDims] = useState([0, 0]);

  const handleMouseMove = (event) => {
    if (isSelecting) {
      setMousePos({x: event.clientX, y: event.clientY});

      // console.log("handleMouseMove():", event.clientX, event.clientY);
    }
  }

  const handleClick = (event) => {
    if (isSender) {
      return
    }

    const imageWidth = imageRef.current.width;
    const imageHeight = imageRef.current.height;

    const rect = imageRef.current.getBoundingClientRect();

    const xRelativeToImage = event.clientX - rect.left;
    const yRelativeToImage = event.clientY - rect.top;

    const xPercent = (xRelativeToImage / imageWidth);
    const yPercent = (yRelativeToImage / imageHeight);

    if (isSelecting) {
      setMousePos({x: event.clientX, y: event.clientY});
      setIsSelecting(false)
      const dotPosition = calcDotPosition(clickPosX, clickPosY);
      setSelectionDims([event.clientX - dotPosition[0], event.clientY - dotPosition[1]]);
      updateUserEndPosition(xPercent, yPercent);
    } else {
      setMousePos({x: event.clientX, y: event.clientY});
      setIsSelecting(true);
      updateUserClickPosition(xPercent, yPercent);
      setSelectionDims([0, 0]);
    }

    displayDotFeedback(null);
    // console.log("handleClick():", event.clientX, event.clientY)
  };

  const handleDotClick = (dotIndex) => {
    highlightDots([dotIndex]);
    updateUserClickPosition(null, null);
    displayDotFeedback(dotIndex);
  }

  const highlightDots = (dotIndices) => {
    setSelectedDots(dotIndices)
  }

  const calculateDotStyle = (dotIndex, isUserAdded) => {
    var dotPosition = calcDotPosition(clickPosX, clickPosY);
    var endPosition;
    
    if (!isUserAdded) {
      const currDot = feedback[`dot${dotIndex}`];
      dotPosition = calcDotPosition(currDot['x'], currDot['y']);
      endPosition = calcDotPosition(currDot['endX'], currDot['endY']);
    }
    // console.log(dotPosition);

    var background = 'rgba(191, 141, 255, 0.33)'
    if (!isUserAdded) {
      background = feedback[`dot${dotIndex}`]['sentiment'] ? 'rgba(0,255,0,0.33)' : 'rgba(255,0,0,0.33)';
    }

    var borderColor = 'rgba(191, 141, 255, 1)';
    if (!isUserAdded) {
      borderColor = `rgba(${feedback[`dot${dotIndex}`]['sentiment'] ? '0,255,0' : '255,0,0'},${selectedDots.includes(dotIndex) ? '1' : '0.33'})`
    }

    var width = '0px';
    var height = '0px';
    if (isUserAdded) {
      if (isSelecting) {
        width = `${mousePos['x']-dotPosition[0]}px`
        height = `${mousePos['y']-dotPosition[1]}px`
      } else {
        width = `${selectionDims[0]}px`
        height = `${selectionDims[1]}px`
      }
    } else {
      width = `${endPosition[0]-dotPosition[0]}px`
      height = `${endPosition[1]-dotPosition[1]}px`
    }

    return {
      position: 'absolute',
      left: `${dotPosition[0]}px`,
      top: `${dotPosition[1]}px`,
      // transform: 'translate(-50%, -50%)',
      width: width,
      height: height,
      background: background,
      border: `1px solid ${borderColor}`,
      // borderRadius: '50%',
      zIndex: 1
    };
  };
  return (
    <div>
      <img ref={imageRef} onClick={handleClick} onMouseMove={handleMouseMove} className='image' src={image} onLoad={() => setImageLoaded(true)} ></img>
      {imageLoaded && feedback != null && isVisible
      ?
      Array.from({ length: feedback['numDots']}, (_, index) => (
        <div style={calculateDotStyle(index, false)} onClick={() => handleDotClick(index)} key={index}/>
      ))
      :
      null}
      {clickPosX != null && clickPosY != null
      ?
      <div style={calculateDotStyle(null, true)} onClick={() => {updateUserClickPosition(null, null);}}/>
      :
      null}
    </div>
  );
};

export default FeedbackImage;
