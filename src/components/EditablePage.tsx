import { useState } from "react";
import { v4 as uid } from "uuid";
import { setCaretToEnd } from "../utils/setCaretToEnd";
import { BlockTypeOption } from "./BlockMenu";
import Heading1Block from "./Blocks/Heading1Block";
import TextBlock, { BlockPayload } from "./Blocks/TextBlock";

const initialBlocks = [
  {
    id: uid(),
    type: "heading1",
    properties: { title: "Element.nextElementSibling" },
  },
  {
    id: uid(),
    type: "text",
    properties: {
      title:
        "The Element.nextElementSibling read-only property returns the element immediately following the specified one in its parent's children list, or null if the specified element is the last one in the list.",
    },
  },
];

const EditablePage = () => {
  const [blocks, setBlocks] = useState(initialBlocks);

  const focusNextElement = (el: HTMLDivElement | null) => {
    (el?.nextElementSibling as HTMLElement).focus();
  };

  const focusPreviousElement = (el: HTMLDivElement | null) => {
    (el?.previousElementSibling as HTMLElement).focus();
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
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks = [...blocks];
    updatedBlocks.splice(index, 1);
    setBlocks(updatedBlocks);
    focusPreviousElement(currentBlock.ref);
    setCaretToEnd(previousBlock as HTMLElement);
  };

  const updateBlockType = (payload: {
    id: string;
    type: BlockTypeOption;
    title: string;
  }) => {
    const updatedBlock = blocks.map((item) => {
      if (item.id === payload.id) {
        return {
          id: item.id,
          type: payload.type,
          properties: {
            ...item.properties,
            title: payload.title,
          },
        };
      } else {
        return {
          id: item.id,
          type: item.type,
          properties: item.properties,
        };
      }
    });
    setBlocks(updatedBlock);
  };

  return (
    <div>
      <div className="page">
        <div className="page-header">
          <div className="page-header-title">
            <span style={{ fontSize: 42, marginRight: 8 }}>📖</span>
            <div>git checkout -b feature/Notion</div>
          </div>
          <div>What's on your mind?</div>
        </div>
        {blocks.map((block) => {
          switch (block.type) {
            case "text":
              return (
                <TextBlock
                  id={block.id}
                  key={block.id}
                  title={block.properties.title}
                  totalBlocks={blocks.length}
                  onAddBlock={addBlock}
                  onDeleteBlock={deleteBlock}
                  onUpdateBlockType={updateBlockType}
                />
              );
            case "heading1":
              return (
                <Heading1Block
                  id={block.id}
                  key={block.id}
                  title={block.properties.title}
                  totalBlocks={blocks.length}
                  onAddBlock={addBlock}
                  onDeleteBlock={deleteBlock}
                  onUpdateBlockType={updateBlockType}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
};

export default EditablePage;
