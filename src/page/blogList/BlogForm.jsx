/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convert } from 'html-to-text';
// import htmlToDraft from 'html-to-draftjs';
import { PlusOutlined } from '@ant-design/icons';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Button, Drawer, Space, Form, Input, Divider, Select } from 'antd';
import { createBlog } from '../../api/api';
let index = 0;
function BlogForm({ onClose, onOKClick, open }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loader, setLoader] = useState(false);

  const inputRef = useRef(null);
  const [form] = Form.useForm();

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index + 1}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onContentStateChange = (contentState) => {
    const content = draftToHtml(contentState);
    if (content) {
      setDescription(content);
    }
  };

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const onFinish = async (values) => {
    setLoader(true);
    try {
      const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      const text = convert(html, {});
      const data = {};
      data.title = values?.title;
      data.contentText = text;
      data.contentHTML = html;
      data.type = values?.type;
      data.keyWords = values?.keyWords;
      console.log(data);
      const resp = await createBlog(data);
      if (resp?.code === 200) {
        onOKClick(resp?.result);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleClose = () => {
    form.resetFields();
    setItems([]);
    setName('');
    setEditorState(EditorState.createEmpty());
    onClose();
  };

  return (
    <Drawer title={`Create Blog`} placement="right" width={900} onClose={handleClose} open={open}>
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <p> Title: </p>
        <Form.Item
          label={null}
          name="title"
          rules={[
            {
              required: true,
              message: 'Please enter title!'
            }
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>

        <p> Description: </p>
        <Form.Item
          label={null}
          name="description"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            onContentStateChange={onContentStateChange}
          />
        </Form.Item>
        <p> Blog type: </p>
        <Form.Item
          label={null}
          name="type"
          rules={[
            {
              required: true,
              message: 'Please enter type!'
            }
          ]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
        <p> Key words: </p>
        <Form.Item
          label={null}
          name="keyWords"
          rules={[
            {
              required: true,
              message: 'Please enter Key words!'
            }
          ]}
        >
          <Select
            style={{
              width: '100%'
            }}
            mode="multiple"
            placeholder="custom dropdown render"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: '8px 0'
                  }}
                />
                <Space
                  style={{
                    padding: '0 8px 4px'
                  }}
                >
                  <Input
                    placeholder="Please enter item"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({
              label: item,
              value: item
            }))}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loader}>
            Submit
          </Button>
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
