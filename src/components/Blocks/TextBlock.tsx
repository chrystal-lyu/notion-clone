import { FC, useRef, KeyboardEvent, useState, FormEvent } from "react";
import { setCaretToEnd } from "../../utils/setCaretToEnd";
import BlockMenu, { BlockTypeOption } from "../BlockMenu";

export interface TextBlockProps {
  id: string;
  title: string;
  totalBlocks: number;
  subType?: "heading1" | "text";
  onAddBlock: (payload: BlockPayload) => void;
  onDeleteBlock: (payload: BlockPayload) => void;
  onUpdateBlockType: (payload: {
    id: string;
    type: BlockTypeOption;
    title: string;
  }) => void;
}

export interface BlockPayload {
  id: string;
  ref: HTMLDivElement | null;
}

const TextBlock: FC<TextBlockProps> = ({
  id,
  title,
  subType = "text",
  totalBlocks,
  onAddBlock,
  onDeleteBlock,
  onUpdateBlockType,
}) => {
  const textBlockRef = useRef(null);
  const [titleContent, setTitleContent] = useState<string>(title);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      setIsMenuVisible(true);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      onAddBlock({ id, ref: textBlockRef.current });
    }
    if (e.key === "Backspace") {
      setIsMenuVisible(false);
      if (titleContent === "" && totalBlocks > 1) {
        e.preventDefault();
        onDeleteBlock({ id, ref: textBlockRef.current });
      }
    }
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    setTitleContent(e.currentTarget.textContent || "");
    setCaretToEnd(e.currentTarget);
  };

  const handleSelect = (type: BlockTypeOption) => {
    setIsMenuVisible(false);
    onUpdateBlockType({ id, type, title: titleContent });
  };

  const titleStyle = {
    fontSize: subType === "heading1" ? "1.875rem" : "1rem",
    fontWeight: subType === "heading1" ? 700 : 400,
  };

  return (
    <>
      <div
        id={id}
        className="block-item"
        ref={textBlockRef}
        onKeyDown={handleKeyDown}
        onInput={(e) => handleInput(e)}
        style={titleStyle}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {titleContent}
      </div>
      {isMenuVisible && <BlockMenu onSelect={handleSelect} />}
    </>
  );
};

export default TextBlock;
