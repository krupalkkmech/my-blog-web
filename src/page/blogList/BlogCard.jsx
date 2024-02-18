import React from 'react';
import { Flex, Card, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;

function BlogCard() {
  const navigate = useNavigate();
  return (
    <Card
      className="blogListCard"
      type="inner"
      title={
        <Flex justify="space-between" align="baseline">
          <div>
            <Title level={5} style={{ margin: 0 }}>
              7 Apps & Websites I use every day as a UX/UI designer
            </Title>
            <span>{moment().format('DD-MM-YYYY')}</span>
          </div>
          <Flex align="center" style={{ alignSelf: 'center' }}>
            <Button
              type="primary"
              shape="circle"
              className="editDeleteButton marginRight20"
              icon={<EditOutlined style={{ fontSize: '16px', color: '#08c' }} />}
            />
            <Button
              type="primary"
              shape="circle"
              className="editDeleteButton"
              icon={<DeleteOutlined style={{ fontSize: '16px', color: '#08c' }} />}
            />
          </Flex>
        </Flex>
      }
      onClick={() => navigate('/blog/1234')}
      // extra={<a href="#">More</a>}
    >
      We can all agree that Figma has changed how we work in UX/UI design, making everything simpler
      and all in one place. However, even with Figma’s amazing features and plugins, there are other
      apps ...
    </Card>
  );
}

export default BlogCard;
