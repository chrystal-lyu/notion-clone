export type BlockTypeOption = "heading1" | "heading2" | "text";

interface BlockBaseType {
  id: string;
  properties: {
    title: string;
  };
}

interface TextBlockType extends BlockBaseType {
  type: "text";
}

interface HeaderBlockType extends BlockBaseType {
  type: "heading1";
}

interface SubHeaderBlockType extends BlockBaseType {
  type: "heading2";
}

export type BlockType = TextBlockType | HeaderBlockType | SubHeaderBlockType;
