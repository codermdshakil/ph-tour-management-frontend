import type { IResponse } from "../../../types";
import type {
  ILoginPayload,
  IRegisterPayload,
  ISentOtpPayload,
  IUserLogin,
  IUserRegister,
  IVerifyOtpPayload,
} from "../../../types/auth.type";
import { baseApi } from "../../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<IUserLogin>, ILoginPayload>({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      })
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags:["USER"]
    }),

    register: builder.mutation<IResponse<IUserRegister>, IRegisterPayload>({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    sendOtp: builder.mutation<IResponse<null>, ISentOtpPayload>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtpPayload>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags:["USER"]
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery
} = authApi;
