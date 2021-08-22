import { useEffect, FormEvent, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

// Import API
import { createFeedback } from "api/feedbacks";
import { getPopularHashtags } from "api/general";

// Import UTILS
import { commonHooks } from "hooks";
import { validation } from "utils";

const useAddFeedbackController = () => {
  const router = useRouter();

  // UTILS
  const { useDimension } = commonHooks;
  const { width } = useDimension();

  // STATES
  const [popularHashtagList, setPopularHashtagList] = useState<
    HashtagPopular[]
  >([]);

  // FORMS
  const {
    register,
    handleSubmit,
    setValue,
    errors,
  } = useForm<AddFeedbackFormValues>({
    defaultValues: {
      description: "",
      title: "",
      city_iso_code: "",
      country_iso_code: "",
      first_name: "",
      last_name: "",
      is_anonymous: false,
      hashtags: "",
      terms: false,
      images: [],
      is_draft: true,
    },
    resolver: yupResolver(validation.createNewFeedbackSchema),
  });

  useEffect(() => {
    console.log("errors: ", errors);
  }, [errors]);
  useEffect(function registerCustomFields() {
    register({ name: "images" });
    register({ name: "is_draft" });
    register({ name: "description" });
  }, []);

  useEffect(function getPopularHashtagsFetcher() {
    getPopularHashtags().then((popularHashtagsResponse) => {
      console.log("popularHashtagsResponse: ", popularHashtagsResponse);
      if (popularHashtagsResponse.status) {
        setPopularHashtagList(popularHashtagsResponse.payload.data);
      }
    });
  }, []);

  const onSubmit = (values: AddFeedbackFormValues) => {
    const {
      first_name,
      last_name,
      terms,
      hashtags,
      images,
      is_draft,
      is_anonymous,
      ...otherData
    } = values;

    console.log("onSubmit values: ", values);

    const preview = otherData.description.slice(0, 150);
    const hashtagsFormatted: Hashtag[] = !hashtags
      ? []
      : hashtags
          .split(",")
          .map((hashtag) => ({ name: hashtag.trim().toUpperCase() }));
    const imagesFormatted: Image[] = images.map((image) => ({ file: image }));
    const requestData = {
      ...otherData,
      is_draft: (is_draft ? 1 : 0) as FakeBoolean,
      is_anonymous: (is_anonymous ? 1 : 0) as FakeBoolean,
      preview,
      // hashtags: hashtagsFormatted,
      images: imagesFormatted,
    };

    console.log("requestData: ", requestData);

    createFeedback(requestData).then((feedbackResponse) => {
      console.log("feedbackResponse: ", feedbackResponse);
      if (feedbackResponse.status) {
        router.push("/profile");
      }
    });
  };

  const submitForm = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // @ts-ignore: nativeEvent in React doesn't have submitter filed but in real life it does
      const submitBtnName = e.nativeEvent.submitter.name;

      setValue("is_draft", submitBtnName === "draft");

      handleSubmit(onSubmit)(e);
    },
    [handleSubmit, onSubmit, setValue]
  );

  const handleChangeDescription = useCallback((value: string) => {
    setValue("description", value);
  }, []);

  const states = { width, popularHashtagList };
  const actions = { submitForm, handleChangeDescription };
  const forms = { register, setValue, errors };

  return { forms, actions, states };
};

export default useAddFeedbackController;
