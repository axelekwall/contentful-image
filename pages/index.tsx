import React from 'react';
import { NextPage } from 'next';
import Image from '../src/Image';
import { client } from '../src/contentfulClient';
import config from '../src/config';
import { Asset, Entry } from 'contentful';

interface Post {
  title: string;
  body: string;
  images: Array<Asset>;
}

interface Props {
  posts: Entry<Post>[];
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <main>
      <h1>Image Demo</h1>
      {posts.map(post => (
        <div key={post.sys.id}>
          <h3>{post.fields.title}</h3>
          <p>{post.fields.body}</p>
          {post.fields.images.map(image => (
            <Image key={image.sys.id} asset={image} size={{ width: 500 }} />
          ))}
        </div>
      ))}
    </main>
  );
};

Home.getInitialProps = async () => {
  const { items } = await client.getEntries<Post>({
    content_type: config.contentType,
  });
  return { posts: items };
};

export default Home;
