import { describe, expect, test } from "@rstest/core";
import { render, screen } from '@testing-library/react'
import { BrowserRouter, createRoutes, RouterProvider } from '../src'

describe('router', () => {
  const router = new BrowserRouter()
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
    <RouterProvider router={router}>
      <Routes />
    </RouterProvider>
  )
  test('renders correct route', async () => {
    render(<App />)
    expect(await screen.findByText('Home')).toBeInTheDocument()

    router.push('/foo')
    expect(await screen.findByText('Foo')).toBeInTheDocument()

    router.replace('/users/new')
    expect(await screen.findByText('New user')).toBeInTheDocument()

    router.push('/users/1')
    expect(await screen.findByText('Hello user')).toBeInTheDocument()
  })
})