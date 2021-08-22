/* ====== NEXTJS RESPONSES ====== */
type GetServerSideResponse<T> = {
  props: T;
  redirect?: { permanent: boolean; destination: string };
};

/* ====== BASIC RESPONSES ====== */

interface SucceedDefaultResponse {
  status: true;
}
//  ------------------------------------------------
interface AuthResponse extends SucceedDefaultResponse {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

interface SignupResponse extends SucceedDefaultResponse {
  type: "email" | "phone";
}
/* =========== AUTH ================== */
interface RestorePasswordResponse
  extends SucceedDefaultResponse,
    RestorePasswordConfirmationCode {}
/* =========== USER ================== */
interface SelfResponse
  extends SucceedDefaultResponse,
    ResponseWithData<UserSelf> {}
interface UserProfileResponse
  extends SucceedDefaultResponse,
    ResponseWithData<UserProfile> {}
interface TopUserResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<UserTop[]> {}
/* =========== SUBSCRIBE ================== */
// TODO Поменять типы UserSubscription и UserSubscriber местами как бек поправит апи
interface SubscribersListResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<UserSubscription[]> {}
interface SubscriptionListResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<UserSubscriber[]> {}
/* =========== CITY, COUNTRY ================== */
interface CountryResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<Country[]> {}

interface CityResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<City[]> {}
/* =========== FEEDBACKS ================== */
interface FeedbackResponse
  extends SucceedDefaultResponse,
    ResponseWithData<Feedback> {}

interface FeedbackBestResponse
  extends SucceedDefaultResponse,
    ResponseWithData<FeedbackBest[]> {}

interface FeedbackLikeResponse extends SucceedDefaultResponse, Like {}
interface FeedbackNotDecideResponse extends SucceedDefaultResponse, NotDecide {}
interface FeedbackDislikeResponse extends SucceedDefaultResponse, Dislike {}

interface FeedbacksAllResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<FeedbackBest[]> {}
/* =========== SEARCH ================== */
interface SearchGlobalResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<FeedbackSearch[]> {}
/* =========== TRACK ACCOUNT ================== */
interface TrackingResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<TrackAccount[]> {}
interface AddTrackingResponse extends SucceedDefaultResponse {}
/* =========== AVATAR ================== */
interface AvatarResponse extends SucceedDefaultResponse {
  url: string;
}
/* =========== NOTIFICATIONS ================== */
interface NotificationsResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<[]> {}
/* =========== COMMENTS ================== */
interface BestCommentsResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<ECommentBase[]> {}
interface FeedbackCommentsResponse
  extends SucceedDefaultResponse,
    ResponseWithDataList<EComment[]> {}
/* =========== HASHTAGS ================== */
interface PopularHashtagsResponse
  extends SucceedDefaultResponse,
    ResponseWithData<HashtagPopular[]> {}
