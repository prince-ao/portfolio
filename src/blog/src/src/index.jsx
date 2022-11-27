import { useState } from 'react';
import * as ReactDOM from 'react-dom';

const Blog = () => {
	const [alive, setAlive] = useState(false);
	const blogs = [
		{ title: 'Hello', subtitle: 'Hello Again', post: 'blah, blah, blah. Me, me, me.' },
		{ title: 'Goodbye', subtitle: 'Hello Again', post: 'blah, blah, blah. Me, me, me.' },
	];
	return (
		<div>
			{alive ? (
				<div>
					{blogs.map((post) => {
						return (
							<div>
								<h1>{post.title}</h1>
								<button onClick={setAlive(true)}>click me</button>
							</div>
						);
					})}
				</div>
			) : (
				<div>Sorry Not alive</div>
			)}
		</div>
	);
};

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(Blog());
