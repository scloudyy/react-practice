const React = require('react');
const ReactDom = require('react-dom');

const CommentBox = require('./components/CommentBox');

const FilterableProductTable = require('./components/FilterableProductTable');

const HelloWorld = require('./components/Test');

var PRODUCTS = [
	{
		category: 'Sporting Goods',
		price: '$49.99',
		stocked: true,
		name: 'Football'
	}, {
		category: 'Sporting Goods',
		price: '$9.99',
		stocked: true,
		name: 'Baseball'
	}, {
		category: 'Sporting Goods',
		price: '$29.99',
		stocked: false,
		name: 'Basketball'
	}, {
		category: 'Electronics',
		price: '$99.99',
		stocked: true,
		name: 'iPod Touch'
	}, {
		category: 'Electronics',
		price: '$399.99',
		stocked: false,
		name: 'iPhone 5'
	}, {
		category: 'Electronics',
		price: '$199.9',
		stocked: true,
		name: 'Nexus 7'
	}
];

ReactDom.render(
	<FilterableProductTable products={PRODUCTS}/>, document.getElementById('content1'));

ReactDom.render(
	<CommentBox url='http://localhost:3000/api/comments' pollInterval={2000}/>, document.getElementById('content2'));

setInterval(function() {
	ReactDom.render(
		<HelloWorld date={new Date()} checked={true} atrr={1} />,
		document.getElementById('content3')
	);
}, 500);
