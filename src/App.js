import { useState, useRef, useEffect } from 'react';

import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

import Header from './components/Header/Header';
import Canvas from './components/Canvas';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

const DEFAULT_OPTIONS = [
  {
    name: 'Brightness',
    property: 'brightness',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Contrast',
    property: 'contrast',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Saturation',
    property: 'saturate',
    value: 100,
    range: {
      min: 0,
      max: 200
    },
    unit: '%'
  },
  {
    name: 'Grayscale',
    property: 'grayscale',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Sepia',
    property: 'sepia',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Hue Rotate',
    property: 'hue-rotate',
    value: 0,
    range: {
      min: 0,
      max: 360
    },
    unit: 'deg'
  },
  {
    name: 'Invert',
    property: 'invert',
    value: 0,
    range: {
      min: 0,
      max: 100
    },
    unit: '%'
  },
  {
    name: 'Blur',
    property: 'blur',
    value: 0,
    range: {
      min: 0,
      max: 20
    },
    unit: 'px'
  }
]

function App() {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const selectedOption = options[selectedOptionIndex];

  const [source, setSource] = useState("https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");

  const [canvasSizeX, setCanvasSizeX] = useState('600');
  const [canvasSizeY, setCanvasSizeY] = useState('200');

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.crossOrigin = "Anonymous"

    image.src = source;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvasSizeX, canvasSizeY);
    };

  }, [source, canvasSizeX, canvasSizeY])

  const handleExport = (props) => {
    const canvas = canvasRef.current;

    var canvasPromise  = html2canvas(canvas, {
      allowTaint: true,
      foreignObjectRendering: true,
    });
    canvasPromise.then(function(canvas) {

      console.log(canvas);
      saveAs(canvas.toDataURL(),'new_image.png')
      const data = canvas.toDataURL('image/png');
      try {
        localStorage.setItem("saved-image", data);
      }
      catch(err) {
        console.log("Error: " + err);
      }
    });
  }

  const  handleSliderChange = ({ target }) => {
    // console.log(target);
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: target.value }
      })
    })
  }

  const handleSliderReset = () => {

    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option

        return { ...option, value: DEFAULT_OPTIONS[selectedOptionIndex].value }
      })
    })

  }

  const getImageStyle = () => {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })

    return { filter: filters.join(' ') }
  }

  return (
    <main>
      <Header
        source={source}
        canvasSizeX={canvasSizeX}
        canvasSizeY={canvasSizeY}
        setCanvasSizeX={setCanvasSizeX}
        setCanvasSizeY={setCanvasSizeY}
        setSource={setSource}
        onHandleExport={handleExport}
      />
      <Canvas
        src={source}
        canvasSizeX={canvasSizeX}
        canvasSizeY={canvasSizeY}
        style={getImageStyle()}
        canvasRef={canvasRef}
      />
      <Sidebar
        options={DEFAULT_OPTIONS}
        selectedOptionIndex={selectedOptionIndex}
        onOptionHandler={setSelectedOptionIndex}

      />
      <Slider
        property={selectedOption.property}
        min={selectedOption.range.min}
        max={selectedOption.range.max}
        value={selectedOption.value}
        onHandleChange={handleSliderChange}
        onResetHandler={handleSliderReset}
      />
    </main>
  );
}

export default App;
