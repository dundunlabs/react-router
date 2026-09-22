import { describe, expect, test } from "@rstest/core";
import { indexRoutes } from '../../src/utils/route'

describe('route', () => {
  test('indexRoutes', () => {
    expect(indexRoutes([
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
    ])).toEqual(new Map([
      ['/', [0, 0]],
      ['/users/new', [0, 1, 0]],
      ['/users/:userId', [0, 1, 1]],
      ['/home', [0, 2]],
      ['/foo', [1]],
    ]))
  })
})