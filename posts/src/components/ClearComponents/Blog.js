import React from 'react';
import { Navigate } from 'react-router-dom';
import BlogHeaderContainer from '../Containers/Blog/BlogHeaderContainer';

import BlogInputContainer from '../Containers/Blog/BlogInputContainer';
import BlogPostsContainer from '../Containers/Blog/BlogPostsContainer';

function Blog(props){
  return (
    <>
      <BlogHeaderContainer/>
      {props.isForeign? <></>:<BlogInputContainer/>}
      <BlogPostsContainer/>
    </>
  )
}

export default Blog;