import { FC } from "react";

export interface TextBlockProps {
  id: string;
  title: string;
}

const Heading2Block: FC<TextBlockProps> = ({ id, title }) => {
  return (
    <div
      id={id}
      className="block-item"
      contentEditable
      suppressContentEditableWarning={true}
      style={{ fontSize: "1.5rem", fontWeight: 700 }}
    >
      {title}
    </div>
  );
};

export default Heading2Block;
