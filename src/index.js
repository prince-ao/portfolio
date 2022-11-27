import Fastify from 'fastify';
import fs from 'fs';
import css from './routes/css-routes.js';
import images from './routes/images-routes.js';
import fonts from './routes/fonts-routes.js';
import documents from './routes/documents-routes.js';
import javascript from './routes/js-routes.js';

const fastify = Fastify({ logger: true });

fastify.get('/', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/index.html');
		reply.type('text/html').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/blog', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/pages/blog.html');
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

(async () => {
	try {
		await fastify.listen({ port: 3000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
