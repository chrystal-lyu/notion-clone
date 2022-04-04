import {
  FC,
  useRef,
  KeyboardEvent,
  useState,
  FormEvent,
  useEffect,
  useContext,
} from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { BlockTypeOption } from "../../types/block";
import { setCaretToEnd } from "../../utils/setCaretToEnd";
import { fontSize, fontWeight } from "../../utils/titleStyle";
import BlockMenu from "../BlockMenu";

export interface TextBlockProps {
  id: string;
  title: string;
  totalBlocks: number;
  subType?: BlockTypeOption;
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
  const { theme } = useContext(ThemeContext);
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

  useEffect(() => {
    textBlockRef.current && (textBlockRef.current as HTMLDivElement).focus();
  }, [textBlockRef]);

  const titleStyle = {
    fontSize: fontSize(subType),
    fontWeight: fontWeight(subType),
  };

  return (
    <>
      <div
        id={id}
        className="block-item"
        data-theme={theme}
        ref={textBlockRef}
        onKeyDown={handleKeyDown}
        onInput={(e) => handleInput(e)}
        style={titleStyle}
        contentEditable
        suppressContentEditableWarning={true}
      >
        {titleContent}
      </div>
      {isMenuVisible && <BlockMenu theme={theme} onSelect={handleSelect} />}
    </>
  );
};

export default TextBlock;
