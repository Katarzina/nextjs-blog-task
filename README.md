# Next.js Blog Application

A modern blog application built with Next.js 15, TypeScript, and Tailwind CSS. Features server-side rendering, incremental static regeneration, and a responsive design.

## Features

- **Blog Post List**: Display all blog posts with author, title, and preview
- **Post Details**: Full post content with author information
- **Create New Posts**: Form with validation to add new blog posts
- **Server-Side Rendering**: Optimized for SEO and performance
- **Incremental Static Regeneration**: Posts are cached and revalidated every 60 seconds
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Client and server-side validation using Zod
- **Error Handling**: Graceful error states and 404 pages

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-blog-task
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_API_BASE_URL=https://stage73.q2.cz/q2onboarding/q2
NEXT_PUBLIC_API_TOKEN=your-api-token-here
```

**Important**: Replace `your-api-token-here` with the actual API token provided for the Q2 onboarding API.

## Running the Application

### Development Mode
```bash
yarn dev
```
The application will be available at http://localhost:3000

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── actions/           # Server actions
│   │   └── posts.ts      # Post-related actions
│   ├── detail/[id]/       # Dynamic post detail pages
│   │   ├── page.tsx      # Post detail page
│   │   ├── loading.tsx   # Loading state
│   │   └── error.tsx     # Error handling
│   ├── new/               # Create new post page
│   ├── error.tsx         # Global error page
│   ├── not-found.tsx     # 404 page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── ErrorMessage.tsx
│   │   ├── Input.tsx
│   │   ├── Label.tsx
│   │   ├── Spinner.tsx
│   │   ├── SubmitButton.tsx
│   │   └── Textarea.tsx
│   ├── Card/             # Post card component
│   ├── ClientLayout.tsx  # Client-side layout wrapper
│   ├── Footer.tsx        # Footer component
│   ├── Hero/             # Hero banner component
│   ├── Navigation.tsx    # Navigation component
│   ├── PostForm/         # Post creation form
│   └── PostList/         # Post list with infinite scroll
├── contexts/             # React contexts
│   └── NotificationContext.tsx  # Notification system
├── hooks/                # Custom React hooks
│   └── useScrollRestoration.ts  # Scroll position hook
├── lib/                  # Utility functions
│   └── api.ts           # API client with retry logic
└── types/               # TypeScript type definitions
    └── index.ts         # Shared types and interfaces
```

## API Integration

The application integrates with the Q2 onboarding API. The API has specific requirements:

- Uses GET requests with body parameters (non-standard)
- Requires authentication token in request body
- Returns posts without IDs in the list endpoint

### Available Endpoints

- `GET /posts/list` - Fetch all posts
- `GET /posts/view/{id}` - Fetch single post by ID
- `POST /posts/create` - Create new post

## Key Technologies

- **Next.js 15.4.5**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zod**: Schema validation
- **Axios**: HTTP client (supports GET with body)
- **React 19**: Latest React features including useActionState






