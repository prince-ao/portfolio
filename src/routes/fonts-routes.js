import fs from 'fs';

async function routes(fastify, options) {
	fastify.get('/FiraCode-Medium.otf', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/assets/fonts/FiraCode-Medium.otf');
			resp.type('text/otf').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});

	fastify.get('/FiraCode-Regular.ttf', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/assets/fonts/FiraCode-Regular.ttf');
			resp.type('text/tff').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});

	fastify.get('/FiraCode-Regular.woff', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/assets/fonts/FiraCode-Regular.woff');
			resp.type('text/woff').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});

	fastify.get('/FiraCode-Regular.woff2', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/assets/fonts/FiraCode-Regular.woff2');
			resp.type('text/otf').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});
}

export default routes;
