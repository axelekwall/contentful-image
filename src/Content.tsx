import React, { FC } from 'react';
import { Entry } from 'contentful';
import { Post } from './types';
import Image from './Image';

interface Props {
  posts: Entry<Post>[];
}

const Content: FC<Props> = ({ posts }) => (
  <main>
    <h1>Image Demo</h1>
    {posts.map(post => (
      <article key={post.sys.id}>
        <h3>{post.fields.title}</h3>
        <p>{post.fields.body}</p>
        {post.fields.images.map(image => (
          <Image
            style={{
              objectFit: 'cover',
              maxWidth: '90vw',
              margin: '10px auto',
            }}
            key={image.sys.id}
            asset={image}
            size={{ width: 500 }}
          />
        ))}
      </article>
    ))}
    <style jsx>{`
      main {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
      h1 {
        margin: 20px;
      }
      article {
        width: 500px;
        max-width: 90vw;
        margin: 30px auto;
        display: flex;
        flex-direction: column;
      }
    `}</style>
    <style jsx global>{`
      body {
        margin: 0;
      }
    `}</style>
  </main>
);

export default Content;
