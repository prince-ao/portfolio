import fs from 'fs';

async function routes(fastify, options) {
	fastify.get('/prince_addo_resume.pdf', async (req, resp) => {
		try {
			const file = fs.readFileSync('./src/assets/documents/prince_addo_resume.pdf');
			resp.type('application/pdf').send(file);
		} catch (err) {
			const error = new Error('Internal Error.');
			resp.code(501).send(error);
		}
	});
}

export default routes;
