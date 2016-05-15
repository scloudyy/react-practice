const React = require('react');
const ReactDom = require('react-dom');

let CommentBox = React.createClass({
	render: function() {
		return (
			<div className="commentBox">
				Hello, world
			</div>
		);
	}
});

module.exports = CommentBox;