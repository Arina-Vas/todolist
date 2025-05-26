import {
  GetTasksResponse,
  GetTasksResponseSchema,
  TaskResponse,
  TaskResponseSchema,
  UpdateTaskModel
} from "./tasksApi.types"
import { DefaultResponse, DefaultResponseSchema } from "@/common/types/types.ts"
import { baseApi } from "@/app/baseApi.ts"
import { PAGE_SIZE } from "@/common/constants"



export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, { todolistId: string, params: {page: number } }>({
      query: ({ todolistId, params }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        params: {...params,count: PAGE_SIZE}
      }),
      extraOptions: {dataSchema:GetTasksResponseSchema},
      providesTags: (_res, _error, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    createTask: build.mutation<TaskResponse, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: "POST",
        body: { title }
      }),
      extraOptions: {dataSchema:TaskResponseSchema},
      invalidatesTags: (_res, _error, { todolistId }) => ([{ type: "Task", id: todolistId }])
    }),
    updateTask: build.mutation<TaskResponse, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "PUT",
        body: model
      }),
      extraOptions: {dataSchema:TaskResponseSchema},
      async onQueryStarted({ todolistId, taskId, model }, { dispatch, queryFulfilled, getState }) {
        const cachedArgsForQuery = tasksApi.util.selectCachedArgsForQuery(getState(), 'getTasks')
        let patchResults: any[] = []
        cachedArgsForQuery.forEach(({ params }) => {
          patchResults.push(
            dispatch(
              tasksApi.util.updateQueryData(
                'getTasks',
                { todolistId, params: { page: params.page } },
                state => {
                  const index = state.items.findIndex(task => task.id === taskId)
                  if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...model }
                  }
                }
              )
            )
          )
        })
        try {
          await queryFulfilled
        } catch {
          patchResults.forEach(patchResult => {
            patchResult.undo()
          })
        }
      },
      invalidatesTags: (_res, _error, { todolistId }) => ([{ type: "Task", id: todolistId }])
    }),
    deleteTask: build.mutation<DefaultResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "DELETE"
      }),
      extraOptions: {dataSchema:DefaultResponseSchema},
      invalidatesTags: (_res, _error, { todolistId }) => ([{ type: "Task", id: todolistId }])
    })
  })
})

export const { useUpdateTaskMutation, useDeleteTaskMutation, useCreateTaskMutation, useGetTasksQuery } = tasksApi

