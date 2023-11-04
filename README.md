# ASKIT

![ASKIT Logo](askit-logo.png)

🚀 **ASKIT** is a cutting-edge community-driven Q&A platform that leverages Artificial Intelligence to expand the
horizons of knowledge sharing beyond technology. It caters to a diverse range of categories, providing users with a rich
tapestry of wisdom. ASKIT is built with a tech stack comprising **T3-stack**, **Next.js**, **NextAuth.js**, **Prisma**,
**Tailwind CSS**, and **tRPC**.

- [🚀 Demo](https://www.askit.study/)
- [🤝 Contributing Guidelines](CONTRIBUTING.md)
- [📜 License](LICENSE)

## Table of Contents

- [✨ Features](#features)
- [🚀 Getting Started](#getting-started)
  - [🛠️ Prerequisites](#prerequisites)
  - [🚀 Installation](#installation)
- [🌟 Usage](#usage)
- [⚙ Configuration](#configuration)
- [🤝 Contributing](#contributing)
- [📜 License](#license)

## ✨ Features

- **Diverse Categories:** ASKIT offers a wide variety of categories, not limited to just tech. Users can find answers to
  their questions on topics ranging from technology to arts, science, and more.

- **AI-Powered Search:** Our AI-driven search engine makes it easier to find relevant answers quickly.

- **User Profiles:** Customize your profile, track your contributions, and gain reputation points as you help others.

- **Secure Authentication:** We use NextAuth.js for secure and customizable authentication.

- **Efficient Data Handling:** Prisma ensures efficient data handling and database operations.

- **Modern UI:** ASKIT boasts a clean and user-friendly interface powered by Tailwind CSS.

- **APIs:** We use tRPC for efficient and type-safe API communication.

## Getting Started

### 🛠️Prerequisites

- Node.js
- NPM or Yarn or PNPM
- Your favorite code editor

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ChiragAgg5k/askit
   cd askit
   ```

2. Install dependencies using your favorite package manager:

   ```bash
   npm install
   # pnpm install
   # yarn install
   ```

3. Create a .env file in the root directory with the following environment variables and values:

<div style="margin-left: 50px;">
Prisma

- #### https://www.prisma.io/docs/reference/database-reference/connection-urls#env
       DATABASE_URL="file:./db.sqlite"

#### Next Auth

- #### You can generate a new secret on the command line with:
  ```bash
  openssl rand -base64 32
  ```
- #### https://next-auth.js.org/configuration/options#secret
  NEXTAUTH_URL="http://localhost:3000"

#### GitHub OAuth

    GITHUB_CLIENT_ID=""
    GITHUB_CLIENT_SECRET=""
    ```

#### Google OAuth

    GOOGLE_CLIENT_ID=""
    GOOGLE_CLIENT_SECRET=""
    ```

</div>

4. Migrate the database:

   ```bash
   npm prisma migrate dev
   ```

5. Run the development server:

   ```bash
   npm run dev
   # pnpm run dev
   # yarn dev
   ```

   Your ASKIT instance should now be running at http://localhost:3000.

## ⚙ Configuration

You can customize ASKIT's behavior by modifying the configuration files. Please refer to the official documentation for
details on configuration options.

## 🌟Usage

Visit the ASKIT website [here](https://www.askit.study/).
Sign in or create an account.
Ask any question on any topic you would like, if it exists you will be redirected to the question page, if not you will be redirected to the create question page.
Ask questions, provide answers, or upvote and comment on existing posts.

## Dependencies

- [T3-stack](https://create.t3.gg)
- [Next.js](https://nextjs.org/)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [tRPC](https://trpc.io/)

## 🤝Contributors

- Chirag Aggarwal - [Github](https://github.com/ChiragAgg5k/)
- Shivangi Tripathi - [Github](https://github.com/ShiviTripathi13/)
- Divesh Saini - [Github](https://github.com/divesh0001/)
- Krish - [Github](https://github.com/krishrajput1107)

## License

This project is licensed under the [Your License Name] License - see the LICENSE file for details.
