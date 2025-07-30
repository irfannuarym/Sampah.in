const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to add delay
const addDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export async function registerUser(userData) {
  // Add delay for better UX
  await addDelay(1500);
  
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Registrasi gagal');
  }

  return response.json();
}

export async function loginUser({ email, password }) {
  // Add delay for better UX
  await addDelay(1200);
  
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Login gagal');
  }

  return response.json();
}

export async function getAllUsers() {
  const response = await fetch(`${API_BASE_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal mengambil data pengguna');
  }

  return response.json();
}

export async function createPetugas(petugasData) {
  const response = await fetch(`${API_BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...petugasData,
      role: 'petugas'
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal menambah petugas');
  }

  return response.json();
}

export async function updateUser(userId, userData) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal mengupdate pengguna');
  }

  return response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal menghapus pengguna');
  }

  return response.json();
}

export async function getAllLaporan() {
  const response = await fetch(`${API_BASE_URL}/laporan`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal mengambil semua laporan');
  }

  return response.json();
}

export async function getUserLaporan(userId) {
  const response = await fetch(`${API_BASE_URL}/laporan/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal mengambil laporan');
  }

  return response.json();
}

export async function getLaporanDetail(laporanId) {
  const response = await fetch(`${API_BASE_URL}/laporan/${laporanId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal mengambil detail laporan');
  }

  return response.json();
}

export async function createLaporan(laporanData) {
  const response = await fetch(`${API_BASE_URL}/laporan`, {
    method: 'POST',
    body: laporanData, // FormData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal membuat laporan');
  }

  return response.json();
}

export async function updateLaporan(laporanId, laporanData) {
  const response = await fetch(`${API_BASE_URL}/laporan/${laporanId}`, {
    method: 'PUT',
    body: laporanData, // FormData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal mengupdate laporan');
  }

  return response.json();
}

export async function updateLaporanStatus(laporanId, status) {
  const response = await fetch(`${API_BASE_URL}/laporan/${laporanId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal mengupdate status laporan');
  }

  return response.json();
}

export async function deleteLaporan(laporanId) {
  const response = await fetch(`${API_BASE_URL}/laporan/${laporanId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.message || 'Gagal menghapus laporan');
  }

  return response.json();
}