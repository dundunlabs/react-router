import { describe, expect, test } from "@rstest/core";
import { act, fireEvent, render, screen } from '@testing-library/react'
import { BrowserRouter, createRoutes, Link, Redirect, RouterProvider, useParams } from '../src'

describe('router', () => {
  const router = new BrowserRouter()
  const Routes = createRoutes([
    {
      path: '/',
      children: [
        {
          Component: () => (
            <nav>
              <Link to='/users/new'>Create user</Link>
              <Link to='/users'>Visit first user</Link>
            </nav>
          )
        },
        {
          path: 'users',
          children: [
            {
              element: <Redirect to='/users/1' replace />
            },
            {
              path: 'new',
              element: <Link to={-1}>Back</Link>
            },
            {
              path: ':userId',
              Component: () => {
                const { userId } = useParams()
                return 'Hello user ' + userId
              }
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
    const newUser = await screen.findByRole('link', { name: 'Create user' })
    expect(newUser).toHaveAttribute('href', '/users/new')

    fireEvent.click(newUser)
    const back = await screen.findByRole('button', { name: 'Back' })
    expect(back).toBeInTheDocument()

    fireEvent.click(back)
    const firstUser = await screen.findByRole('link', { name: 'Visit first user' })
    fireEvent.click(firstUser)
    expect(await screen.findByText('Hello user 1')).toBeInTheDocument()
  })
})