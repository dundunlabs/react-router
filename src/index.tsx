import Routes from './components/Routes';
import { Route } from './types';

export { default as RouterProvider } from './components/RouterProvider';
export { default as Link } from './components/Link';

export { default as BrowserRouter } from './routers/BrowserRouter';

export const createRoutes = (routes: Route[]) => () => <Routes routes={routes} />