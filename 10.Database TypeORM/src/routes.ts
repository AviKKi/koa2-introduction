import { getHome, getPost } from "./controllers";

export const AppRoutes = [
    {
        'path': '/',
        'method': 'get',
        'action': getHome
    },{
        'path': '/post/:id',
        'method': 'get',
        'action': getPost
    },
]