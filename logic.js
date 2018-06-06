function myFunction() {
	var x = document.createElement("TABLE");
	x.setAttribute("id", "myTable");
	document.body.appendChild(x);

	for (let row = 0; row < 11; row++) {
		var y = document.createElement("TR");
		y.setAttribute("id", `myTr${row}`);
		document.getElementById("myTable").appendChild(y);
		for (let col = 0; col < 11; col++) {
			if(row==3||row==7){
			col=11;
			}else{
			var z = document.createElement("TD");
			if(col==3||col==7){
				document.getElementById(`myTr${row}`).appendChild(z);
			}else{
				var inputTag = `<input type='number' id='digit${row}${col}' onKeyUp='gridUpdate(${row},${col})' />`;
				z.innerHTML = inputTag;
				document.getElementById(`myTr${row}`).appendChild(z);
			}
		}
		}
	}
	grid = [];
	for (let row = 0; row < 11; row++) {
		if(row==3||row==7){
			grid.push([]);
		}
		else{
		grid.push([0,0,0, ,0,0,0, ,0,0,0]);
		}
	}


	(function sudokusolver(r, c) {
		if (c == 11 && r == 0) {
			assign();
			return 0;
		}
		if (r == 11){
		if(c==2||c==6){
			sudokusolver(0, c + 2);
		}else{
			sudokusolver(0, c + 1);}
		}
         if(grid[r].length>0){
			var arr=[6,2,1,5,8,9,3,7,4];
			for (let num = 0; num <9 ; num++) {
				let currentValue = arr[num];
				if (isvalid(r, c, currentValue) && grid[r][c] == 0) {
					grid[r][c] = currentValue;
					sudokusolver(r + 1, c);
					grid[r][c] = 0;
				}
			}
			let a=arr.pop();
			arr.unshift(a);
		}else{
			sudokusolver(r+1,c)
		}
		})(0,0);
	
}

function randomValue() {
	var currentValue = Math.floor((Math.random() * 9) + 1);
	return currentValue;
}
function rowDuplicateCheck(row, currentValue) {
	for (let col = 0; col < 11; col++)
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
	return (!rowDuplicateCheck(row, currentValue) && !colDuplicateCheck(col, currentValue) && !boxDuplicateCheck(row - row % 4, col - col % 4, currentValue));
}

function assign() {
	for (let row = 0; row < 11; row++){
		for (let col = 0; col < 11; col++){
		if(row==3||row==7){
			break;
		}
		if(col==3||col==7){
		}else{
			document.getElementById(`digit${row}${col}`).value = grid[row][col];
		}
	}
}
	return;
}

function refresh(){
	location.reload();
	return;
}
function play(value) {
	for (let i = 0; i < 11; i++) {
		for (let j = 0; j < value; j++){
			if(i==3||i==7){
				break;
			}
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
	}
	return;
}
function result() {
	var count = 0;
	for (let row = 0; row < 11; row++) {
		for (let col = 0; col < 11; col++) {
			if(row==3||row==7){
				col=11;
				   }
				   if(col==3||col==7){
					 
				   }	
		if (grid[row][col]==''){
			count++;
		}
	}
	}
	if (count) {
		window.alert(`please fill ${count} empty fields and press check button to validate`);
	}
	else {
		window.alert('congratulations you solved sudoko successfully');
		refresh();
	}
	return;
}