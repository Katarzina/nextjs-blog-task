import axios from 'axios';
import { Post, ApiResponse } from '@/types';

const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  TOKEN: process.env.NEXT_PUBLIC_API_TOKEN || '',
} as const;


// Validace při startu aplikace
if (!API_CONFIG.BASE_URL) {
  console.warn('API_BASE_URL není nastaveno');
}

if (!API_CONFIG.TOKEN) {
  console.warn('API_TOKEN není nastaven');
}

// Helper function to delay between retries
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function apiRequest<T>(endpoint: string, options?: { method?: string; data?: Record<string, unknown> }): Promise<T> {
  if (!API_CONFIG.TOKEN) {
    throw new Error('API token není nastaven. Prosím zkontrolujte .env.local soubor.');
  }

  const fullUrl = `${API_CONFIG.BASE_URL}${endpoint}`;
  if (process.env.NODE_ENV === 'development') {
    console.log(`[API Request] ${options?.method || 'GET'} ${fullUrl}`);
  }

  // Retry logic for 404 errors (up to 3 attempts)
  let lastError;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      if (attempt > 1) {
        const delayMs = attempt * 1000; // Exponential backoff: 1s, 2s, 3s
        if (process.env.NODE_ENV === 'development') {
          console.log(`[API Retry] Attempt ${attempt}/3 after ${delayMs}ms delay...`);
        }
        await delay(delayMs);
      }

      const response = await axios({
        method: options?.method || 'GET',
        url: fullUrl,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          token: API_CONFIG.TOKEN,
          ...(options?.data || {})
        },
        timeout: 10000, // 10 second timeout
      });

      if (process.env.NODE_ENV === 'development') {
        console.log(`[API Response] Status: ${response.status} (attempt ${attempt})`);
      }
      return response.data;
    } catch (error) {
      lastError = error;
      
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (process.env.NODE_ENV === 'development') {
          console.error(`[API Error] Attempt ${attempt}/3, Status: ${status}, URL: ${fullUrl}`);
          
          if (error.response?.data) {
            console.error(`[API Error] Response data:`, error.response.data);
          }
        }
        
        // Don't retry on certain errors
        if (status === 401 || status === 405) {
          break;
        }
        
        // For 404 and 500 errors, retry if we have attempts left
        if ((status === 404 || status === 500) && attempt < 3) {
          if (process.env.NODE_ENV === 'development') {
            console.log(`[API] Will retry due to ${status} error...`);
          }
          continue;
        }
      }
    }
  }
  
  // If we've exhausted all retries, throw the last error
  if (axios.isAxiosError(lastError)) {
    const status = lastError.response?.status;
    
    if (status === 401) {
      throw new Error('Neplatný API token. Zkontrolujte prosím konfiguraci.');
    } else if (status === 404) {
      // Re-throw 404 as axios error so it can be caught by fetchPostDetail
      throw lastError;
    } else if (status === 405) {
      throw new Error('API nepodporuje tuto metodu.');
    } else if (status === 500) {
      throw new Error('Chyba serveru. Zkuste to prosím později.');
    } else if (!lastError.response) {
      console.error(`[API Error] Network error:`, lastError.message);
      throw new Error('Nelze se připojit k serveru. Zkontrolujte připojení k internetu.');
    }
    
    throw new Error(`Chyba API (${status || 'neznámá'}): ${lastError.message}`);
  }
  
  throw lastError || new Error('Neznámá chyba při komunikaci s API');
}

// Get posts list (server-side only)
export async function fetchPosts(): Promise<Post[]> {
  const data = await apiRequest<ApiResponse>('/posts/list');
  
  if (data.status !== 'OK') {
    throw new Error('API vrátilo chybový status');
  }
  
  if (!data.applications || !Array.isArray(data.applications)) {
    console.error('Invalid API response format:', data);
    throw new Error('Neplatný formát odpovědi ze serveru');
  }

  return data.applications;
}

// Get post detail (server-side only)
export async function fetchPostDetail(id: number): Promise<Post | null> {
  try {
    console.log(`[API] Fetching post detail for ID: ${id}`);
    const data = await apiRequest<{ status: string; post: Post }>(`/posts/view/${id}`);
    
    console.log(`[API] Response status: ${data?.status}`);
    
    // API returns data in object with key "post"
    if (data && data.status === 'OK' && data.post) {
      console.log(`[API] Post found: ${data.post.title}`);
      return {
        id: id, // API doesn't return ID, use ID from parameters
        title: data.post.title,
        content: data.post.content,
        author: data.post.author,
        image: data.post.image,
        createdAt: data.post.createdAt
      };
    }

    // If status is not OK but also not an error, return null
    console.log(`[API] Post not found or invalid status: ${data?.status}`);
    return null;
  } catch (error) {
    // Handle 404 
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      console.log(`[API] 404 error for post ID: ${id}`);
      return null;
    }
    // For other errors, log and re-throw
    console.error(`[API] Error fetching post detail for ID ${id}:`, error);
    throw error;
  }
}

