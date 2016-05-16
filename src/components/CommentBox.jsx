const React = require('react');
const marked = require('marked');

let CommentBox = React.createClass({
	render: function() {
		return (
      <div className="commentBox">
				<h1>commentList</h1>
				<CommentList/>
				<CommentForm/>
			</div>
    );
	}
});

let CommentList = React.createClass({
	render: function() {
		return (
			<div className="commentList">
				<Comment author="Peter">This is one comment</Comment><br/>
				<Comment author="Tom">This is *anothor* comment</Comment><br/>
			</div>
		);
	}
});

let CommentForm = React.createClass({
	render: function() {
		return (
			<div className="commentForm">
				commentForm
			</div>
		);
	}
});

let Comment = React.createClass({
	rawMarkup: function() {
		let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
		return { __html: rawMarkup };
	},

	render: function () {
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={this.rawMarkup()} />
			</div>
		);
	}
});

module.exports = CommentBox;