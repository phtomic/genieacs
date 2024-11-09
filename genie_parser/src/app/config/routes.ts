"use strict";

import ApiController from "../controllers/ApiController";

export class Routes {
    public starts: Array<string> = ["Api"]
    public api?: Object;
    public redirects?: Object;
    constructor() {
        this.api = {
            middleware: [],
            routes: {
                '': {
                    GET: {
                        "/devices": [ApiController, "buscar_dispositivo"],
                    },
                    POST: {
                        "/devices": [ApiController, "alterar_dispositivo"],
                    }
                }
            }
        };
    }
}
