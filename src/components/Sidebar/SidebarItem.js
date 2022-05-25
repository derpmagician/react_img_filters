const SidebarItem = ({ name, active, handleClick }) => {
  // console.log(props.options[0].name)
  return (
    <button
      className={`sidebar-item ${active ? 'active' : ''}`}
      onClick={handleClick}
    >
      {name}
    </button>
    
  )
}

export default SidebarItem;