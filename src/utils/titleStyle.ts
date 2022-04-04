import { BlockTypeOption } from "../types/block";

export const fontSize = (type: BlockTypeOption) => {
  switch (type) {
    case "heading1":
      return "1.875rem";
    case "heading2":
      return "1.5rem";
    default:
      return "1rem";
  }
};

export const fontWeight = (type: BlockTypeOption) => {
  switch (type) {
    case "heading1":
    case "heading2":
      return "700";
    default:
      return "400";
  }
};
