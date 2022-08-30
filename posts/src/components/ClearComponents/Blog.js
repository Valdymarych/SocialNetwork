import React from 'react';
import BlogHeaderContainer from '../Containers/Blog/BlogHeaderContainer';

import BlogInputContainer from '../Containers/Blog/BlogInputContainer';
import BlogPostsContainer from '../Containers/Blog/BlogPostsContainer';

function Blog(props){
  return (
    <>
      <BlogHeaderContainer/>
      <BlogInputContainer/>
      <BlogPostsContainer/>
    </>
  )
}

export default Blog;