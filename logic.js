function myFunction() {
	var x = document.createElement("TABLE");
	x.setAttribute("id", "myTable");
	document.body.appendChild(x);

	for (let row = 0; row < 9; row++) {
		var y = document.createElement("TR");
		y.setAttribute("id", `myTr${row}`);
		document.getElementById("myTable").appendChild(y);
		for (let col = 0; col < 9; col++) {
			var inputTag = `<input type='number' id='digit${row}${col}' onchange='gridUpdate(${row},${col})' />`;
			var z = document.createElement("TD");
			z.innerHTML = inputTag;
			document.getElementById(`myTr${row}`).appendChild(z);
		}
	}
	grid = [];
	for (let row = 0; row < 9; row++) {
		grid.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
	}

	(function sudokusolver(r, c) {
		if (c == 9 && r == 0) {
			assign();
			return 0;
		}
		if (r == 9)
			sudokusolver(0, c + 1);
         if(grid[r].length>0){
			for (let num = 1; num <= 9; num++) {
				let currentValue = num;
				//  let currentValue=randomValue();
				if (isvalid(r, c, currentValue) && grid[r][c] == 0) {
					grid[r][c] = currentValue;
					sudokusolver(r + 1, c);
					grid[r][c] = 0;
				}
			}
		}
		})(0,0);
	
}



function randomValue() {
	var currentValue = Math.floor((Math.random() * 9) + 1);
	return currentValue;
}
function rowDuplicateCheck(row, currentValue) {
	for (let col = 0; col < 9; col++)
		if (grid[row][col] == currentValue)
			return true;
	return false;
}
function colDuplicateCheck(col, currentValue) {
	for (let row = 0; row < 9; row++)
		if (grid[row][col] == currentValue)
			return true;
	return false;
}
function boxDuplicateCheck(boxStartRow, boxStartCol, currentValue) {
	for (let row = 0; row < 3; row++)
		for (let col = 0; col < 3; col++)
			if (grid[row + boxStartRow][col + boxStartCol] == currentValue)
				return true;
	return false;
}

function isvalid(row, col, currentValue) {
	return (!rowDuplicateCheck(row, currentValue) && !colDuplicateCheck(col, currentValue) && !boxDuplicateCheck(row - row % 3, col - col % 3, currentValue));
}

function assign() {
	for (let row = 0; row < 9; row++)
		for (let col = 0; col < 9; col++)
			document.getElementById(`digit${row}${col}`).value = grid[row][col];
	return;
}

function refresh(){
	location.reload();
}
function play() {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 3; j++){
		let emptyValues = randomValue();
		if (grid[i][emptyValues]) {
			grid[i][emptyValues] = '';
			document.getElementById(`digit${i}${emptyValues}`).value = grid[i][emptyValues];
			document.getElementById(`digit${i}${emptyValues}`).style.backgroundColor = "silver";
		}
	}

}
return;
}
function gridUpdate(row, col) {
	let value = document.getElementById(`digit${row}${col}`).value;
	if (isvalid(row, col, value)) {
		grid[row][col] = value;
	} else {
		window.alert('wroung input try another');
		document.getElementById(`digit${row}${col}`).value = '';
		return;
	}
}
function result() {
	var count = 0;
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {	
		if (grid[row][col]==''){
			count++;
		}
	}
	}
	if (count) {
		window.alert(`please fill ${count} empty fields and press check button to validate`);
		return;
	}
	else {
		window.alert('congratulations you solved sudoko successfully');
		refresh();
	}
}