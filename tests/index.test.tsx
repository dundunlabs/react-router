import { describe, expect, test } from "@rstest/core";
import { render, screen } from '@testing-library/react'
import { createRoutes, RouterProvider } from '../src'

describe('router', () => {
  const Routes = createRoutes([
    {
      path: '/',
      children: [
        {
          Component: () => 'Home'
        },
        {
          path: 'users',
          children: [
            {
              path: 'new',
              element: 'New user'
            },
            {
              path: ':userId',
              element: 'Hello user'
            }
          ]
        }
      ]
    },
    {
      path: 'foo',
      element: 'Foo'
    }
  ])

  const App = () => (
    <RouterProvider>
      <Routes />
    </RouterProvider>
  )
  test('renders correct route', async () => {
    const { rerender } = render(<App />)
    expect(screen.getByText('Home')).toBeInTheDocument()

    history.pushState(null, '', '/foo')
    rerender(<App />)
    expect(screen.getByText('Foo')).toBeInTheDocument()

    history.pushState(null, '', '/users/new')
    rerender(<App />)
    expect(screen.getByText('New user')).toBeInTheDocument()

    history.pushState(null, '', '/users/1')
    rerender(<App />)
    expect(screen.getByText('Hello user')).toBeInTheDocument()
  })
})