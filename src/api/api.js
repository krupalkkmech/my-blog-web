import request from './request';

export const getAllBlogs = () => {
  return request({
    url: '/blogs',
    method: 'GET'
  });
};

export const createBlog = (data) => {
  return request({
    url: '/blogs',
    method: 'POST',
    data
  });
};

export const getBlogBasedOnId = (id) => {
  return request({
    url: `/blogs/${id}`,
    method: 'GET'
  });
};
