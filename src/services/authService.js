const API_URL = 'http://localhost:3000';

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export async function subscribeUser(name, email, password) {
  const response = await fetch(`${API_URL}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  });

  return handleResponse(response);
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return handleResponse(response);
}

export async function forgotPassword(email) {
  const response = await fetch(`${API_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  return handleResponse(response);
}

export async function changePassword(
  token,
  currentPassword,
  newPassword,
  confirmNewPassword
) {
  const response = await fetch(`${API_URL}/auth/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      confirmNewPassword
    })
  });

  return handleResponse(response);
}

export async function updateProfilePhoto(token, profilePhoto) {
  const response = await fetch(`${API_URL}/profile/photo`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ profilePhoto })
  });

  return handleResponse(response);
}

export async function getProfile(token) {
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export async function getMySubscription(token) {
  const response = await fetch(`${API_URL}/my-subscription`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export async function getPremiumContent(token) {
  const response = await fetch(`${API_URL}/premium-content`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export async function getPremiumContentBySlug(token, slug) {
  const response = await fetch(`${API_URL}/premium-content/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export async function getAdminPremiumContent(token) {
  const response = await fetch(`${API_URL}/admin/premium-content`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export async function getAdminPremiumContentById(token, id) {
  const response = await fetch(`${API_URL}/admin/premium-content/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}

export async function createPremiumContent(token, formData) {
  const response = await fetch(`${API_URL}/premium-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });

  return handleResponse(response);
}

export async function updatePremiumContent(token, id, formData) {
  const response = await fetch(`${API_URL}/premium-content/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(formData)
  });

  return handleResponse(response);
}

export async function deletePremiumContent(token, id) {
  const response = await fetch(`${API_URL}/premium-content/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return handleResponse(response);
}