import {
  TodolistResponse,
  TodolistResponseSchema,
  Todolists,
  TodolistSchema
} from "@/features/todolists/api/todolistsApi.types.ts"
import { DefaultResponse, DefaultResponseSchema } from "@/common/types/types.ts"
import { baseApi } from "@/app/baseApi.ts"
import { TodoListType } from "@/features/todolists/lib"


export const todolistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<TodoListType[], void>({
      providesTags: ["Todolist"],
      query: () => "/todo-lists",
      transformResponse: (todolists: Todolists[]): TodoListType[] => todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle"
      })),
      extraOptions: {dataSchema:TodolistSchema.array()}
    }),
    createTodolist:build.mutation<TodolistResponse, string>({
      query: (title) => ({
        url: `/todo-lists`,
        method: "POST",
        body: { title }
      }),
      invalidatesTags: ["Todolist"],
      extraOptions: {dataSchema:TodolistResponseSchema}
    }),
    changeTodolistTitle: build.mutation<DefaultResponse, { id: string; title: string }>({
      query: ({ title, id }) => ({
        url: `/todo-lists/${id}`,
        method: "PUT",
        body: { title }
      }),
      invalidatesTags: ["Todolist"],
      extraOptions: {dataSchema:DefaultResponseSchema}
    }),
    deleteTodolist: build.mutation<DefaultResponse, string>({
      query: ( id ) => ({
        url: `/todo-lists/${id}`,
        method: "DELETE"
      }),
      extraOptions: {dataSchema:DefaultResponseSchema},
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistApi.util.updateQueryData('getTodolists', undefined, state => {
            const index = state.findIndex(todolist => todolist.id === id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Todolist"],
    }),
  })
})

export const {useGetTodolistsQuery, useCreateTodolistMutation,useDeleteTodolistMutation,useChangeTodolistTitleMutation} = todolistApi


