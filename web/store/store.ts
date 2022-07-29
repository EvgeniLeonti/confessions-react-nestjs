import {configureStore, isRejectedWithValue, Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import counterReducer from '../store/counter.state'
import authReducer, {unsetAccessToken} from '../store/auth.state'
import toastReducer, {pushNotification} from '../store/toast.state'
import {confessionApi} from "./api";

const customMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
  console.log('apiMiddleware action', action)
    const {accessToken, user} = (store.getState() as RootState).auth


    if (action.type === "auth/setAccessToken") {
      // api.dispatch(pushNotification({message: 'successful login', options: { variant: 'success' } }))
    }
    if (action.type === "auth/unsetAccessToken") {
      // api.dispatch(pushNotification({message: 'successful logout', options: { variant: 'success' } }))
    }
    if (action.type === "auth/setAccessToken") {
      localStorage.setItem('accessToken', action.payload);
    }
    else if (action.type === "auth/unsetAccessToken") {
      localStorage.removeItem('accessToken');
    }
    else if (action.type.indexOf('/executeQuery/') > -1 || action.type.indexOf('/executeMutation/') > -1) {

      if (isRejectedWithValue(action) && action.payload) {
        const {data, statusCode} = action.payload;
        switch (statusCode) {
          case 200:
            break;
          default:
            console.log('uknown action', action)
            api.dispatch(pushNotification({message: data?.message || 'Unknown error', options: { variant: 'error' } }))

        }
      }

      // unset access token if needed
      if (accessToken) {
        if (isRejectedWithValue(action)) {
          if (action.payload.status === 401) {
            api.dispatch(unsetAccessToken())
          }
        }

        if (user) {
          const expiresIn = user.exp - ((new Date().valueOf()) / 1000);
          // console.log('expiresIn', expiresIn)
          if (new Date().valueOf() / 1000 > user.exp) {
            console.warn('parsedAccessToken exp')
            api.dispatch(unsetAccessToken())
          }
        }
      }



    }

    return next(action)
  }

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    toast: toastReducer,

    // Add the generated reducer as a specific top-level slice
    [confessionApi.reducerPath]: confessionApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(confessionApi.middleware, customMiddleware),

})



// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
