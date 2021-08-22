import { Editor, Transforms, Text, Descendant, Node, BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import escapeHtml from "escape-html";

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export type Format = "bold" | "underlined" | "italic" | "usual";
type CustomCommonElement = {
  type: "paragraph" | "quote";
  children: CustomText[] | Descendant[];
};
type CustomLinkElement = {
  type: "link";
  url: string;
  children: CustomText[] | Descendant[];
};
export type CustomElement = CustomLinkElement | CustomCommonElement;
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
};

export const isFormatActive = (editor: Editor, format: Format) => {
  const [match] = Editor.nodes(editor, {
    // @ts-ignore: Need to work around
    match: (n) => n[format] === true,
    mode: "all",
  });

  return !!match;
};

export const toggleFormat = (editor: Editor, format: Format) => {
  const isActive = isFormatActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  );
};
export const serializeToPlainText = (nodes: Descendant[]) => {
  return nodes.map((n) => Node.string(n)).join("\n");
};

export const serializeToHTML = (node: Descendant | CustomText): string => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);

    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    return string;
  }

  const children = node.children
    // @ts-ignore: Need to work around
    .map((n: CustomText | Descendant) => serializeToHTML(n))
    .join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      return `<p>${children}</p>`;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    default:
      return children;
  }
};
