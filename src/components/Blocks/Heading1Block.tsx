import { FC } from "react";

export interface TextBlockProps {
  id: string;
  title: string;
}

const Heading1Block: FC<TextBlockProps> = ({ id, title }) => {
  return (
    <div
      id={id}
      className="block-item"
      contentEditable
      suppressContentEditableWarning={true}
      style={{ fontSize: "1.875rem", fontWeight: 700 }}
    >
      {title}
    </div>
  );
};

export default Heading1Block;
