import {
  FC,
  useRef,
  KeyboardEvent,
  RefObject,
  useState,
  FormEvent,
} from "react";
import { setCaretToEnd } from "../../utils/setCaretToEnd";

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
  const [titleContent, setTitleContent] = useState<string>(title);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "/") {
      showMenu(true);
    }
    if (e.key === "Backspace" && titleContent === "") {
      e.preventDefault();
      showMenu(false);
      deleteBlock({ id, ref: textBlockRef });
    }
    if (e.key === "Enter") {
      e.preventDefault();
      addBlock({ id, ref: textBlockRef });
    }
  };

  const handleInput = (e: FormEvent<HTMLDivElement>) => {
    setTitleContent(e.currentTarget.textContent || "");
    setCaretToEnd(e.currentTarget);
  };

  return (
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
  );
};

export default TextBlock;
