import React from 'react'

import Login from '../pages/Login'
import Event from '../pages/Event'
import News from '../pages/News'
import Counter from '../pages/Counter'
import Pokemon from '../pages/Pokemon'

export interface IRoute {
  path: string
  component: React.ComponentType
  exact?: boolean
  children?: IRoute[]
  name?: string
}

export enum RouteNames {
  LOGIN = '/login',
  COUNTER = '/counter',
  EVENT = '/event', 
  POKEMON = '/pokemon',
  NEWS = '/',
}

export const publicRoutes: IRoute[] = [
  {
    path: RouteNames.LOGIN,
    exact: true,
    component: Login,
    name: 'Login',
  },
]

export const privateRoutes: IRoute[] = [
  {
    path: RouteNames.NEWS,
    exact: true,
    component: News,
    name: 'News',
  },
  {
    path: RouteNames.EVENT,
    exact: true,
    component: Event,
    name: 'Event',
  },
  {
    path: RouteNames.COUNTER,
    exact: true,
    component: Counter,
    name: 'Counter',
  },
  {
    path: RouteNames.POKEMON,
    exact: true,
    component: Pokemon,
    name: 'Pokemon',
  },
]
