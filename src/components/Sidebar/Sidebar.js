import SidebarItem from './SidebarItem';

const Sidebar = ({options, selectedOptionIndex, onOptionHandler}) => {
  return (
    <aside className="sidebar">
      {
        options.map((option, index) =>
          <SidebarItem
            key={index}
            name={option.name}
            active={index === selectedOptionIndex}
            handleClick={() => onOptionHandler(index)}
          />
        )
      }
    </aside>
  );

};

export default Sidebar;