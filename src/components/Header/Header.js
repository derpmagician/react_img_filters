import TextBox from "./TextBox";

const Header = (props) => {
  const handleChangeWidth = (e) => {
    const newSize = e.target.value;
    props.setCanvasSizeX(newSize);
  }
  const handleChangeHeight = (e) => {
    const newSize = e.target.value;
    props.setCanvasSizeY(newSize);
  }
  const handleOriginChange = (event) => {
    props.setSource(event.target.value);
  }

  return (
    <div className="header">
      <button className="download-btn" onClick={props.onHandleExport}>Download</button>
      <TextBox
        name="Width"
        className="txtnumber txtnumber__width"
        value={props.canvasSizeX}
        canvasSize={props.canvasSizeX}
        handleChange={handleChangeWidth}
      />
      <TextBox
        name="Height"
        className="txtnumber txtnumber__height"
        value={props.canvasSizeY}
        canvasSize={props.canvasSizeY}
        handleChange={handleChangeHeight}
      />
      <TextBox
        name="Source"
        className="txtsource"
        value={props.source}
        handleChange={handleOriginChange}
      />

    </div>
  );
};

export default Header;