import { useState } from "react";
import { v4 as uid } from "uuid";

import { BlockType } from "../types/BlockType";
import { focusPreviousElement } from "../utils/focusNextElement";
import { focusNextElement } from "../utils/focustPreviousElement";
import { setCaretToEnd } from "../utils/setCaretToEnd";
import { initialBlocks } from "../constants/InitialBlocks";
import { BlockTypeOption } from "./BlockMenu";
import TextBlock, { BlockPayload } from "./Blocks/TextBlock";

const Workspace = () => {
  const [blocks, setBlocks] = useState(initialBlocks);

  const addBlock = (currentBlock: BlockPayload) => {
    const newBlock: BlockType = {
      id: uid(),
      type: "text",
      properties: { title: "" },
    };
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
      <div className="workspace">
        <div className="workspace-header">
          <div className="workspace-header-title">
            <span style={{ fontSize: 42, marginRight: 8 }}>📖</span>
            <div>git checkout -b feature/Notion</div>
          </div>
          <div>What's on your mind?</div>
        </div>
        {blocks.map((block) => {
          switch (block.type) {
            case "text":
            case "heading1":
              return (
                <TextBlock
                  key={block.id}
                  id={block.id}
                  subType={block.type}
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

export default Workspace;
