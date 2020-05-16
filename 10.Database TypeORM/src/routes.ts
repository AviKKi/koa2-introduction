import { getHome, getPost, getPostCreate } from "./controllers";

export const AppRoutes = [
    {
        'path': '/',
        'method': 'get',
        'action': getHome
    },{
        'path': '/post/:id',
        'method': 'get',
        'action': getPost
    },{
        'path': '/create',
        'method': 'get',
        'action': getPostCreate
    },{
        'path': '/create',
        'method': 'post',
        'action': getPostCreate
    },
]