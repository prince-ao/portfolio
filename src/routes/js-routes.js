const fs = require('fs');

async function routes(fastify, options) {
	fastify.get('/blog-render.js', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/blog/blog-render.js');
			resp.type('application/javascript').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});

	fastify.get('/blog.js', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/blog/blog-data.js');
			resp.type('application/javascript').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});
}

module.exports = routes;
