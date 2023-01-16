const fs = require('fs');

async function routes(fastify, options) {
	fastify.get('/', async (request, reply) => {
		try {
			const file = fs.readFileSync('./src/pages/projects.html');
			reply.type('text/html').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			reply.code(501).send(error);
		}
	});

	fastify.get('/animelazerv3', async (request, reply) => {
		try {
			const file = fs.readFileSync('./src/pages/projects/animelazerv3.html');
			reply.type('text/html').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			reply.code(501).send(error);
		}
	});

	fastify.get('/consumet', async (request, reply) => {
		try {
			const file = fs.readFileSync('./src/pages/projects/consumet.html');
			reply.type('text/html').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			reply.code(501).send(error);
		}
	});

	fastify.get('/samizdat', async (request, reply) => {
		try {
			const file = fs.readFileSync('./src/pages/projects/samizdat.html');
			reply.type('text/html').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			reply.code(501).send(error);
		}
	});
}

module.exports = routes;
