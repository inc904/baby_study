var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var defaults = {
    food: 'spicy',
    price: '$10',
    ambiance: 'noisy'
};
var search1 = __assign(__assign({}, defaults), { food: 'rich' });
var search2 = __assign({ food: 'rich' }, defaults);
console.log(search1);
console.log(search2);
var man1 = { name: 'zc', age: 18 };
var man2 = { name: 'zc', age: 18 };
var man3 = { name: 'zc', age: 18 };
var xhr = new XMLHttpRequest();
function ajax(config) {
    xhr.open(config.type, config.url, true);
    xhr.send(config.data);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            if (config.type === 'json') {
                console.log(JSON.parse(xhr.responseText));
            }
            else {
                console.log(JSON.parse(xhr.responseText));
                console.log('successful');
                console.log((xhr.responseText));
            }
        }
    };
}
ajax({
    type: 'get',
    dataType: 'json',
    // url: 'http://a.itying.com/api/productlist'
    url: './text.json'
});
