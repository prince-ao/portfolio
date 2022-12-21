import fs from 'fs';

async function routes(fastify, options) {
	fastify.get('/index.css', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/css/index.css');
			resp.type('text/css').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});

	fastify.get('/projects.css', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/css/projects.css');
			resp.type('text/css').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});
}

export default routes;
