import { FC, useRef, KeyboardEvent, RefObject } from "react";

export interface TextBlockProps {
  id: string;
  title: string;
  addBlock: (payload: BlockPayload) => void;
  deleteBlock: (payload: BlockPayload) => void;
  showMenu: (payload: boolean) => void;
}

export interface BlockPayload {
  id: string;
  ref: RefObject<HTMLDivElement>;
}

const TextBlock: FC<TextBlockProps> = ({
  id,
  title,
  addBlock,
  showMenu,
  deleteBlock,
}) => {
  const textBlockRef = useRef(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      showMenu(true);
    }
    if (e.key === "Backspace") {
      showMenu(false);
      deleteBlock({ id, ref: textBlockRef });
    }
    if (e.key === "Enter") {
      e.preventDefault();
      addBlock({ id, ref: textBlockRef });
    }
  };

  return (
    <div
      id={id}
      className="block-item"
      ref={textBlockRef}
      onKeyDown={handleKeyDown}
      contentEditable
      suppressContentEditableWarning={true}
    >
      {title}
    </div>
  );
};

export default TextBlock;
