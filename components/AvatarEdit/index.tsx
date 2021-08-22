import { useRef, useState, useEffect, useCallback } from "react";
import AvatarEditor from "react-avatar-editor";
import { Range } from "react-range";

// Import API
import { setUserAvatar, getSelf } from "api/user";

// Import COMPONENTS
import { Flexbox, Button, Text, InputFile } from "components";

// Import UTILS
import { helpers } from "utils";

// Import MEDIA
import RotateRightIcon from "public/icons/icon-rotate-right.svg";
import RotateLeftIcon from "public/icons/icon-rotate-left.svg";

// Import STYLES
import styles from "./AvatarEdit.module.scss";

type Props = {
  className?: string;
  src: string | null;
  closePopup: () => void;
  onAvatarChange: () => void;
};

interface Position {
  x: number;
  y: number;
}

type ImageType = string | File;

type EditorState = {
  position: Position;
  scale: number;
  image: ImageType | null;
  rotate: number;
};

const AvatarEdit: React.FC<Props> = ({
  className,
  closePopup,
  src,
  onAvatarChange,
}) => {
  const classNames = [styles.avatarEdit, className].join(" ");

  const [editorState, setEditorState] = useState<EditorState>({
    position: { x: 0.5, y: 0.5 },
    scale: 1.5,
    image: src,
    rotate: 0,
  });

  const editorRef = useRef<AvatarEditor>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (src == null) {
      inputFileRef.current!.click();
    }
  }, [src]);

  const handleNewImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setState({ image: e.target.files[0] })
    if (event.target.files != null) {
      const image: ImageType = event.target.files[0];

      console.log("image: ", image);

      setEditorState((prevState) => ({ ...prevState, image }));
    }
  };

  const handleChangeScale = (values: number[]) => {
    // const scale = parseFloat(event.target.value);
    setEditorState((prevState) => ({ ...prevState, scale: values[0] }));
  };

  const handlePositionChange = (position: Position) => {
    setEditorState((prevState) => ({ ...prevState, position }));
  };

  const handleRotateLeft = () => {
    const rotate = editorState.rotate - 10;

    setEditorState((prevState) => ({ ...prevState, rotate }));
  };

  const handleRotateRight = () => {
    const rotate = editorState.rotate + 10;

    setEditorState((prevState) => ({ ...prevState, rotate }));
  };

  const handleChangeAvatar = () => {
    console.log(
      "handleChangeAvatar: ",
      editorRef.current!.getImageScaledToCanvas()
    );
    setUserAvatar(editorRef.current!.getImageScaledToCanvas()).then(
      (response) => {
        if (response.status) {
          closePopup();
          onAvatarChange();
        }
      }
    );
  };

  const handleFocusBack = useCallback(() => {
    if (inputFileRef.current!.files!.length === 0 && src == null) {
      closePopup();
    }

    window.removeEventListener("focus", handleFocusBack);
  }, [src]);

  function onInputClick() {
    window.addEventListener("focus", handleFocusBack);
  }

  return (
    <div className={classNames}>
      <AvatarEditor
        ref={editorRef}
        // crossOrigin="anonymous"
        image={
          editorState.image == null
            ? "images/some-image.png"
            : editorState.image
        }
        width={155}
        height={155}
        position={editorState.position}
        onPositionChange={handlePositionChange}
        scale={editorState.scale}
        color={[0, 0, 0, 0.6]}
        borderRadius={125}
        border={25}
        rotate={editorState.rotate}
      />

      <Flexbox
        className={styles.avatarEdit__topControl}
        justify="spaceBetween"
        align="center"
      >
        <InputFile
          ref={inputFileRef}
          name="newimage"
          onClick={onInputClick}
          onChange={handleNewImage}
        >
          <Text
            className={styles.avatarEdit__changeBtnText}
            color="orange"
            size="sm"
          >
            Change photo
          </Text>
        </InputFile>

        <Flexbox>
          <Text
            size="sm"
            color="greyDark"
            className={styles.avatarEdit__textRotate}
          >
            Rotate
          </Text>

          <Flexbox>
            <Button
              onClick={handleRotateLeft}
              className={styles.avatarEdit__rotateBtn}
            >
              <RotateLeftIcon width={15} height={15} />
            </Button>

            <Button
              onClick={handleRotateRight}
              className={styles.avatarEdit__rotateBtn}
            >
              <RotateRightIcon width={15} height={15} />
            </Button>
          </Flexbox>
        </Flexbox>
      </Flexbox>

      <Text className={styles.avatarEdit__textZoom} size="sm" color="greyDark">
        Zoom
      </Text>

      <Range
        step={0.01}
        min={1}
        max={2}
        values={[editorState.scale]}
        onChange={handleChangeScale}
        renderTrack={({ props, children }) => (
          <Button
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "26px",
              display: "flex",
              width: "100%",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "3px",
                width: "100%",
                background: helpers.getTrackBackground({
                  values: [editorState.scale],
                  colors: ["#ff6647", "#ECECEC"],
                  min: 1,
                  max: 2,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </Button>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              backgroundColor: "#ff6647",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              outline: "none",
            }}
          >
            <div
              style={{
                height: "7px",
                width: "7px",
                borderRadius: "50%",
                backgroundColor: "#fff",
              }}
            />
          </div>
        )}
      />
      <Button
        onClick={handleChangeAvatar}
        className={styles.avatarEdit__doneBtn}
        theme="sunshine"
      >
        <Text
          size="sm"
          className={styles.avatarEdit__doneBtnText}
          color="white"
        >
          Change
        </Text>
      </Button>
    </div>
  );
};

export default AvatarEdit;
