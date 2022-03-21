import { BlockType } from "../types/BlockType";
import { v4 as uid } from "uuid";
import { Action, ADD_BLOCK, DELETE_BLOCK, UPDATE_BLOCK } from "./actionTypes";

export interface State {
  blocks: BlockType[];
}

export const initialState: State = {
  blocks: [
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
  ],
};

export const blockReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ADD_BLOCK:
      const newDefaultBlock: BlockType = {
        id: uid(),
        type: "text",
        properties: { title: "" },
      };
      const additionIndex = state.blocks
        .map((item) => item.id)
        .indexOf(action.id);
      const updatedState = [...state.blocks];
      updatedState.splice(additionIndex + 1, 0, newDefaultBlock);
      return { blocks: updatedState };

    case DELETE_BLOCK:
      const deletionIndex = state.blocks
        .map((item) => item.id)
        .indexOf(action.id);
      const updatedBlocks = [...state.blocks];
      updatedBlocks.splice(deletionIndex, 1);
      return { blocks: updatedBlocks };

    case UPDATE_BLOCK:
      const updatedBlock = state.blocks.map((item) => {
        if (item.id === action.id) {
          return {
            id: item.id,
            type: action.blockType,
            properties: {
              ...item.properties,
              title: action.title,
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
      return { blocks: updatedBlock };

    default:
      return state;
  }
};
