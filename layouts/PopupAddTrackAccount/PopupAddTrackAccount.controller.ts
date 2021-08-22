import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

// Import API
import { addTrack } from "api/tracking";

type Props = {
  close: () => void;
  onClose: (status: boolean) => void;
  initialData?: TrackAccount;
};

const usePopupAddTrackAccountController = ({
  close,
  onClose,
  initialData,
}: Props) => {
  // FROMS
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    // formState: { isDirty, isSubmitting },
  } = useForm<AddTrackAccountFormValues>({
    defaultValues: {
      firstname: "",
      lastname: "",
      city: "",
      country: "",
    },
  });

  const onSubmit = (values: AddTrackAccountFormValues) => {
    console.log("onSubmit", values);

    // addTrack({ network: "vk", nickname: "antoniodecasper" }).then(
    //   (addTrackResponse) => {
    //     if (addTrackResponse.status) {
    //       close();
    //     }

    //     onClose(addTrackResponse.status);
    //   }
    // );
  };

  const actions = { onSubmit };
  const forms = { register, handleSubmit, setValue };

  return { forms, actions };
};

export default usePopupAddTrackAccountController;
