import {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers";

// Import API
import {
  changeUserProfile,
  deleteSelf,
  getSelf,
  changeUserPassword,
} from "api/user";

// Import CONTEXTS
import { context } from "context";

// Import HOOKS
import { commonHooks, libHooks } from "hooks";

// Import UTILS
import { validation, helpers } from "utils";

const useProfileEditController = () => {
  // ROUTER
  const router = useRouter();

  // UTILS
  const { changePasswordSchema } = validation;
  const { getDirtyValues } = helpers;

  // FORMS
  const {
    register,
    handleSubmit,
    errors,
    reset,
    setValue,
    formState: { isDirty, isSubmitting, dirtyFields },
    watch,
  } = useForm<EditProfileFormValues>({});
  const {
    register: changePasswordRegister,
    handleSubmit: handleChangePasswordSubmit,
    reset: changePasswordReset,
    errors: changePasswordErrors,
    formState: {
      isSubmitting: changePasswordIsSubmitting,
      isValid: changePasswordIsValid,
    },
  } = useForm<ChangePasswordFormValues>({
    resolver: yupResolver(changePasswordSchema),
    mode: "onChange",
  });

  // CONTEXTS
  const { useUserContext, useGeneralContext } = context;
  const {
    user,
    actions: { setUserData },
  } = useUserContext();
  const {
    countries,
    cities,
    actions: { selectCountryId },
  } = useGeneralContext();

  // HOOKS
  const { useNotification } = libHooks;
  const { setErrorNotification, setSucceedNotification } = useNotification();
  const { useIntersectionObserver, useMedia, useSmoothScroll } = commonHooks;
  const { scrollTo } = useSmoothScroll();
  const rootMarginBottom = useMedia(
    ["(max-width: 767px)", "(max-width: 860px)", "(max-width: 1199px)"],
    ["-160px", "-140px", "-170px"],
    "-200px"
  );

  // STATES
  const [navTrackIndexState, setNavTrackIndexState] = useState<number>(0);
  const country_iso_code = watch("country_iso_code");
  const city_iso_code = watch("city_iso_code");
  const phoneNotification = watch("phone_notification");
  const emailNotification = watch("email_notification");

  // REFS
  const sectionListRef = useRef<React.RefObject<HTMLFieldSetElement>[]>(
    [0, 0, 0, 0].map(() => createRef())
  );

  const observerOptions = {
    root: null,
    rootMargin: `0px 0px ${rootMarginBottom} 0px`,
    threshold: 1,
  };

  useEffect(function registerCustomFields() {
    register("phone_notification");
    register("email_notification");
  }, []);

  useEffect(
    function setInitialData() {
      console.log("user: ", user);
      setValue("first_name", user?.first_name);
      setValue("last_name", user?.last_name);
      setValue("login", user?.login);
      setValue("public_email", user?.public_email);
      setValue("about_me", user?.about_me);
      setValue("email", user?.email);
      setValue("country_iso_code", user?.country_iso_code);
      setValue("city_iso_code", user?.city_iso_code);
      setValue("phone_notification", user?.phone_notification === 1);
      setValue("email_notification", user?.email_notification === 1);
    },
    [user, reset]
  );

  useIntersectionObserver(
    sectionListRef.current,
    observerOptions,
    (results) => {
      let trackIndex = 0;

      results.forEach((result, index) => {
        if (result!.isIntersecting) {
          trackIndex = index;
        }
      });
      setNavTrackIndexState(trackIndex);
    }
  );

  const isChangePasswordFormIsReady = useMemo(() => {
    return !changePasswordIsValid && !changePasswordIsSubmitting;
  }, [changePasswordIsSubmitting, changePasswordIsValid]);

  const handleOnAvatarChange = () => {
    getSelf().then((userResponse) => {
      if (userResponse.status) {
        setUserData(userResponse.payload.data);

        const {
          email_notification,
          phone_notification,
          ...originalData
        } = userResponse.payload.data;

        reset({
          ...originalData,
          email_notification: !!email_notification,
          phone_notification: !!phone_notification,
        });
      }

      setSucceedNotification("Profile was changed");
    });
  };

  const handleDeleteAccount = () => {
    deleteSelf().then((response) => {
      if (response.status) {
        router.push("/");
      }
    });
  };

  const onChangePasswordSumbit = (data: ChangePasswordFormValues) => {
    changeUserPassword({
      newPassword: data.newpassword,
      password: data.oldpassword,
    }).then((changePasswordResponse) => {
      changePasswordReset();

      if (changePasswordResponse.status) {
        setSucceedNotification("Password was changed");
      } else {
        if (changePasswordResponse.message) {
          setErrorNotification(changePasswordResponse.message);
        }
      }
    });
  };

  const onSubmit = (data: EditProfileFormValues) => {
    const {
      social,
      socialmobile,
      socialnickname,
      socialnicknameurl,
      socialurl,
      // Wrong format
      email_notification,
      phone_notification,
      ...actualData
    } = data;
    const formattedActualData: EditProfileRequest = {
      ...actualData,
      email_notification: (email_notification ? 1 : 0) as FakeBoolean,
      phone_notification: (phone_notification ? 1 : 0) as FakeBoolean,
    };
    const dirtyData = getDirtyValues(dirtyFields, formattedActualData);

    // console.log("Submit all: ", formattedActualData);
    // console.log("dirtyFields: ", dirtyFields);
    // console.log("Submit dirty: ", dirtyData);

    changeUserProfile(dirtyData as EditProfileRequest).then((response) => {
      console.log("Change User Profile response: ", response);
      if (!response.status) {
        if (response.message) {
          setErrorNotification(response.message);
        }
      } else {
        handleOnAvatarChange();
      }
    });
  };

  const handleScrollToFieldset = useCallback((index: number) => {
    if (window) {
      const scrollTarget = sectionListRef.current[index];
      let scrollOffset = 380;

      switch (index) {
        case 1:
          scrollOffset = 300;
          break;
        case 2:
          scrollOffset = 420;
          break;
        default:
          break;
      }

      if (scrollTo) {
        scrollTo(scrollTarget, scrollOffset);
      }
    }
  }, []);

  const handleChangePhoneNotification = useCallback(
    (phoneNotificationState: boolean) => {
      setValue("phone_notification", phoneNotificationState, {
        shouldDirty: true,
      });
    },
    [user]
  );
  const handleChangeEmailNotification = useCallback(
    (emailNotificationState: boolean) => {
      setValue("email_notification", emailNotificationState, {
        shouldDirty: true,
      });
    },
    []
  );

  const states = {
    user,
    countries,
    cities,
    navTrackIndexState,
    country_iso_code,
    city_iso_code,
    phoneNotification,
    emailNotification,
  };
  const actions = {
    onSubmit,
    onChangePasswordSumbit,
    handleDeleteAccount,
    handleScrollToFieldset,
    handleOnAvatarChange,
    selectCountryId,
    isChangePasswordFormIsReady,
    handleChangePhoneNotification,
    handleChangeEmailNotification,
  };
  const refs = { sectionListRef };
  const forms = {
    main: { register, handleSubmit, isDirty, isSubmitting, setValue },
    changePassword: {
      changePasswordRegister,
      handleChangePasswordSubmit,
      changePasswordErrors,
    },
  };

  return { states, actions, refs, forms };
};

export default useProfileEditController;
