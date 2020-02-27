import React from 'react';
import { NextPage } from 'next';
import { client } from '../src/contentfulClient';
import config from '../src/config';
import { Entry } from 'contentful';
import { Post } from '../src/types';
import Content from '../src/Content';

interface Props {
  posts: Entry<Post>[];
}

const Ssr: NextPage<Props> = ({ posts }: Props) => {
  return <Content posts={posts}></Content>;
};

Ssr.getInitialProps = async () => {
  const { items } = await client.getEntries<Post>({
    content_type: config.contentType,
  });
  return { posts: items };
};

export default Ssr;
