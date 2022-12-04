'use strict';

function Card({ title, description, date, blog }) {
	const [hover, setHover] = React.useState(false);
	const [viewState, setViewState] = React.useState({
		type: false,
		title: '',
		description: '',
		date: '',
		blog: '',
	});

	const nhstyle = {
		backgroundColor: '#000',
		width: '50%',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: '20px',
		marginTop: '30px',
	};

	const hstyle = {
		backgroundColor: '#000',
		width: '50%',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		paddingLeft: '20px',
		marginTop: '30px',
		cursor: 'pointer',
	};

	function calculateTime(text) {
		const avgWpm = 300;
		let wordCounter = 1;
		for (let i = 0; i < text.length; i++) {
			if (text[i] == ' ') wordCounter++;
		}
		return `${(wordCounter / avgWpm).toFixed(3)} min`;
	}

	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'column',
			}}>
			{viewState.type ? (
				<div style={{ marginTop: '20px' }}>
					<button
						onClick={() =>
							setViewState({ type: false, title: '', description: '', date: '', blog: '' })
						}>
						Back
					</button>
					<div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
						<h1>{viewState.title}</h1>
						<h3>{viewState.description}</h3>
						<p>
							{viewState.date} • {calculateTime(viewState.blog)}
						</p>
						<div
							dangerouslySetInnerHTML={{ __html: viewState.blog }}
							style={{ fontSize: '20px', width: '70vw' }}></div>
					</div>
				</div>
			) : (
				<div
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onClick={() => setViewState({ type: true, title, description, date, blog })}
					style={hover ? hstyle : nhstyle}>
					<h1>{title}</h1>
					<h3>{description}</h3>
					<p>{date}</p>
				</div>
			)}
		</div>
	);
}

function Blog() {
	return (
		<div>
			{blogs.reverse().map(({ title, description, date, blog }, i) => {
				return <Card title={title} description={description} date={date} blog={blog} key={i} />;
			})}
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('main'));
root.render(<Blog />);
