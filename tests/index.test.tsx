import { describe, expect, test } from "@rstest/core";
import { fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, createRoutes, Link, RouterProvider } from '../src'

describe('router', () => {
  const router = new BrowserRouter()
  const Routes = createRoutes([
    {
      path: '/',
      children: [
        {
          Component: () => <Link to='/users/1'>Visit user 1</Link>
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
    const linkToUser1 = await screen.findByRole('link', { name: 'Visit user 1' })
    expect(linkToUser1).toHaveAttribute('href', '/users/1')

    fireEvent.click(linkToUser1)
    expect(await screen.findByText('Hello user')).toBeInTheDocument()

    router.push('/foo')
    expect(await screen.findByText('Foo')).toBeInTheDocument()

    router.replace('/users/new')
    expect(await screen.findByText('New user')).toBeInTheDocument()

  })
})