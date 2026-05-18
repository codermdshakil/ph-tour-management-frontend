import type { IResponse } from "../../../types";
import type {
  ITourTypePayload,
  ITourTypeResponse,
} from "../../../types/auth.type";
import { baseApi } from "../../baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addTourType: builder.mutation<IResponse<ITourTypeResponse>,ITourTypePayload>({
      query: (tourTypeName) => ({
        url: "/tour/create-tour-type",
        method: "POST",
        data: tourTypeName,
      }),
      invalidatesTags:["TOUR"]
    }),

    getTourTypes: builder.query({
      query: () => ({
        url: "/tour/tour-types",
        method: "GET",
      }),
      providesTags:["TOUR"],
      transformResponse: (response) => response.data // get specific data from backend response
    }),


  }),
});

export const { 

  useAddTourTypeMutation,
  useGetTourTypesQuery

} = tourApi;
