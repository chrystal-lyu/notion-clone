import { FC } from "react";

export type BlockType = "heading1" | "heading2" | "text";

export interface BlockMenuProps {
  onSelect: (payload: BlockType) => void;
}

const menu: BlockType[] = ["heading1", "heading2", "text"];

const BlockMenu: FC<BlockMenuProps> = ({ onSelect }) => {
  return (
    <div id="block-menu">
      {menu.map((item, i) => (
        <div
          key={i}
          onClick={() => onSelect(item)}
          className="block-menu-item"
        >
          {item}
        </div>
      ))}
    </div>
  );
};

export default BlockMenu;
