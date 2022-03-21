import { BlockType } from "./../types/BlockType";
import { v4 as uid } from "uuid";

export const initialBlocks: BlockType[] = [
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
