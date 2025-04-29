const apiMap: Record<string, string | undefined> = {
  'elearning-node1.cennos.intranet': 'http://elearning-node1.cennos.intranet/',
  'elearning.cennext.com': 'https://elearning-api.cennext.com/',
  'localhost': process.env.NEXT_PUBLIC_API_URL,
};

const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Nếu hostname chứa "localhost" (có thể có port)
    if (hostname.includes('localhost')) {
      return process.env.NEXT_PUBLIC_API_URL;
    }

    return apiMap[hostname] || process.env.NEXT_PUBLIC_API_URL;
  }

  // SSR fallback
  return process.env.NEXT_PUBLIC_API_URL;
};

export default getApiUrl;
