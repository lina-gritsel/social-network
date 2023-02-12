import { Action, AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import rootReducer from '../reducers'
import store from '..'

export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>,
> = ThunkAction<R, AppStateType, unknown, A>

type RootReducerType = typeof rootReducer

export type RootState = ReturnType<typeof rootReducer>
export type AppStateType = ReturnType<RootReducerType>
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>
export type AppDispatch = typeof store.dispatch
