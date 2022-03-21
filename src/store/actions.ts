import { BlockTypeOption } from "./../types/BlockType";
import { ADD_BLOCK, DELETE_BLOCK, UPDATE_BLOCK } from "./actionTypes";

export const addBlock = (id: string) => ({
  type: ADD_BLOCK,
  id,
});

export const deleteBlock = (id: string) => ({
  type: DELETE_BLOCK,
  id,
});

export const updateBlock = (
  id: string,
  blockType: BlockTypeOption,
  title: string
) => ({
  type: UPDATE_BLOCK,
  id,
  blockType,
  title,
});
