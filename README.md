# InSight PDF: Unlock the Power of Your PDFs with AI-Driven Insights.


**InSight PDF** is a cutting-edge SaaS platform that redefines PDF document interaction. By harnessing the power of artificial intelligence, it offers a streamlined process for uploading, analyzing, and engaging with PDF content. The platform's AI-driven chatbot provides real-time, intelligent answers to user queries about PDF content, delivering valuable insights.

## Features

- **PDF Upload**: Users can upload PDF documents to the platform.
- **AI Chatbot**: Interact with PDF content through a natural language interface. The AI chatbot answers questions about the PDF's contents using advanced natural language processing (NLP) and vector embeddings to ensure precise and relevant responses.
- **Real-Time Interaction**: Engage with your documents like never before with real-time responses from the AI chatbot.
- **Responsive Design**: The platform is designed with Tailwind CSS, ensuring a responsive and user-friendly interface across devices.

## Technologies Used

InSight PDF is built using a modern technology to ensure performance, and ease of use.

- **Next.js**: A React-based framework used for building the user interface and handling server-side rendering.
- **TypeScript**: Ensures type safety and enhances the development experience with static typing.
- **Tailwind CSS & Shadcn**: Utility-first CSS frameworks for building custom designs directly in the HTML, providing a consistent and responsive UI.
- **Next.js API Routes**: Used for handling backend logic and API requests within the Next.js framework.
- **OpenAI API & Vercel AI SDK**: Integration with OpenAI's powerful language models to provide intelligent chatbot responses.
- **Langchain**: Facilitates the chaining of language model responses to provide contextual and accurate results.
- **Pinecone**: Handles vector embedding and similarity search for efficient document querying.
- **AWS S3**: Used for secure and scalable storage of uploaded PDFs.
- **Neon DB & Drizzle ORM**: A modern PostgreSQL database with Drizzle ORM for structured and efficient data management.
- **Clerk Authentication**: User authentication, including sign-up and sign-in, is securely managed by Clerk.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14.x or higher)
- npm or yarn
- Access to AWS S3, Pinecone, OpenAI API, and Neon DB accounts
- Clerk account for user authentication

### Installation

1. **Clone the repository**:

```bash
   git clone https://github.com/yourusername/ai-pdf-saas.git
   cd ai-pdf-saas
```

2. **Install dependencies**:

```sh
    npm install
     # or
    yarn install
```

3. **Set up environment variables**:

```bash
    OPENAI_API_KEY=your-openai-api-key
    OPENAI_ORGANIZATION=your-openai-orgranization
    OPENAI_PROJECT_ID=your-openai-project-id
    # NeonDB
    DATABASE_URL=your-neon-db-url
    # AWS S3
    NEXT_PUBLIC_S3_ACCESS_KEY=your-awsS3-access-key
    NEXT_PUBLIC_S3_SECRET_ACCESS_KEY=your-awsS3-secret-access-key
    NEXT_PUBLIC_S3_BUCKET_NAME=your-awsS3-bucket-name
    # Pinecone DB
    PINECONE_API_KEY=your-pinecone-api-key
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-public-key
    CLERK_SECRET_KEY=your-clerk-secret-key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

4. **Run the Development Server**:

```bash
    npm run dev
    # or
    yarn dev
```
#
Visit http://localhost:3000 in your browser to see the application in action.

