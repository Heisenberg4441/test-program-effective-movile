import { port, server } from "..";

server.listen(port, () => {
    console.log(`Server started, port: ${port}`);
});

server.use('/', async (req, res) => {
    console.log(`Not found: endpoints with point ${req.originalUrl}, and method ${req.method}`);
    res.statusCode = 404;
    res.send('Not found!');
});