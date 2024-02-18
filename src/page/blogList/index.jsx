import React from 'react';
import { Layout, Flex, Typography, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './index.css';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { useState } from 'react';

const { Header, Content } = Layout;
const { Title } = Typography;

function BlogList() {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const onOKClick = () => {
    console.log('first');
  };

  return (
    <Layout>
      <Header className="rootHeader">Blogger Site</Header>
      <Content>
        <Flex vertical className="mainFlexBlogList">
          <Flex justify="space-between" align="baseline">
            <Title level={3}>My Blogs</Title>
            <Button
              type="primary"
              className="createButton"
              icon={<EditOutlined />}
              onClick={() => setOpen(true)}
            >
              Create
            </Button>
          </Flex>
          <Flex vertical>
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </Flex>
        </Flex>
      </Content>
      <BlogForm open={open} onClose={onClose} onOKClick={onOKClick} />
    </Layout>
  );
}

export default BlogList;
