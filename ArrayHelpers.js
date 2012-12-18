
Array.prototype.pushRange = function (_items) {

    for (var l = 0; l < _items.length; l++) {
        this.push(_items[l]);
    }
};

Array.prototype.where = function (_cond) {

    var items = []; 
    for (var l = 0; l < this.length; l++) {
        if (_cond(this[l])) {
            items.push(this[l]);
        }
    }
    return items;
};
