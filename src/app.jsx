const CommentBox = require('./components/CommentBox');
const React = require('react');
const ReactDom = require('react-dom');


ReactDom.render(
  <CommentBox />, document.getElementById('content')
);
