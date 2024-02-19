import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Card, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Title } = Typography;

function BlogCard({ blogData }) {
  const navigate = useNavigate();
  return (
    <Card
      className="blogListCard"
      type="inner"
      title={
        <Flex justify="space-between" align="baseline">
          <div>
            <Title level={5} style={{ margin: 0 }}>
              {blogData?.title}
            </Title>
            <span>{moment(blogData?.createdAt).format('DD-MM-YYYY')}</span>
          </div>
          <Flex align="center" style={{ alignSelf: 'center' }}>
            <Button
              type="primary"
              shape="circle"
              className="editDeleteButton marginRight20"
              icon={<ExportOutlined style={{ fontSize: '16px', color: '#08c' }} />}
              onClick={() => navigate(`/blog/${blogData?._id}`)}
            />
            <Button
              type="primary"
              shape="circle"
              className="editDeleteButton marginRight20"
              icon={<EditOutlined style={{ fontSize: '16px', color: '#08c' }} />}
              onClick={(e) => {
                e.preventDefault();
                message.info('Action for edit post');
              }}
            />
            <Button
              type="primary"
              shape="circle"
              className="editDeleteButton"
              icon={<DeleteOutlined style={{ fontSize: '16px', color: '#08c' }} />}
              onClick={() => message.info('Action for delete post')}
            />
          </Flex>
        </Flex>
      }
    >
      {blogData?.shortContent}
    </Card>
  );
}

BlogCard.propTypes = {
  blogData: PropTypes.shape(),
};

export default BlogCard;
