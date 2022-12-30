import Fastify from 'fastify';
import fs from 'fs';
import css from './routes/css-routes.js';
import images from './routes/images-routes.js';
import fonts from './routes/fonts-routes.js';
import documents from './routes/documents-routes.js';
import javascript from './routes/js-routes.js';
import projects from './routes/projects-routes.js';

const fastify = Fastify({ logger: true });
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
