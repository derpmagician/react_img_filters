const Slider = ({property, min, max, value, onHandleChange, onResetHandler}) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        className="slider-bar"
        min={min}
        max={max}
        value={value}
        onChange={onHandleChange}
      />
      <div className="value-slider">{value}</div>
      <button className="reset-btn" onClick={onResetHandler}>Reset</button>
      
    </div>
  );
};

export default Slider;