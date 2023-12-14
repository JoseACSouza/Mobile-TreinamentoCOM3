export const User = async (email, password) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/login', {
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });
  const data = await response.json();
  console.log('1', data.message);
  return data;
}

export const getAllPosts = async (token) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/posts', {
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('2', data.message);
  return data;
}

export const getAllCommentaries = async (token) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/commentaries', {
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('3', data.message);
  return data;
}

export const getApiStatus = async (token) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/status', {
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log('4', data.message);
  return data;
}

export const logout = async (token) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/logout', {
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('5', data.message);
  return data;
}

export const sendPost = async (token, post) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/posts', {
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(post)
  });
  const data = await response.json();
  console.log('6', data.message);
  return data;
}

export const deletePost = async (token, postId) => {
  const response = await fetch(`http://10.0.2.2:8000/api/v1/posts/${postId}`, {
    method:'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await response.json();
  console.log('7', data.message);
  return data;
}

export const deleteComments = async (token, commentId) => {
  const response = await fetch(`http://10.0.2.2:8000/api/v1/commentaries/${commentId}`, {
    method:'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  });
  const data = await response.json();
  console.log('8', data.message);
  return data;
}

export const sendComment = async (token, comment) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/commentaries', {
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body:JSON.stringify(comment)
  });
  const data = await response.json();
  console.log('9', data.message);
  return data;
}

export const showComments = async (token, postId) => {
  console.log(token, postId);
  const response = await fetch(`http://10.0.2.2:8000/api/v1/commentaries/${postId}`, {
    method:'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  console.log('10', data.message);
  return data;
}

export const pushData = async (token, changedData) => {
  const response = await fetch('http://10.0.2.2:8000/api/v1/sync', {
    method:'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(changedData),
  });
  const data = await response.json();
  console.log('11', data.message);
  return data;
}