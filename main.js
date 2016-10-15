window.addEventListener('load', e => {
	const settings = {
		rows: 3,
		querySelector: ".container"
	}
	const grid = new Grid(settings);
	document.getElementById('add_row').addEventListener('click', grid.addRow.bind(grid), false);
	document.querySelector('#add_multiple_rows button').addEventListener('click', addMultipleRows.bind(grid), false);
	document.querySelector('#add_multiple_rows input[type=number]').addEventListener('keydown', addMultipleRows.bind(grid), false);

	Array.from(document.querySelectorAll('input')).forEach(input => {
		input.addEventListener('paste', e => {
			e.preventDefault();
			e.stopPropagation();
			addData(e.currentTarget, e.clipboardData.getData('Text'));
			return false;
		});
	});
});

function addMultipleRows (e) {
	if (e.type === 'keydown' && e.keyCode !== 13) {return false;}
	this.addRows(document.querySelector('#add_multiple_rows input[type=number]').value);
}

function addData (input, text) {
	console.time('addData');
	let [rowInput, columnInput] = [
		parseInt(input.dataset.row),
		parseInt(input.dataset.column)
	];

	let cells = [];
	let rows = text
		.split('\n')
		.forEach((row, index) => {
			cells[index] = row.split('\t');
		});
	rows = null;

	cells.forEach((rowData, indexRow) => {
		rowData.forEach((value, indexColumn) => {
			let query = `input[data-row="${indexRow + rowInput}"][data-column="${indexColumn + columnInput}"]`;
			let el = document.querySelector(query);
			if (el) {
				el.value = value;
			}
		});
	});
	console.timeEnd('addData');
}