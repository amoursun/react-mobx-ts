import { createRoutes } from 'utils/core'; // eslint-disable-line

import Home from 'module/Home';

const routesConfig = () => [
    {
        path: '/',
        exact: true,
        component: Home,
        indexRoute: '/home',
    }
];

export default () => createRoutes(routesConfig);
