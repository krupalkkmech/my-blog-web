import React, { useCallback, useEffect } from 'react';
import { Layout, Flex, Typography, Button, Skeleton, Result } from 'antd';
import { EditOutlined, SmileOutlined } from '@ant-design/icons';
import './index.css';
import BlogCard from './BlogCard';
import BlogForm from './BlogForm';
import { useState } from 'react';
import { getAllBlogs } from '../../api/api';

const { Header, Content } = Layout;
const { Title } = Typography;

function BlogList() {
  const [open, setOpen] = useState(false);
  const [allBlogList, setAllBlogList] = useState([]);
  const [loader, setLoader] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  const onOKClick = (newBlog) => {
    setAllBlogList((prev) => [newBlog, ...prev]);
    onClose();
  };

  const getAllBlogsCall = async () => {
    setLoader(true);
    try {
      const resp = await getAllBlogs();
      if (resp.code === 200) {
        setAllBlogList(resp?.result);
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const showBlogList = useCallback(() => {
    if (allBlogList.length === 0) {
      return (
        <Result
          icon={<SmileOutlined />}
          title="Hi, Welcome to the Blogger Site!"
          subTitle="Click on the start button and create your first blog"
          extra={
            <Button type="primary" onClick={() => setOpen(true)}>
              Start
            </Button>
          }
        />
      );
    }
    return allBlogList.map((eachBlog) => <BlogCard blogData={eachBlog} />);
  }, [allBlogList]);

  useEffect(() => {
    getAllBlogsCall();
  }, []);

  if (loader) {
    return (
      <>
        <Skeleton />
        <Skeleton />
      </>
    );
  }

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
          <Flex vertical>{showBlogList()}</Flex>
        </Flex>
      </Content>
      <BlogForm open={open} onClose={onClose} onOKClick={onOKClick} />
    </Layout>
  );
}

export default BlogList;
