import fs from 'fs';

async function routes(fastify, options) {
	fastify.get('/capital_h.gif', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/assets/images/capital_h.gif');
			resp.type('image/gif').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});

	fastify.get('/favicon.ico', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/assets/images/favicons/favicon.ico');
			resp.type('image/x-icon').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});
}

export default routes;
