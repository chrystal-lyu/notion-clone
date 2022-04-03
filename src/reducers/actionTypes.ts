import { BlockTypeOption } from "../types/block";

export const ADD_BLOCK = "ADD_BLOCK";
export const DELETE_BLOCK = "DELETE_BLOCK";
export const UPDATE_BLOCK = "UPDATE_BLOCK";

export type Action =
  | { type: typeof ADD_BLOCK; id: string }
  | { type: typeof DELETE_BLOCK; id: string }
  | {
      type: typeof UPDATE_BLOCK;
      id: string;
      blockType: BlockTypeOption;
      title: string;
    };
