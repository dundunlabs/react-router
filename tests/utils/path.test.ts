import { describe, expect, test } from "@rstest/core";
import { joinPaths } from "../../src/utils/path";

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
})