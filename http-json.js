import http from "http";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `https://${req.headers.host}`);

    if (req.method === "GET" && url.pathname === '/hello') {
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        const name = url.searchParams.get("name");
        res.end(`Hello, ${name}!`)
        return;
    }

    if (req.method === "POST" && url.pathname === '/hello') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', () => {
            try {
                const person = JSON.parse(body);
                res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
                res.end(`Hello, ${person.firstName} ${person.lastName}!`)
            } catch (e) {
                res.writeHead(400, {"Content-Type": "text/plain; charset=utf-8"});
                res.end(`Invalid JSON Response: ${e}`);
            }
        })
        return;
    }

    if (req.method === "POST" && url.pathname === '/feed') {
        let body = ''
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', () => {
            try {
                const person = JSON.parse(body);
                res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"});
                const personFeed={
                    fullName:`${person.firstName} ${person.lastName}`,
                    foods:['Candies','Cookies', 'Cakes']
                }
                res.end(JSON.stringify(personFeed));
            } catch (e) {
                res.writeHead(400, {"Content-Type": "text/plain; charset=utf-8"});
                res.end(`Invalid JSON Response: ${e}`);
            }
        })
        return;
    }

    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("Not Found");
})

server.listen(port, () => {
    console.log(`Listening on port ${port}. Press CTRL+C to finish.`);
})