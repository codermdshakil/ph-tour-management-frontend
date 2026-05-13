import type { IResponse } from "../../../types";
import type { ILoginPayload, IRegisterPayload, ISentOtpPayload, IUserLogin, IUserRegister } from "../../../types/auth.type";
import { baseApi } from "../../baseApi";



export const authApi = baseApi.injectEndpoints({
   endpoints:(builder) => ({

    login: builder.mutation<IResponse<IUserLogin>, ILoginPayload>({
      query:(userInfo) => ({
        url:"/auth/login",
        method:"POST",
        data:userInfo
      })
    }),

    register: builder.mutation<IResponse<IUserRegister>, IRegisterPayload>({
      query:(userInfo) => ({
        url:"/user/register",
        method:"POST",
        data:userInfo
      })
    }),

    sendOtp: builder.mutation<IResponse<null>, ISentOtpPayload>({
      query:(userInfo) => ({
        url:"/otp/send",
        method:"POST",
        data:userInfo
      })
    }),
  

   })
});

export const {useRegisterMutation, useLoginMutation, useSendOtpMutation} = authApi