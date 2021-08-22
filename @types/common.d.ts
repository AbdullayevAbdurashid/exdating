// REACT-HOOK-FORM
type RefReturn =
  | string
  | ((instance: HTMLInputElement | null) => void)
  | React.RefObject<HTMLInputElement>
  | null
  | undefined;

type ReactHookFormRegister = () => RefReturn;

// SIMPLE
type SortFilter = "views_count" | "likes_count";
type FakeBoolean = 0 | 1;
