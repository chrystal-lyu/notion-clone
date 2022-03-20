import { FC, useRef, KeyboardEvent, useState, FormEvent } from "react";
import { setCaretToEnd } from "../../utils/setCaretToEnd";
import BlockMenu, { BlockType } from "../BlockMenu";

export interface TextBlockProps {
  id: string;
  title: string;
  onAddBlock: (payload: BlockPayload) => void;
  onDeleteBlock: (payload: BlockPayload) => void;
  onUpdateBlockType: (id: string, type: BlockType) => void;
}

export interface BlockPayload {
  id: string;
  ref: HTMLDivElement | null;
}

const TextBlock: FC<TextBlockProps> = ({
  id,
  title,
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
    if (e.key === "Backspace" && titleContent === "") {
      e.preventDefault();
      setIsMenuVisible(false);
      onDeleteBlock({ id, ref: textBlockRef.current });
    }
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    setTitleContent(e.currentTarget.textContent || "");
    setCaretToEnd(e.currentTarget);
  };

  const handleSelect = (payload: BlockType) => {
    setIsMenuVisible(false);
    onUpdateBlockType(id, payload);
  };

  return (
    <>
      <div
        id={id}
        className="block-item"
        ref={textBlockRef}
        onKeyDown={handleKeyDown}
        onInput={(e) => handleInput(e)}
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
