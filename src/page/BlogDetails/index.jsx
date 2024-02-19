import React, { useEffect, useState } from 'react';
import {
  LikeOutlined,
  CommentOutlined,
  PlayCircleOutlined,
  SaveOutlined,
  ShareAltOutlined,
  HomeOutlined
} from '@ant-design/icons';
import moment from 'moment';
import parse from 'html-react-parser';
import { Layout, Flex, Typography, Divider, Skeleton, message } from 'antd';
// import { useSpeechSynthesis } from 'react-speech-kit';
import './index.css';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogBasedOnId } from '../../api/api';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

function BlogDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const { speak } = useSpeechSynthesis();
  const [loader, setLoader] = useState(false);
  const [blogData, setBlogData] = useState(null);

  const copyBlogUrl = (link) => {
    const textArea = document.createElement('textarea');
    textArea.value = link;

    // Avoid scrolling to bottom
    textArea.style.top = '-50px';
    textArea.style.left = '-50px';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        message.success({
          content: 'Link copied successfully',
          style: { marginTop: '5vh' }
        });
      } else {
        message.error({
          content: 'Oops, unable to copy link',
          style: { marginTop: '5vh' }
        });
      }
    } catch (err) {
      console.log(err);
      message.error({
        content: 'Oops, unable to copy link',
        style: { marginTop: '5vh' }
      });
    }
    document.body.removeChild(textArea);
  };

  const getBlogDetails = async () => {
    setLoader(true);
    try {
      const resp = await getBlogBasedOnId(id);
      console.log(resp);
      if (resp?.code === 200) {
        setBlogData(resp?.result);
      }
    } catch (error) {
      console.log(error);
      message.error('No blog found');
      navigate('/');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getBlogDetails();
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
        <HomeOutlined className="homeButton" onClick={() => navigate('/')} />
        <Flex vertical className="mainFlexBlogDetails">
          <Title level={2}>{blogData?.title}</Title>
          <span>{moment(blogData?.createdAt).format('DD-MM-YYYY')}</span>
          <Divider />
          <Flex justify="space-between">
            <Flex>
              <LikeOutlined
                className="detailsIcon"
                onClick={() => message.info('Action for like')}
              />
              <span className="detailsIcon">1.96k</span>{' '}
              <CommentOutlined
                className="detailsIcon marginLeft"
                onClick={() => message.info('Action for show comments')}
              />{' '}
              <span className="detailsIcon">1.96k</span>
            </Flex>
            <Flex>
              <SaveOutlined
                className="detailsIcon "
                onClick={() => message.info('Action for save blog')}
              />
              <PlayCircleOutlined
                className="detailsIcon marginLeft"
                // onClick={() => speak({ text: blogData?.contentText })}
                onClick={() => message.info('Action for play blog audio')}
              />
              <ShareAltOutlined
                className="detailsIcon marginLeft"
                onClick={() => copyBlogUrl(window?.location?.href)}
              />
            </Flex>
          </Flex>
          <Divider />
          <Paragraph>{parse(blogData?.contentHTML || '')}</Paragraph>
        </Flex>
      </Content>
    </Layout>
  );
}

export default BlogDetails;
