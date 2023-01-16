const fastify = require('fastify')({ logger: true });
const fs = require('fs');
const css = require('./routes/css-routes.js');
const images = require('./routes/images-routes.js');
const fonts = require('./routes/fonts-routes.js');
const documents = require('./routes/documents-routes.js');
const javascript = require('./routes/js-routes.js');
const projects = require('./routes/projects-routes.js');

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

/*fastify.get('/blog', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/pages/blog.html');
		reply.type('text/html').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});*/

fastify.get('/contact', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/pages/contact.html');
		reply.type('text/html').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.register(css, { prefix: '/css' });
fastify.register(images, { prefix: '/images' });
fastify.register(fonts, { prefix: '/fonts' });
fastify.register(documents, { prefix: '/documents' });
fastify.register(javascript, { prefix: '/javascript' });
fastify.register(projects, { prefix: '/projects' });


(async () => {
	try {
		await fastify.listen({ port: 3000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
