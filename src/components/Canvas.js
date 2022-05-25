const Canvas = ({canvasRef, canvasSizeX, canvasSizeY, ...props}) => {

  return (
    <div className="canvas-container">
      <canvas
        id="canvas"
        className="source-image"
        ref={canvasRef}
        width={canvasSizeX}
        height={canvasSizeY}
        {...props}
      />
    </div>
  );
};

export default Canvas;