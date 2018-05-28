import express = require("express");
import * as apiRoutes from "./routes/api";

const app: express.Application = express();
const port:any = process.env.PORT || 8001;

app.use("/api", apiRoutes.apiRoutes.router);

// serve the application at the given port
app.listen(port, () => {
    // success callback
    console.log(`Listening at http://localhost:${port}/`);
});