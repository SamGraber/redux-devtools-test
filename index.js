
var withDevTools = (
  // process.env.NODE_ENV === 'development' &&
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
);

let devTools;
let unsubscribe;
let state = { counter: 0 };
renderState();

if (withDevTools) {
	devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
	unsubscribe = devTools.subscribe((message) => {
		// Implement monitors actions.
		// For example time traveling:
		if (message.type === 'DISPATCH' && message.payload.type === 'JUMP_TO_ACTION') {
			// this.setState(message.state);
			state = JSON.parse(message.state);
			renderState();
			console.log(message);
		}
	});
}

document.getElementById('addButton').addEventListener('click', function() {
	state = { counter: state.counter + 1 };
	renderState();
	if (withDevTools) {
		devTools.send('add', state);
	}
});

function renderState() {
	document.getElementById('display').innerHTML = 'Counter: ' + state.counter;
}

