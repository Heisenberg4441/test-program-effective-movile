import {server} from '..';


server.use(".*", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "auth,content-type,init-data");
});

server.options(".*", async (req, res) => {
    res.setHeader('Access-Control-Allow-Methods', "*");
    res.setHeader('Access-Control-Request-Headers', "auth,content-type");
    res.setHeader('Access-Control-Allow-Headers', "auth,content-type");
    res.sendStatus(200);
});