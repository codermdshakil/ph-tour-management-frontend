import { baseApi } from "../../baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addDivision: builder.mutation({
      query: (divisionData) => ({
        url: "/division/create",
        method: "POST",
        data: divisionData,
      }),
      invalidatesTags: ["DIVISION"],
    }),

    getAllDivision: builder.query({
      query: () => ({
        url: "/division/",
        method: "GET",
      }),
      providesTags: ["DIVISION"],
      transformResponse: (response) => response.data, // get specific data from backend response
    }),
  }),
});

export const { useAddDivisionMutation, useGetAllDivisionQuery } = divisionApi;
