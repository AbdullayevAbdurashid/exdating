import React, { FormEvent } from "react";

// Import CONTROLLERS
import useAddFeedbackController from "./PageAddFeedback.controller";

// Import COMPONENTS
import {
  BoxSimpleRounded,
  Checkbox,
  Container,
  Flexbox,
  Dropzone,
  Text,
  Button,
  InputAnimatedTitle,
  Textarea,
  FieldWithLabel,
  Input,
  TabsSimple,
  PopupSimple,
  Tag,
  TextEditorWithLabel,
} from "components";

// Import LAYOUTS
import { ButtonGradient, FieldsetAbout, FieldsetSocial } from "layouts";
import TooltipAnonymous from "./TooltipAnonymous";

// Import STYLES
import styles from "./PageAddFeedback.module.scss";

type Props = { className?: string; isDraft?: boolean };

const PageAddFeedback: React.FC<Props> = ({ className, isDraft }) => {
  const classNames = [styles.addFeedback, className].join(" ");

  // CONTROLLERS
  const {
    actions: { submitForm, handleChangeDescription },
    forms: { register, setValue },
    states: { width, popularHashtagList },
  } = useAddFeedbackController();

  return (
    <main className={classNames}>
      <Container className={styles.addFeedback__container}>
        <form onSubmit={submitForm} className={styles.addFeedback__form}>
          <Flexbox
            align="center"
            justify="spaceBetween"
            className={styles.addFeedback__title}
          >
            <Text
              as="h3"
              color="greyDark"
              className={styles.addFeedback__titleText}
            >
              Add feedback
            </Text>

            <Flexbox className={styles.addFeedback__switchBox}>
              <Checkbox
                label={
                  <Text size="sm" color="greyDark">
                    Stay anonymous
                  </Text>
                }
                name="is_anonymous"
                isToggle
                theme="dark"
              />

              <PopupSimple
                trigger={
                  <div className={styles.addFeedback__switchHelp}>?</div>
                }
                position={
                  width != null && width <= 1100 && width > 575
                    ? "bottom right"
                    : "bottom center"
                }
                on={["hover", "focus"]}
                arrow
                className="popup-dark"
              >
                {() => <TooltipAnonymous />}
              </PopupSimple>
            </Flexbox>
          </Flexbox>

          <BoxSimpleRounded className={styles.addFeedback__fields}>
            <InputAnimatedTitle
              name="title"
              register={register}
              placeholder="Title post"
              className={styles.addFeedback__fieldsTitle}
            />

            <Dropzone
              name="images"
              setValue={setValue}
              className={styles.addFeedback__dropzone}
            />

            <div className={styles.addFeedback__about}>
              <TabsSimple
                initialTabIndex={0}
                renderHeader={({ activeTabIndex }) => (
                  <div>
                    <Button theme="transparent">
                      <Text
                        color="orange"
                        size="sm"
                        fontWeight="semibold"
                        className={styles.addFeedback__btnAddPersonalText}
                      >
                        {activeTabIndex === 0
                          ? "- Cancel"
                          : "+ Add information about person"}
                      </Text>
                    </Button>
                  </div>
                )}
                isToggleable
              >
                {({ activeTabIndex }) => (
                  <div
                    style={{
                      display: activeTabIndex === 0 ? "block" : "none",
                    }}
                  >
                    <div className={styles.addFeedback__aboutBox}>
                      <FieldsetAbout
                        register={register}
                        setValue={setValue}
                        className={styles.addFeedback__aboutFieldset}
                      />

                      <FieldsetSocial
                        register={register}
                        className={styles.addFeedback__aboutFieldset}
                      />
                    </div>

                    <div
                      style={{
                        display: activeTabIndex === 0 ? "block" : "none",
                      }}
                      className={styles.addFeedback__aboutLine}
                    />
                  </div>
                )}
              </TabsSimple>
            </div>

            <TextEditorWithLabel
              onChange={handleChangeDescription}
              label="Start story"
            />

            <FieldWithLabel
              label={
                <Text
                  className={styles.addFeedback__fieldTagsLabel}
                  color="greyDark"
                  size="md"
                  fontWeight="semibold"
                >
                  Add tags
                </Text>
              }
              className={styles.addFeedback__fieldTags}
            >
              <Input
                name="hashtags"
                register={register}
                className={styles.addFeedback__inputTags}
                placeholder="Enter tag name"
              />
            </FieldWithLabel>

            {popularHashtagList.length > 0 && (
              <Flexbox align="start" className={styles.addFeedback__popular}>
                <Text
                  size="sm"
                  color="moonlight"
                  className={styles.addFeedback__popularText}
                >
                  Popular:
                </Text>

                <Flexbox
                  wrap="wrap"
                  className={styles.addFeedback__popularTagList}
                >
                  {popularHashtagList.map((popularHashtag) => (
                    <Tag
                      key={popularHashtag.name}
                      className={styles.addFeedback__popularTag}
                    >
                      {popularHashtag.name}
                    </Tag>
                  ))}
                </Flexbox>
              </Flexbox>
            )}
          </BoxSimpleRounded>

          <Flexbox
            justify="spaceBetween"
            align="center"
            className={styles.addFeedback__btnBlock}
          >
            {isDraft ? (
              <Button className={styles.addFeedback__btnDelete} theme="red">
                <Text
                  className={styles.addFeedback__btnDeleteText}
                  fontWeight="semibold"
                >
                  Delete
                </Text>
              </Button>
            ) : (
              <Checkbox
                name="terms"
                label={
                  <Text color="greyDark" size="xsm">
                    Terms &#38; Conditions
                  </Text>
                }
                theme="dark"
                className={styles.addFeedback__btnTerms}
              />
            )}

            <Flexbox className={styles.addFeedback__btnSubmits}>
              <Button
                className={styles.addFeedback__btnDraft}
                theme="borderedSecondaty"
                type="submit"
                name="draft"
              >
                <Text
                  className={styles.addFeedback__btnDraftText}
                  color="orange"
                  fontWeight="semibold"
                >
                  Save draft
                </Text>
              </Button>

              <ButtonGradient
                className={styles.addFeedback__btnPublicate}
                type="submit"
                name="publicate"
              >
                Publicate
              </ButtonGradient>
            </Flexbox>
          </Flexbox>
        </form>
      </Container>
    </main>
  );
};

export default PageAddFeedback;
