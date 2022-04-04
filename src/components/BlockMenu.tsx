import { FC } from "react";
import { BlockTypeOption } from "../types/block";
import { Theme } from "../types/theme";

export interface BlockMenuProps {
  theme: Theme;
  onSelect: (option: BlockTypeOption) => void;
}

const menu: BlockTypeOption[] = ["heading1", "heading2", "text"];

const BlockMenu: FC<BlockMenuProps> = ({ theme, onSelect }) => {
  return (
    <div id="block-menu" data-theme={theme}>
      {menu.map((item, i) => (
        <div
          key={i}
          data-theme={theme}
          className="block-menu-item"
          onClick={() => onSelect(item)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default BlockMenu;
