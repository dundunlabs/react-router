import { describe, expect, test } from "@rstest/core";
import { indexRoutes, matchRouteIndexes } from '../../src/utils/route'

describe('route', () => {
  const routes = [
    {
      children: [
        {},
        {
          path: 'users',
          children: [
            { path: 'new' },
            { path: ':userId' }
          ]
        },
        { path: 'home' }
      ]
    },
    {
      path: 'foo'
    }
  ]

  const routeIndexes = new Map([
    ['/', [0, 0]],
    ['/users/new', [0, 1, 0]],
    ['/users/:userId', [0, 1, 1]],
    ['/home', [0, 2]],
    ['/foo', [1]],
  ])

  test('indexRoutes', () => {
    expect(indexRoutes(routes)).toEqual(routeIndexes)
  })

  test.each([
    {
      pathname: '/',
      expected: { path: '/', indexes: [0, 0], params: {} }
    },
    {
      pathname: '/users',
      expected: null
    },
    {
      pathname: '/users/1',
      expected: { path: '/users/:userId', indexes: [0, 1, 1], params: { userId: '1' } }
    },
    {
      pathname: '/users/new',
      expected: { path: '/users/new', indexes: [0, 1, 0], params: {} }
    },
    {
      pathname: '/home',
      expected: { path: '/home', indexes: [0, 2], params: {} }
    },
    {
      pathname: '/foo',
      expected: { path: '/foo', indexes: [1], params: {} }
    }
  ])('matchRouteIndexes $pathname', ({ pathname, expected }) => {
    expect(matchRouteIndexes(routeIndexes, pathname)).toEqual(expected)
  })
})