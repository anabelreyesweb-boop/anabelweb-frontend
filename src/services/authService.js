const API_URL = 'http://localhost:3000';

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const contentType = response.headers.get('content-type');

  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('The server did not return JSON. Check backend port and server status.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }

  return data;
}

export async function registerUser(name, email, password) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }

  return data;
}

export async function subscribeUser(name, email, password) {
  const response = await fetch(`${API_URL}/subscribe`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Subscription failed');
  }

  return data;
}

export async function getProfile(token) {
  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch profile');
  }

  return data;
}

export async function getMySubscription(token) {
  const response = await fetch(`${API_URL}/my-subscription`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch subscription');
  }

  return data;
}

export async function createSubscriptionCheckout(token) {
  const response = await fetch(`${API_URL}/subscriptions/checkout`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to process subscription checkout');
  }

  return data;
}

export async function getPremiumContent(token) {
  const response = await fetch(`${API_URL}/premium-content`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch premium content');
  }

  return data;
}

export async function getPremiumContentBySlug(token, slug) {
  const response = await fetch(`${API_URL}/premium-content/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch premium content detail');
  }

  return data;
}

export async function getAdminPremiumContent(token) {
  const response = await fetch(`${API_URL}/admin/premium-content`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch admin premium content');
  }

  return data;
}

export async function getAdminPremiumContentById(token, id) {
  const response = await fetch(`${API_URL}/admin/premium-content/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch premium content');
  }

  return data;
}

export async function createPremiumContent(token, contentData) {
  const response = await fetch(`${API_URL}/premium-content`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...contentData,
      display_order: Number(contentData.display_order),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to create premium content');
  }

  return data;
}

export async function updatePremiumContent(token, id, contentData) {
  const response = await fetch(`${API_URL}/premium-content/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...contentData,
      display_order: Number(contentData.display_order),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to update premium content');
  }

  return data;
}

export async function deletePremiumContent(token, id) {
  const response = await fetch(`${API_URL}/premium-content/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to delete premium content');
  }

  return data;
}