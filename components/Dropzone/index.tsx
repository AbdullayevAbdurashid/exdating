import { useCallback, useMemo, useState, useEffect, MouseEvent } from "react";
import { useDropzone } from "react-dropzone";

// Import COMPONENTS
import { Text, Flexbox, Button } from "components";

// Import HOOKS
import { libHooks } from "hooks";

// Import MEDIA
import UploadIcon from "public/icons/icon-upload.svg";
import PlusIconAlt from "public/icons/icon-plus-alt.svg";
import CloseIcon from "public/icons/icon-close.svg";
import CloseRoundIcon from "public/icons/icon-round-close.svg";

// Import STYLES
import styles from "./Dropzone.module.scss";

type Props = {
  className?: string;
  name: string;
  setValue: (
    name: string,
    value: unknown,
    config?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
        }>
      | undefined
  ) => void;
};

const Dropzone: React.FC<Props> = ({ className, name, setValue }) => {
  const classNames = [styles.dropzone, className].join(" ");

  // HOOKS
  const { useNotification } = libHooks;
  const { setErrorNotification } = useNotification();

  // STATES
  const [fileList, setFileList] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      console.log("onDrop: ", acceptedFiles);
      if (fileList.length + acceptedFiles.length <= 10) {
        setFileList((prevState) => [...prevState, ...acceptedFiles]);
      } else {
        setErrorNotification("Max 10 photos");
      }
    },
    [name, fileList]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    setValue(name, fileList);
  }, [fileList, name]);

  const handleRemoveImage = (
    event: MouseEvent<HTMLButtonElement>,
    imageIndex: number
  ) => {
    event.stopPropagation();
    setFileList((prevState) => {
      const filteredList = prevState.filter((_, index) => imageIndex !== index);

      return filteredList;
    });
  };

  const renderEmptyDropzone = useMemo(
    () => (
      <>
        <UploadIcon viewBox="0 0 44 44" />

        <div className={styles.dropzone__wrapper}>
          <Text className={styles.dropzone__title} color="orange">
            {isDragActive ? "Drop photo" : "Upload photo"}
          </Text>

          <Text
            className={styles.dropzone__titleSub}
            color="moonlight"
            size="xsm"
          >
            up to 10 photos
          </Text>
        </div>
      </>
    ),
    [isDragActive]
  );

  const renderFilledDropzone = useMemo(() => {
    return (
      <Flexbox
        className={styles.dropzone__imageList}
        direction="row"
        wrap="wrap"
        justify="center"
      >
        {fileList.map((file, index) => {
          // const reader = new FileReader();
          const src = URL.createObjectURL(file);

          // reader.onload = (e) => {
          //   // console.log("onLoad: ", e.target.result);
          //   src = e.target!.result;
          // };

          // reader.readAsDataURL(file);

          return (
            <div
              key={`${file.name}_${file.size}`}
              className={styles.dropzone__imageWrapper}
            >
              <div className={styles.dropzone__imageBox}>
                <img src={src} alt={file.name} />
              </div>

              <Button
                onClick={(event) => handleRemoveImage(event, index)}
                className={styles.dropzone__btnRemoveImage}
              >
                <CloseRoundIcon viewBox="0 0 12 13" />
              </Button>
            </div>
          );
        })}

        {Array.from({ length: 10 - fileList.length }).map((box, index) => (
          /* eslint react/no-array-index-key: "off" */
          <div key={index} className={styles.dropzone__imageWrapper}>
            <Flexbox
              justify="center"
              align="center"
              className={styles.dropzone__imageBox}
            >
              <Text color="orange" size="xxlg">
                <PlusIconAlt viewBox="0 0 24 24" />
              </Text>
            </Flexbox>
          </div>
        ))}

        <div className={styles.dropzone__imageListDescription}>
          <Text inline size="sm" color="greyLight">
            up to{" "}
          </Text>
          <Text inline size="sm" color="orange">
            10
          </Text>
          <Text inline size="sm" color="greyLight">
            {" "}
            photos
          </Text>
        </div>
      </Flexbox>
    );
  }, [fileList]);

  return (
    <div className={classNames} {...getRootProps()}>
      <input {...getInputProps()} />

      <Flexbox
        justify="center"
        align="center"
        className={styles.dropzone__dropzone}
      >
        {fileList.length > 0 ? renderFilledDropzone : renderEmptyDropzone}
      </Flexbox>
    </div>
  );
};

export default Dropzone;
