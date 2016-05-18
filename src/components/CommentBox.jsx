const React = require('react');
const marked = require('marked');
const $ = require('jquery');

let t = React.createClass({
	render: function() {
		return (
			<div>
				<p>hello</p>
			</div>
		);
	}
});

let CommentBox = React.createClass({
	loadCommentFromServer: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.log(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {data: []};
	},
	componentDidMount: function() {
		this.loadCommentFromServer();
		setInterval(this.loadCommentFromServer, this.props.pollInterval);
	},
	render: function() {
		return (
      <div className="commentBox">
				<h1>commentList</h1>
				<CommentList data={this.props.data} />
				<CommentForm/>
			</div>
    );
	}
});

let CommentList = React.createClass({
	render: function() {
		let commentNodes = this.props.data.map((comment) => {
			return (
				<Comment author={comment.author} key={comment.id}>
					{comment.text}
				</Comment>
			);
		});
		return (
			<div className="commentList">
				{commentNodes}
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

//module.exports = CommentBox;
module.exports = t;