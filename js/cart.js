function cart(name) {
    this.name = name;
    this.clear = false;
    this.items = [];
    this.loadItems();
    var that = this;
    $(window).unload(function () {
        if (that.clear) {
            that.clearItems();
        }
        that.addToLocalStorage();
        that.clear = false;
    });
}


cart.prototype.addToLocalStorage = function () {
    if (localStorage != null && JSON != null) {
        localStorage[this.name + "_items"] = JSON.stringify(this.items);
    }
}

cart.prototype.addItem = function (id, name, price, quantity,inventory) {
    quantity = this.toNumber(quantity);
    var totalQuantity = 0;
    if (quantity != 0) {
        var found = false;
        for (var i = 0; i < this.items.length && !found; i++) {
            var item = this.items[i];
            if (item.id == id) {
                found = true;
                totalQuantity = this.toNumber(item.quantity + quantity);
                if (totalQuantity <= inventory) {
                    item.quantity = totalQuantity;
                }
                else {
                    alert("Cant add item.Max inventory of " + name + " is " + inventory);
                }
                if (item.quantity <= 0) {
                    this.items.splice(i, 1);
                }
            }
        }

        // new item, add now
        if (!found) {
            var item = new cartItem(id, name, price, quantity,inventory);
            this.items.push(item);
        }

        this.addToLocalStorage();
    }
}

cart.prototype.getTotalPrice = function (id) {
    var total = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            total += this.toNumber(item.quantity * item.price);
        }
    }
    return total;
}

cart.prototype.getTotalCount = function (id) {
    var count = 0;
    for (var i = 0; i < this.items.length; i++) {
        var item = this.items[i];
        if (id == null || item.id == id) {
            count += this.toNumber(item.quantity);
        }
    }
    return count;
}

cart.prototype.loadItems = function () {
    var items = localStorage != null ? localStorage[this.name + "_items"] : null;
    if (items != null && JSON != null) {
        var items = JSON.parse(items);
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.id != null && item.name != null && item.price != null && item.quantity != null && item.inventory != null) {
                item = new cartItem(item.id, item.name, item.price, item.quantity,item.inventory);
                this.items.push(item);
            }
        }
    }
}

cart.prototype.clearItems = function () {
    this.items.length = 0;
    this.addToLocalStorage();
}

cart.prototype.toNumber = function (value) {
    value = value * 1;
    return isNaN(value) ? 0 : value;
}


function cartItem(id, name, price, quantity ,inventory) {
    this.id = id;
    this.name = name;
    this.inventory = inventory;
    this.price = price * 1;
    this.quantity = quantity * 1;
}
