// API Types
export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt?: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
}

export interface ApiResponse {
  applications?: Post[];
  status: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  author: string;
}

// Component Props Types
export interface PostProps extends Post {
  className?: string;
}

export interface HeroProps {
  title: string;
  backgroundImage?: string;
  className?: string;
}

export interface SeznamProps {
  className?: string;
  posts: Post[];
}

// Context Types
export interface ErrorContextType {
  showError: (message: string) => void;
}