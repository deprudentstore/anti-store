const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    cache: 'no-store',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }
  return res.json();
}

export const getProducts = (params = '') => request(`/products/${params}`);
export const getProduct = (slug) => request(`/products/${slug}/`);
export const getCategories = () => request('/categories/');
export const getTestimonials = () => request('/testimonials/');
export const getBlogPosts = () => request('/blog/');
export const getBlogPost = (slug) => request(`/blog/${slug}/`);
export const subscribeNewsletter = (email) =>
  request('/newsletter/', { method: 'POST', body: JSON.stringify({ email }) });
export const createOrder = (payload) =>
  request('/orders/', { method: 'POST', body: JSON.stringify(payload) });
