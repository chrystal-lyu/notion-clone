import { useState } from "react";
import { v4 as uid } from "uuid";
import { setCaretToEnd } from "../utils/setCaretToEnd";
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

  const focusNextElement = (el: HTMLDivElement | null) => {
    (el?.nextElementSibling as HTMLElement).focus();
  };

  const focusPreviousElement = (el: HTMLDivElement | null) => {
    (el?.nextElementSibling as HTMLElement).focus();
  };

  const addBlock = (currentBlock: BlockPayload) => {
    const newBlock = { id: uid(), type: "text", properties: { title: "" } };
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
    // temporary hack for focusing next block
    setTimeout(() => {
      focusNextElement(currentBlock.ref);
    }, 50);
  };

  const deleteBlock = (currentBlock: BlockPayload) => {
    const previousBlock = currentBlock.ref?.previousElementSibling;
    const updatedBlock = blocks.filter((block) => block.id !== currentBlock.id);
    setBlocks(updatedBlock);
    focusPreviousElement(currentBlock.ref);
    setCaretToEnd(previousBlock as HTMLElement);
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
