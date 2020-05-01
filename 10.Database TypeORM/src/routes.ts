import { getHome } from "./controllers";

export const AppRoutes = [
    {
        'path': '/',
        'method': 'get',
        'action': getHome
    },
]