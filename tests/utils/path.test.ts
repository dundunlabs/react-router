import { describe, expect, test } from "@rstest/core";
import { joinPaths, matchPath } from "../../src/utils/path";

describe('path', () => {
  test.each([
    {
      segments: [],
      expected: '/'
    },
    {
      segments: ['foo'],
      expected: '/foo'
    },
    {
      segments: ['foo', 'bar'],
      expected: '/foo/bar'
    },
    {
      segments: ['foo/', '/bar//', '/baz'],
      expected: '/foo/bar/baz'
    },
    {
      segments: ['foo', '', 'bar', '/', 'baz'],
      expected: '/foo/bar/baz'
    }
  ])('joinPaths $segments', ({ segments, expected }) => {
    expect(joinPaths(...segments)).toBe(expected)
  })

  test.each([
    {
      path: '/',
      pathname: '/foo',
      expected: null
    },
    {
      path: '/foo',
      pathname: '/foo',
      expected: {}
    },
    {
      path: '/stories/:storyId',
      pathname: '/stories/1',
      expected: { storyId: "1" }
    },
    {
      path: '/stories/:storyId/comments/:commentId',
      pathname: '/stories/1/comments/2',
      expected: { storyId: "1", commentId: "2" }
    }
  ])('matchPath $path with $pathname', ({ path, pathname, expected }) => {
    expect(matchPath(path, pathname)).toEqual(expected)
  })
})