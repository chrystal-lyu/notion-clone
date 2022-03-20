import { RefObject, useState } from "react";
import { v4 as uid } from "uuid";
import BlockMenu from "./BlockMenu";
import Heading1Block from "./Blocks/Heading1Block";
import Heading2Block from "./Blocks/Heading2Block";
import TextBlock, { BlockPayload } from "./Blocks/TextBlock";

const initialBlocks = [
  {
    id: uid(),
    type: "heading1",
    properties: { title: "Heading 1" },
  },
  {
    id: uid(),
    type: "text",
    properties: { title: "text paragraph" },
  },
  {
    id: uid(),
    type: "text",
    properties: { title: "" },
  },
];

const EditablePage = () => {
  const [blocks, setBlocks] = useState(initialBlocks);
  const [showBlockMenu, setShowBlockMenu] = useState(false);

  const focusNextElement = (ref: RefObject<HTMLDivElement>) => {
    ref && (ref.current?.nextElementSibling as HTMLElement).focus();
  };

  const focusPreviousElement = (ref: RefObject<HTMLDivElement>) => {
    ref && (ref.current?.previousElementSibling as HTMLElement).focus();
  };

  const addBlock = (currentBlock: BlockPayload) => {
    const newBlock = { id: uid(), type: "text", properties: { title: "" } };
    setBlocks((prev) => [...prev, newBlock]);
    focusNextElement(currentBlock.ref);
  };

  const deleteBlock = (currentBlock: BlockPayload) => {
    const updatedBlock = blocks.filter((block) => block.id !== currentBlock.id);
    setBlocks(updatedBlock);
    focusPreviousElement(currentBlock.ref);
  };

  return (
    <div>
      <div className="page">
        {blocks.map((block) => {
          switch (block.type) {
            case "text":
              return (
                <TextBlock
                  key={block.id}
                  id={block.id}
                  title={block.properties.title}
                  addBlock={addBlock}
                  deleteBlock={deleteBlock}
                  showMenu={setShowBlockMenu}
                />
              );
            case "heading1":
              return (
                <Heading1Block
                  key={block.id}
                  id={block.id}
                  title={block.properties.title}
                />
              );
            case "heading2":
              return (
                <Heading2Block
                  key={block.id}
                  id={block.id}
                  title={block.properties.title}
                />
              );
            default:
              return null;
          }
        })}
        {showBlockMenu && <BlockMenu onSelect={() => []} />}
      </div>
    </div>
  );
};

export default EditablePage;
