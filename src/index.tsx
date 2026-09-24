import Routes from './components/Routes';
import { Route } from './types';

export { default as BrowserRouter } from './routers/BrowserRouter';

export { default as RouterProvider } from './components/RouterProvider';
export { default as Outlet } from './components/Outlet';
export { default as Link } from './components/Link';
export { default as Redirect } from './components/Redirect';

export { useRouter } from './contexts/RouterContext';
export { useParams } from './contexts/ParamsContext';


export const createRoutes = (routes: Route[]) => () => <Routes routes={routes} />