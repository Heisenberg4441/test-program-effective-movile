import * as express from "express";

export const server = express();
export const port = 3000;

server.use(express.json({ limit: '15mb' }));

import './endpoints/security';
import './endpoints/private';
import './endpoints/public';
import './endpoints/eventHandler.ts';