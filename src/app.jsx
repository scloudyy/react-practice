const CommentBox = require('./components/CommentBox');
const React = require('react');
const ReactDom = require('react-dom');

ReactDom.render(
  //<CommentBox url='/api/comments' pollInterval={2000}/>, document.getElementById('content')
  <CommentBox/>, document.getElementById('content')
);
