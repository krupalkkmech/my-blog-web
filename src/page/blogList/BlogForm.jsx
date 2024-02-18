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
let index = 0;
function BlogForm({ onClose, onOKClick, open }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  const onFinish = (values) => {
    console.log(editorState);
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    const text = convert(html, {});
    console.log(text); // Hello World
    console.log(html);
    console.log('Success:', values);
  };
  return (
    <Drawer title={`Create Blog`} placement="right" width={900} onClose={onClose} open={open}>
      <Form onFinish={onFinish} autoComplete="off">
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
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
