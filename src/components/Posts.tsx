import React from "react";

const Posts = ({ posts }: any) => {
  console.log("-> posts", posts);
  return (
    <ul>
      {posts.map((post: any) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default Posts;
