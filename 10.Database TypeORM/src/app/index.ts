import * as Koa from 'koa';
import * as Router from 'koa-router'
import * as koaBody from 'koa-body'
import * as views from 'koa-views'
const path = require('path')

import { AppRoutes } from '../routes'

const app: Koa = new Koa()

const router = new Router()
// Register each app route
AppRoutes.forEach(
    route => router[route.method](route.path, route.action)
)

app.use(koaBody())
app.use(views(path.join(__dirname, '../views'), { extension: 'ejs' }))
app.use(router.routes())


export default app