import { Fragment } from 'react'

const TextBox = (props) => {
  const handleKeyPress = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }

  return (
    <Fragment>
      <label htmlFor={props.className} className="labelOptions">{props.name}</label>
      <input
        id={props.className}
        type="text"
        className={props.className}
        value={props.value}
        onChange={props.handleChange}
        onKeyPress={handleKeyPress}
      />
    </Fragment>
    
  );
};

export default TextBox;