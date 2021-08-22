// @refresh reset
import {
  useMemo,
  useState,
  FocusEventHandler,
  useEffect,
  useCallback,
} from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact, RenderLeafProps } from "slate-react";
import { withHistory } from "slate-history";

// Import COMPONENTS
import HoveringToolbar from "./HoveringToolbar";

// Import UTILS
import { toggleFormat, serializeToHTML, serializeToPlainText } from "./utils";

// Import STYLES
import styles from "./TextEditor.module.scss";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

type Props = {
  onChange?: (value: string, isEmpty: boolean) => void;
  onFocus?: FocusEventHandler<HTMLDivElement>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  placeholder?: string;
  className?: string;
};

const TextEditor: React.FC<Props> = ({
  onChange,
  placeholder,
  className,
  onFocus,
  onBlur,
}) => {
  const classNames = [styles.editor, className].join(" ");

  // STATES
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const [isValueEmpty, setIsValueEmpty] = useState(true);

  // EDITOR
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  useEffect(() => {
    setIsValueEmpty(serializeToPlainText(value) === "");
  }, [value]);

  const handleChangeText = useCallback(
    (newText: Descendant[]) => {
      setValue(newText);

      if (onChange) {
        const htmlResult = value.map((item) => serializeToHTML(item));

        onChange(htmlResult.join(""), isValueEmpty);
      }
    },
    [isValueEmpty]
  );

  return (
    <Slate editor={editor} value={value} onChange={handleChangeText}>
      <HoveringToolbar />

      <Editable
        className={classNames}
        renderLeaf={(props) => <Leaf {...props} />}
        placeholder={placeholder}
        onDOMBeforeInput={(event: InputEvent) => {
          switch (event.inputType) {
            case "formatBold":
              event.preventDefault();
              return toggleFormat(editor, "bold");
            case "formatItalic":
              event.preventDefault();
              return toggleFormat(editor, "italic");
            case "formatUnderline":
              event.preventDefault();
              return toggleFormat(editor, "underlined");
            default:
              return toggleFormat(editor, "usual");
          }
        }}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Slate>
  );
};

function Leaf(props: RenderLeafProps) {
  const { attributes, leaf, children } = props;
  let updatedChildren = children;

  if (leaf.bold) {
    updatedChildren = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    updatedChildren = <em>{children}</em>;
  }

  if (leaf.underlined) {
    updatedChildren = <u>{children}</u>;
  }

  return <span {...attributes}>{updatedChildren}</span>;
}

export default TextEditor;
