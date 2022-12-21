import fs from 'fs';

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
}

export default routes;
