function Triangle(_x, _y, _upsideDown, _color) {
	this.x = _x;
	this.y = _y;
	this.upsideDown = _upsideDown;
	this.color = _color;
	this.selected = false;
	this.neighbors = false;
	this.glow = false;
	this.highlightedNeighbors = false;
	return this;
}


Triangle.triangleLength = 60;
Triangle.UpsideDownNeighbors = [
	{ x:-1, y:+0 },
	{ x:+1, y:+0 },
	{ x:-2, y:+0 },
	{ x:+2, y:+0 },
	{ x:+0, y:-1 },
	{ x:-1, y:-1 },
	{ x:+1, y:-1 },
	{ x:+0, y:+1 },
	{ x:-1, y:+1 },
	{ x:+1, y:+1 },
	{ x:-2, y:+1 },
	{ x:+2, y:+1}
];

Triangle.Neighbors = [
	{ x:-1, y:+0 },
	{ x:+1, y:+0 },
	{ x:-2, y:+0 },
	{ x:+2, y:+0 },
	{ x:+0, y:+1 },
	{ x:-1, y:+1 },
	{ x:+1, y:+1 },
	{ x:+0, y:-1 },
	{ x:-1, y:-1 },
	{ x:+1, y:-1 },
	{ x:-2, y:-1 },
	{ x:+2, y:-1}
];


Triangle.prototype.inBounds = function (_x, _y) {
	_x -= offset.x;
	_y -= offset.y;
	var x;
	var y;
	if (this.upsideDown) {
		x = (this.x) / 2;
		y = this.y;
		return isPointInTriangle({ x:_x, y:_y }, { x:x * Triangle.triangleLength, y:y * Triangle.triangleLength },
			{ x:x * Triangle.triangleLength + Triangle.triangleLength / 2, y:y * Triangle.triangleLength + Triangle.triangleLength },
			{ x:x * Triangle.triangleLength - Triangle.triangleLength / 2, y:y * Triangle.triangleLength + Triangle.triangleLength }
		);

	} else {
		x = (this.x - 1) / 2;
		y = this.y;
		return isPointInTriangle({ x:_x, y:_y },
			{ x:x * Triangle.triangleLength + Triangle.triangleLength / 2, y:y * Triangle.triangleLength + Triangle.triangleLength },
			{ x:x * Triangle.triangleLength, y:y * Triangle.triangleLength },
			{ x:x * Triangle.triangleLength + Triangle.triangleLength, y:y * Triangle.triangleLength });
	}


};

Triangle.prototype.getLikeNeighbors = function (_board) {

	var hitmap = [];
	for (var x = 0; x < _board.length; x++) {
		hitmap.push([]);
	}

	return Triangle.startLikeNeighbors(_board, this.x, this.y, this.color, hitmap);
};


Triangle.prototype.isNeighbor = function (_x, _y) {
	var neighs;
	if (this.upsideDown) {
		neighs = Triangle.UpsideDownNeighbors;
	} else {
		neighs = Triangle.Neighbors;
	}
	for (var i = 0; i < neighs.length; i++) {
		if (this.x + neighs[i].x == _x && this.y + neighs[i].y == _y) {
			return true;
		}
	}
	return false;

};

Triangle.startLikeNeighbors = function (_board, _x, _y, _color, _hitMap) {
	//log('x: ' + _x + ' y: ' + _y + '   color: ' + _color);
	var items = [];
	if (_x >= 0 && _x < _board.length && _y >= 0 && _y < _board[0].length) {


		if (_hitMap[_x][_y]) return items;

		_hitMap[_x][_y] = true;

		if (_board[_x][_y].color == _color) {
			items.push(_board[_x][_y]);
		} else return items;

		var l;
		var neighs;

		if (_board[_x][_y].upsideDown) {
			for (l = 0; l < Triangle.UpsideDownNeighbors.length; l++) {
				neighs = Triangle.UpsideDownNeighbors[l];

				items.pushRange(Triangle.startLikeNeighbors(_board, _x + neighs.x, _y + neighs.y, _color, _hitMap));
			}
		} else {

			for (l = 0; l < Triangle.Neighbors.length; l++) {
				neighs = Triangle.Neighbors[l];
				items.pushRange(Triangle.startLikeNeighbors(_board, _x + neighs.x, _y + neighs.y, _color, _hitMap));
			}


		}
	}

	return items;
};

Triangle.prototype.getCurrentColor = function () {


	if (this.transitioning + 10 >= 100) {
		this.color = this.transitionToColor;
		this.transitioning = 0;
	}

	if (this.transitioning > 0) {
		return getColor(this.color, this.transitionToColor, this.transitioning += 10);
	}

	return this.color;

};

Triangle.prototype.highlightNeighbors = function (_board) {
	var neighs;
	if (this.upsideDown) {
		neighs = Triangle.UpsideDownNeighbors;
	} else {
		neighs = Triangle.Neighbors;
	}

	for (var j = 0; j < _board.length; j++) {
		for (var k = 0; k < _board[j].length; k++) {
			_board[j][k].highlightedNeighbors = false;
		}
	}

	for (var i = 0; i < neighs.length; i++) {

		var cX = this.x + neighs[i].x;
		var cY = this.y + neighs[i].y;

		if (cX >= 0 && cX < _board.length && cY >= 0 && cY < _board[0].length) {
			_board[cX][cY].highlightedNeighbors = true;
		}

	}
};

Triangle.prototype.transitionTo = function (_toColor) {
	this.transitionToColor = _toColor;
	this.transitioning = 1;

};
Triangle.prototype.draw = function (_context) {
	_context.save();
	_context.beginPath();
	_context.strokeStyle = this.neighbors ? 'gold' : this.selected ? 'green' : this.glow ? 'gold' : 'black';
	_context.lineWidth = this.neighbors ? 9 : this.selected ? 7 : this.glow ? 5 : 3;
	if (this.highlightedNeighbors) {
		_context.strokeStyle = '#352B88';
		_context.lineWidth = 12;
	}
	_context.fillStyle = this.getCurrentColor();
	var x;
	var y;
	if (this.upsideDown) {
		x = (this.x) / 2;
		y = this.y;
		_context.translate(x * Triangle.triangleLength, y * Triangle.triangleLength);


		if (this.selected) {
			//  ctx.rotate((cur+=3)*Math.PI/180);
		}

		_context.moveTo(0, 0);
		_context.lineTo(Triangle.triangleLength / 2, Triangle.triangleLength);
		_context.lineTo(-Triangle.triangleLength / 2, Triangle.triangleLength);
		_context.lineTo(0, 0);

	} else {
		x = (this.x - 1) / 2;
		y = this.y;
		_context.translate(x * Triangle.triangleLength, y * Triangle.triangleLength);


		if (this.selected) {
			//  ctx.rotate((cur+=3)*Math.PI/180);
		}

		_context.moveTo(0, 0);
		_context.lineTo(Triangle.triangleLength, 0);
		_context.lineTo(Triangle.triangleLength / 2, Triangle.triangleLength);
		_context.lineTo(0, 0);
	}


	_context.fill();


	_context.stroke();

	if (this.neighbors || this.highlightedNeighbors) {
		_context.lineWidth = 2;
		_context.strokeStyle = '#345782';
		_context.stroke();

	}

	_context.restore();

};