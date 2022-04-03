import { FC } from "react";
import { BlockTypeOption } from "../types/block";

export interface BlockMenuProps {
  onSelect: (option: BlockTypeOption) => void;
}

const menu: BlockTypeOption[] = ["heading1", "text"];

const BlockMenu: FC<BlockMenuProps> = ({ onSelect }) => {
  return (
    <div id="block-menu">
      {menu.map((item, i) => (
        <div key={i} onClick={() => onSelect(item)} className="block-menu-item">
          {item}
        </div>
      ))}
    </div>
  );
};

export default BlockMenu;
