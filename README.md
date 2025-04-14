# Matcchy

**Matcchy** is an e-commerce and social platform for women’s fancy dresses and accessories. Built with modern technologies such as **Next.js**, **TypeScript**, **Zod**, **Prisma**, **PostgreSQL (via Neon)**, **zustand**, **Pusher**, **Cloudinary**, and **HeroIcons**, this application enables seamless user interaction, real-time communication, and intuitive profile management.

---

## 🚀 Live Demo

- **Website**: [https://matcchy.vercel.app/](https://matcchy.vercel.app/)
- **Admin Account**: `admin@test.com` / `password`
- **Member Account**: Replace `membername` with a name of your choice. For example:  
  - Email: `tood@example.com`  
  - Password: `passoord` (Note: this seems to be a typo; adjust in the app if needed)

---

## ✨ Features

- **User Authentication** with username and password
- **OAuth Integration** with GitHub and Google
- **Email Verification** (currently disabled; use any valid email format during testing)
- **Password Reset** functionality (via Resend)
- **Browse Members** by filtering based on preferences, view their profiles, like, and message them
- **Image Upload** using Cloudinary
- **Real-Time Messaging & Notifications** powered by Pusher
- **Inbox Management** for conversations
- **Role-Based Access**:
  - **Admin**: Full access to app features including managing member photos (approve/disapprove)
  - **Member**: Standard profile and interaction access
- **Profile Management** and editing

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (use [Neon](https://neon.tech/) for hosted Postgres)

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/vvduth/matcchy.git
   cd matcchy
   ```

2. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Environment Variables**

   Create a `.env` file in the root directory and configure the following:

   ```env
   DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

   AUTH_SECRET="your-auth-secret"

   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   NEXT_PUBLIC_CLOUDINARY_API_KEY="your-api-key"
   CLOUDINARY_API_SECRET="your-api-secret"

   NEXT_PUBLIC_PUSHER_APP_KEY="your-pusher-app-key"
   PUSHER_APP_ID="your-pusher-app-id"
   PUSHER_SECRET="your-pusher-secret"

   RESEND_API_KEY="your-resend-api-key"

   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"

   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"

   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   ```

4. **Run Prisma Migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

---

## 🧪 Running the App

### Development Server

Start the local development server:

```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` in your browser.

### Running Tests

```bash
npm run test
# or
yarn test
```

---

## 🏗️ Building for Production

To build the app for production:

```bash
npm run build
# or
yarn build
```

To start the production server:

```bash
npm run start
# or
yarn start
```

---

## 📌 Notes

- Ensure you have a working PostgreSQL database setup before running migrations.
- For real-time features to work correctly, configure Pusher and Resend API keys accurately.
- Email verification is currently disabled for convenience during testing.

---