const fastify = require('fastify')({ logger: true });
const fs = require('fs');

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

fastify.get('/css/index.css', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/css/index.css');
		reply.type('text/css').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/images/capital_h.gif', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/assets/images/capital_h.gif');
		reply.type('text/html').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/assets/fonts/FiraCode-Medium.otf', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/assets/fonts/FiraCode-Medium.otf');
		reply.type('text/otf').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/assets/fonts/FiraCode-Regular.ttf', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/assets/fonts/FiraCode-Regular.ttf');
		reply.type('text/tff').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/assets/fonts/FiraCode-Regular.woff', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/assets/fonts/FiraCode-Regular.woff');
		reply.type('text/woff').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/assets/fonts/FiraCode-Regular.woff2', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/assets/fonts/FiraCode-Regular.woff2');
		reply.type('text/otf').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

fastify.get('/assets/documents/prince_addo_resume.pdf', async (request, reply) => {
	try {
		const file = fs.readFileSync('./src/assets/documents/prince_addo_resume.pdf');
		reply.type('text/otf').send(file);
	} catch (err) {
		const error = new Error('Internal Error.');
		reply.code(501).send(error);
	}
});

(async () => {
	try {
		await fastify.listen({ port: 3000 });
	} catch (err) {
		fastify.log.error(err);
		process.exit(1);
	}
})();
