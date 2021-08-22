// Import LAYOUTS
import { WrapperPage, PageResetPassword } from "layouts";

export default function ResetPassword() {
  return (
    <WrapperPage title="Exdating - Reset password">
      <PageResetPassword isEmailConfirmed />
    </WrapperPage>
  );
}
