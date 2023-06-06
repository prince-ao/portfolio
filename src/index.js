const fastify = require('fastify')({ logger: true });
const fs = require('node:fs');
const path = require('node:path')
const fstatic = require('@fastify/static');
const { readdirSync } = require('node:fs');

let visitors = 0;
let uniqueVisits = 0;
const ips = [];

fastify.get('/', async (request, reply) => {
	try {
		fastify.log.info(`new visitor, total visitors: ${++visitors}`);
		if (ips.indexOf(request.ip) == -1) {
			ips.push(request.ip);
			fastify.log.info(
				`the visitor was unique! ip: ${request.ip}, total unique visits: ${++uniqueVisits}`
			);
		}

		fs.writeFile('/var/lib/visitors.txt', ips.toString(), 'utf8', (err) => {
			if (err) fastify.log.info('ip file was not saved');
		});

		fs.writeFile('/var/lib/uniqueVisitors.txt', String(uniqueVisits), 'utf8', (err) => {
			if (err) fastify.log.info('ip file was not saved');
		});

		const file = fs.readFileSync('./src/index.html');
		reply.type('text/html').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(err);
	}
});


fastify.get('/contact', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/pages/contact.html');
		reply.type('text/html').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/projects', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/pages/projects.html');
		reply.type('text/html').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.register(fstatic, {
	root: path.join(__dirname, 'css'),
	prefix: "/css",
	decorateReply: false
});

fastify.register(fstatic, {
	root: path.join(__dirname, 'assets', 'images'),
	prefix: "/images",
	decorateReply: false
});

fastify.register(fstatic, {
	root: path.join(__dirname, 'assets', 'fonts'),
	prefix: "/fonts",
	decorateReply: false
});

fastify.register(fstatic, {
	root: path.join(__dirname, 'assets', 'documents'),
	prefix: "/documents",
	decorateReply: false
});

for(let page of readdirSync(path.join(__dirname, 'pages', 'projects'))) {
	if(page === '.' || page === '..') continue;
	fastify.log.info(page)
	fastify.get(`/projects/${page.split(".")[0]}`, (req, res) => {
		const file = fs.readFileSync(path.join(__dirname, 'pages', 'projects', page));
		return res.type('text/html').send(file);
	});
}

(async () => {
	try {
		await fastify.listen({ port: 3000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
