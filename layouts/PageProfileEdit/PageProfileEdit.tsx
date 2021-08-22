import { useMemo } from "react";
import dynamic from "next/dynamic";

// Import CONTROLLERS
import useProfileEditController from "./PageProfileEdit.controller";

// Import COMPONENTS
import {
  BoxAvatar,
  BoxSimpleRounded,
  Button,
  Container,
  Flexbox,
  Input,
  FieldWithLabel,
  Text,
  Textarea,
  SLink,
  Checkbox,
  InputSelect,
  AvatarEdit,
  InputWithOptions,
} from "components";

// Import LAYOUTS
import { FieldsetSocial } from "layouts";

// Import MEDIA
import ExportIcon from "public/icons/icon-export.svg";
import HumanIcon from "public/icons/icon-man.svg";
import LockIcon from "public/icons/icon-lock.svg";
import ShareIcon from "public/icons/icon-share.svg";
import BellIcon from "public/icons/icon-bell.svg";

// Import TEMPLATES
import { PERSONAL_FIELDS, NAV_LIST } from "./templateProfile";

// Import STYLES
import styles from "./PageProfileEdit.module.scss";

// Import TYPES
import type { ProfileNavIcon } from "./templateProfile";

type Props = {
  className?: string;
};

const EditAvatarTrigger: React.FC = () => (
  <Button
    className={styles.profileEdit__formPersonalAvatarBtn}
    theme="transparent"
  >
    <ExportIcon width={15} height={15} />
    <Text color="orange">Edit avatar</Text>
  </Button>
);

const PopupSimple = dynamic(() => import("components/PopupSimple"), {
  ssr: false,
  // loading: ()=>(EditAvatarTrigger)
});
const PageProfileEdit: React.FC<Props> = ({ className }) => {
  const classNames = [styles.profileEdit, className].join(" ");

  // CONTROLLERS
  const {
    states: {
      countries,
      user,
      navTrackIndexState,
      cities,
      country_iso_code,
      city_iso_code,
      emailNotification,
      phoneNotification,
    },
    actions: {
      onSubmit,
      onChangePasswordSumbit,
      handleDeleteAccount,
      handleScrollToFieldset,
      handleOnAvatarChange,
      selectCountryId,
      isChangePasswordFormIsReady,
      handleChangePhoneNotification,
      handleChangeEmailNotification,
    },
    refs: { sectionListRef },
    forms: {
      main: { handleSubmit, register, isDirty, isSubmitting, setValue },
      changePassword: {
        changePasswordRegister,
        handleChangePasswordSubmit,
        changePasswordErrors,
      },
    },
  } = useProfileEditController();

  const renderFields = useMemo(() => {
    return PERSONAL_FIELDS.map((field) => {
      return (
        <FieldWithLabel
          key={field.name}
          label={field.label}
          className={`${
            field.fieldType !== "textarea"
              ? styles.profileEdit__formPersonalItem
              : styles.profileEdit__formPersonalItemFull
          } ${
            field.name === "first_name" || field.name === "last_name"
              ? styles.profileEdit__formPersonalName
              : ""
          }`}
        >
          {field.fieldType !== "textarea" ? (
            field.fieldType === "input" ? (
              field.name === "city_iso_code" ? (
                <InputWithOptions
                  name={field.name}
                  register={register}
                  placeholder={field.placeholder}
                  options={cities}
                  setValue={setValue}
                  initialValue={
                    field.name === "city_iso_code" ? city_iso_code : null
                  }
                />
              ) : (
                <Input
                  register={register}
                  type={field.type}
                  placeholder={
                    field.placeholder ? field.placeholder : field.label
                  }
                  name={field.name}
                />
              )
            ) : (
              <InputSelect
                name={field.name}
                register={register}
                list={field.name === "country_iso_code" ? countries : undefined}
                setValue={setValue}
                placeholder={field.placeholder}
                onOptionChange={(value: string) => {
                  if (field.name === "country_iso_code") {
                    selectCountryId(value);
                  }
                }}
                selectedId={
                  field.name === "country_iso_code" ? country_iso_code : null
                }
              />
            )
          ) : (
            <Textarea
              name={field.name}
              register={register}
              fieldClassName={styles.profileEdit__formPersonalTextarea}
            />
          )}
        </FieldWithLabel>
      );
    });
  }, [PERSONAL_FIELDS, register, countries, cities, country_iso_code]);

  const renderNavigation = useMemo(() => {
    return NAV_LIST.map((nav, index) => (
      <li
        key={nav.label}
        className={`${styles.profileEdit__navListItem} ${
          navTrackIndexState === index
            ? styles.profileEdit__navListItem_active
            : ""
        }`}
      >
        <Button onClick={() => handleScrollToFieldset(index)}>
          {renderIcon(nav.icon)}

          <Text
            className={styles.profileEdit__navListItemText}
            color="moonlight"
            size="sm"
            inline
            hoverTransition
          >
            {nav.label}
          </Text>
        </Button>
      </li>
    ));
  }, [NAV_LIST, navTrackIndexState, renderIcon]);

  const navOptionList = useMemo(
    () =>
      NAV_LIST.map((nav, index) => ({
        id: nav.icon,
        value: nav.icon,
        element: (
          <Button
            onClick={() => handleScrollToFieldset(index)}
            className={`${styles.profileEdit__navListItem} ${
              navTrackIndexState === index
                ? styles.profileEdit__navListItem_active
                : ""
            }`}
          >
            {renderIcon(nav.icon)}{" "}
            <Text
              className={styles.profileEdit__navListItemText}
              color="moonlight"
              size="sm"
              inline
            >
              {nav.label}
            </Text>
          </Button>
        ),
      })),
    [NAV_LIST, renderIcon, navTrackIndexState]
  );

  function renderIcon(icontype: ProfileNavIcon) {
    switch (icontype) {
      case "human":
        return <HumanIcon width={11} height={11} />;
      case "bell":
        return <BellIcon width={10} height={13} />;
      case "lock":
        return <LockIcon width={9} height={12} />;
      case "share":
        return <ShareIcon width={11} height={12} />;
      default:
        return <HumanIcon width={11} height={11} />;
    }
  }

  return (
    <div className={classNames}>
      <Container className={styles.profileEdit__container}>
        <Flexbox
          className={styles.profileEdit__title}
          justify="spaceBetween"
          align="end"
        >
          <Text
            as="h4"
            color="greyDark"
            className={styles.profileEdit__titleText}
          >
            Edit profile
          </Text>

          <Button
            className={styles.profileEdit__deleteBtn}
            onClick={handleDeleteAccount}
          >
            <Text
              color="accentMedium"
              size="sm"
              className={styles.profileEdit__deleteBtnText}
            >
              Delete account
            </Text>
          </Button>
        </Flexbox>

        <Flexbox align="start" className={styles.profileEdit__content}>
          <div className={styles.profileEdit__nav}>
            <ul className={styles.profileEdit__navList}>{renderNavigation}</ul>
          </div>

          <div className={styles.profileEdit__navMobile}>
            <InputSelect
              name="navigation"
              theme="bordered"
              list={navOptionList}
              selectedId={navOptionList[navTrackIndexState].id}
              inputClassName={styles.profileEdit__navMobileInput}
            />
          </div>

          <div className={styles.profileEdit__form}>
            <BoxSimpleRounded className={styles.profileEdit__formBox}>
              <form
                onSubmit={handleChangePasswordSubmit(onSubmit)}
                autoComplete="off"
              >
                <fieldset
                  ref={sectionListRef.current[0]}
                  className={styles.profileEdit__formFieldset}
                >
                  <Text
                    color="greyDark"
                    className={styles.profileEdit__formFieldsetTitle}
                    fontWeight="semibold"
                  >
                    Personal information
                  </Text>

                  <Flexbox
                    align="start"
                    className={styles.profileEdit__formPersonal}
                  >
                    <div className={styles.profileEdit__formPersonalAvatar}>
                      <BoxAvatar
                        alt=""
                        src={
                          user && user.avatar_url != null
                            ? `${process.env.REMOTE}/${user.avatar_url}`
                            : null
                        }
                        className={styles.profileEdit__formPersonalAvatarBox}
                        // size={155}
                      />

                      <PopupSimple
                        className="profileEdit__popup"
                        trigger={
                          <Button
                            className={
                              styles.profileEdit__formPersonalAvatarBtn
                            }
                            theme="transparent"
                          >
                            <ExportIcon width={15} height={15} />
                            <Text color="orange">Edit avatar</Text>
                          </Button>
                        }
                        modal
                      >
                        {(close) => (
                          <AvatarEdit
                            src={
                              user && user.avatar_url != null
                                ? `${process.env.REMOTE}/${user.avatar_url}`
                                : null
                            }
                            onAvatarChange={handleOnAvatarChange}
                            closePopup={close}
                          />
                        )}
                      </PopupSimple>
                    </div>

                    <div className={styles.profileEdit__formPersonalBlock}>
                      {renderFields}
                    </div>
                  </Flexbox>
                </fieldset>

                <fieldset
                  ref={sectionListRef.current[1]}
                  className={styles.profileEdit__formFieldset}
                >
                  <FieldsetSocial
                    register={register}
                    className={styles.profileEdit__formSocial}
                  />

                  <div className={styles.profileEdit__formPublic}>
                    <Text
                      color="greyDark"
                      className={styles.profileEdit__formFieldsetTitle}
                      fontWeight="semibold"
                    >
                      Add public email
                    </Text>

                    <Input
                      type="email"
                      placeholder="Email"
                      name="public_email"
                      register={register}
                      className={styles.profileEdit__formPublicEmail}
                    />
                  </div>
                </fieldset>
              </form>

              <fieldset
                ref={sectionListRef.current[2]}
                className={styles.profileEdit__formFieldset}
              >
                <Text
                  color="greyDark"
                  className={styles.profileEdit__formFieldsetTitle}
                  fontWeight="semibold"
                >
                  Change password
                </Text>

                <form
                  onSubmit={handleChangePasswordSubmit(onChangePasswordSumbit)}
                  className={styles.profileEdit__formResetPassword}
                  autoComplete="off"
                >
                  <Input
                    className={styles.profileEdit__formResetPasswordItem}
                    type="password"
                    placeholder="Old"
                    name="oldpassword"
                    register={changePasswordRegister}
                    error={changePasswordErrors.oldpassword}
                  />
                  <Input
                    className={styles.profileEdit__formResetPasswordItem}
                    type="password"
                    placeholder="New"
                    name="newpassword"
                    register={changePasswordRegister}
                    error={changePasswordErrors.newpassword}
                  />
                  <Input
                    className={styles.profileEdit__formResetPasswordItem}
                    type="password"
                    placeholder="Repeat new password"
                    name="repeatpassword"
                    register={changePasswordRegister}
                    error={changePasswordErrors.repeatpassword}
                  />

                  <div className={styles.profileEdit__formResetPasswordButtons}>
                    <Button
                      type="submit"
                      className={styles.profileEdit__formResetPasswordBtn}
                      theme="sunshine"
                      disabled={isChangePasswordFormIsReady}
                    >
                      <Text
                        className={styles.profileEdit__formResetPasswordBtnText}
                        color="white"
                        size="sm"
                        fontWeight="semibold"
                      >
                        Change
                      </Text>
                    </Button>

                    <SLink
                      className={styles.profileEdit__formForgotPassword}
                      href="/forgotpassword"
                    >
                      {({ hoverState }) => (
                        <Text
                          hoverTransition
                          color={hoverState ? "hotpink" : "orange"}
                          size="sm"
                        >
                          Forgot password
                        </Text>
                      )}
                    </SLink>
                  </div>
                </form>
              </fieldset>

              <fieldset
                ref={sectionListRef.current[3]}
                className={styles.profileEdit__formFieldset}
              >
                <Text
                  color="greyDark"
                  className={styles.profileEdit__formFieldsetTitle}
                  fontWeight="semibold"
                  singleLine
                >
                  Notifications
                </Text>

                <div className={styles.profileEdit__formNotifications}>
                  <div className={styles.profileEdit__formNotificationsItem}>
                    <Checkbox
                      label={
                        <Text
                          className={styles.profileEdit__formNotificationsText}
                          size="sm"
                          color="greyDark"
                        >
                          Send email notifications
                        </Text>
                      }
                      className={styles.profileEdit__formNotificationsCheckbox}
                      name="email_notification"
                      isToggle
                      isRightAlign
                      value={emailNotification}
                      onChange={handleChangeEmailNotification}
                    />
                  </div>

                  <div className={styles.profileEdit__formNotificationsItem}>
                    <Checkbox
                      label={
                        <Text
                          className={styles.profileEdit__formNotificationsText}
                          size="sm"
                          color="greyDark"
                        >
                          Send phone notifications
                        </Text>
                      }
                      className={styles.profileEdit__formNotificationsCheckbox}
                      name="phone_notification"
                      isToggle
                      isRightAlign
                      value={phoneNotification}
                      onChange={handleChangePhoneNotification}
                    />
                  </div>
                </div>
              </fieldset>
            </BoxSimpleRounded>

            <div className={styles.profileEdit__formSubmitBlock}>
              <Button
                className={styles.profileEdit__formSubmitBtn}
                onClick={handleSubmit(onSubmit)}
                theme="sunshine"
                disabled={!isDirty || isSubmitting}
              >
                <Text
                  color="white"
                  className={styles.profileEdit__formSubmitBtnText}
                  size="sm"
                  fontWeight="semibold"
                >
                  Save
                </Text>
              </Button>
            </div>
          </div>
        </Flexbox>
      </Container>
    </div>
  );
};

export default PageProfileEdit;
