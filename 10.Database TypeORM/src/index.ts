import "reflect-metadata";
import { createConnection } from "typeorm";

import app from './app'

createConnection().then(async connection => {

    app.listen(3000, () => console.log("listening at port 3000"))

}).catch(error => console.log(error));
