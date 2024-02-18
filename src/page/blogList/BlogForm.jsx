import React from 'react';
import PropTypes from 'prop-types';
import { Button, Drawer, Space, Form, Input } from 'antd';

function BlogForm({ onClose, onOKClick, open }) {
  return (
    <Drawer
      title={`Create Blog`}
      placement="right"
      size={'large'}
      onClose={onClose}
      open={open}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onOKClick}>
            OK
          </Button>
        </Space>
      }
    >
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 600
        }}
        initialValues={{
          remember: true
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

BlogForm.propTypes = {
  onClose: PropTypes.func,
  onOKClick: PropTypes.func,
  open: PropTypes.bool
};

export default BlogForm;
