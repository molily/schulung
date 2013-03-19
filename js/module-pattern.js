var store = (function () {
    var limit = 3;
    var internalStore = [];
    var cleanup = function () {
        if (internalStore.length > 3) {
            internalStore = internalStore.slice(-3);
        }
    };
    var add = function (element) {
        internalStore.push(element);
        cleanup();
    };
    var get = function (index) {
        if (typeof index != 'number') {
            return undefined;
        }
        return internalStore[index];
    };
    var length = function () {
        return internalStore.length;
    };
    return { add: add, get: get, length: length };
})();

store.add(1);
store.add(2);
store.add(3);
store.add(4);
store.add(5);

console.log('get(0): ' + store.get(0)); // 3
console.log('length: ' + store.length()); // 3