import React from 'react';
import { NextPage } from 'next';
import { client } from '../src/contentfulClient';
import config from '../src/config';
import { Post } from '../src/types';
import Content from '../src/Content';
import useSwr from 'swr';

const fetcher = async () => {
  const { items } = await client.getEntries<Post>({
    content_type: config.contentType,
  });
  return { posts: items };
};

const Spa: NextPage = () => {
  const { data } = useSwr('posts', fetcher);
  return data ? <Content posts={data.posts}></Content> : <h4>Loading...</h4>;
};

export default Spa;
