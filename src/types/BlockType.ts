export type BlockTypeOption = "heading1" | "text";

export interface TextBlock {
  type: "text";
  id: string;
  properties: {
    title: string;
  };
}

export interface Heading1Block {
  type: "heading1";
  id: string;
  properties: {
    title: string;
  };
}

export type BlockType = TextBlock | Heading1Block;
