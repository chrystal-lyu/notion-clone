import { useReducer } from "react";

import { setCaretToEnd } from "../utils/setCaretToEnd";
import TextBlock, { BlockPayload } from "./Blocks/TextBlock";
import { blockReducer, initialState } from "../store/blockReducer";
import { BlockTypeOption } from "../types/BlockType";

const Workspace = () => {
  const [state, dispatch] = useReducer(blockReducer, initialState);

  const addBlock = (currentBlock: BlockPayload) => {
    dispatch({ type: "ADD_BLOCK", id: currentBlock.id });
  };

  const deleteBlock = (currentBlock: BlockPayload) => {
    dispatch({ type: "DELETE_BLOCK", id: currentBlock.id });

    const previousBlock = currentBlock.ref?.previousElementSibling;
    setCaretToEnd(previousBlock as HTMLElement);
  };

  const updateBlockType = (payload: {
    id: string;
    type: BlockTypeOption;
    title: string;
  }) => {
    dispatch({
      type: "UPDATE_BLOCK",
      id: payload.id,
      blockType: payload.type,
      title: payload.title,
    });
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
        {state.blocks.map((block) => {
          switch (block.type) {
            case "text":
            case "heading1":
              return (
                <TextBlock
                  key={block.id}
                  id={block.id}
                  subType={block.type}
                  title={block.properties.title}
                  totalBlocks={state.blocks.length}
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
