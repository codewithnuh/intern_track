# InternTrack

A modern, full-stack web application designed to streamline and manage internship programs. InternTrack provides a comprehensive platform for intern onboarding, task management, attendance tracking, mentorship coordination, and performance evaluation.

## 🚀 Features

### **User Management & Authentication**
- Multi-role authentication system (INTERN, MENTOR, HR, ADMIN)
- Secure Clerk-based authentication with email/password
- Role-based access control (RBAC) with granular permissions
- User onboarding workflow with approval states

### **Intern Management**
- Comprehensive intern profile management with university details
- Mentor-intern assignment system
- Real-time attendance tracking (check-in/check-out)
- Leave request management with multi-level approval workflow

### **Project & Task Management**
- Department-based project organization
- Task assignment and lifecycle management (TODO, IN_PROGRESS, REVIEW, COMPLETED)
- Project assignment to interns with progress monitoring
- Real-time status updates and notifications

### **Performance & Feedback**
- Structured feedback system with 1-5 rating scale
- Performance evaluation tracking and reporting
- Comprehensive audit logging for all activities
- Analytics-ready data structure

### **Administrative Features**
- Department and organization management
- User role and permission management
- Complete audit trail for compliance
- Advanced filtering and search capabilities

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19.2.3 with Tailwind CSS v4
- **Components**: shadcn/ui (Radix UI-based)
- **Forms**: @tanstack/react-form
- **Theme**: next-themes (dark/light mode support)

### **Backend**
- **Runtime**: Node.js (Next.js server)
- **Database**: PostgreSQL with Prisma ORM v7.3.0
- **Authentication**: Clerk
- **Validation**: Zod v4.3.6
- **API**: Next.js Server Actions

### **Development Tools**
- **Package Manager**: pnpm (10.14.0)
- **Linting**: ESLint with Next.js configuration
- **Type Checking**: TypeScript strict mode
- **Database**: Prisma Studio for management

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm package manager
- Clerk account for authentication

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd intern-track
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup
Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/intern_track"

# Clerk Authentication
CLERK_SECRET_KEY="your_clerk_secret_key"
CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio for database management
npx prisma studio
```

### 5. Start Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
intern-track/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Role-based dashboard
│   ├── sign-in/           # Authentication
│   ├── sign-up/
│   └── forgot-password/
├── actions/               # Server actions for data operations
├── components/            # React components
│   ├── auth/             # Authentication components
│   └── ui/               # Reusable UI components (shadcn/ui)
├── dal/                  # Data Access Layer
├── lib/                  # Core libraries
│   ├── authorization/    # RBAC system
│   └── db.ts            # Database connection
├── schemas/              # Zod validation schemas
├── utils/                # Utility functions
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔐 Security Features

- **Authentication**: Secure Clerk-based authentication with session management
- **Authorization**: Custom RBAC system with granular permissions
- **Input Validation**: Comprehensive Zod schema validation
- **Data Protection**: Environment-based configuration
- **Audit Trail**: Complete activity logging for compliance

## 📊 Database Schema

The application uses a well-designed PostgreSQL schema with key entities:

- **Users**: Base user identity with roles and status
- **Interns**: Extended user profiles with university information
- **Mentors**: Department-associated mentors
- **Departments**: Organizational structure
- **Projects**: Department-based projects
- **Tasks**: Individual assignments with status tracking
- **Attendance**: Time tracking for interns
- **Feedback**: Performance evaluation system
- **LeaveRequests**: Time-off management
- **AuditLog**: Comprehensive activity tracking

## 🎯 Role-Based Access Control

### **ADMIN**
- Full system access and configuration
- User and department management
- System analytics and reporting

### **HR**
- Intern management and onboarding
- Leave request approval
- Performance oversight

### **MENTOR**
- Task assignment and management
- Feedback and evaluation
- Project oversight

### **INTERN**
- Self-service profile management
- Task status updates
- Attendance and leave requests

## 🚀 Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build           # Build for production
pnpm start           # Start production server
pnpm lint           # Run ESLint
pnpm typescheck      # Run TypeScript type checking

# Database
npx prisma generate   # Generate Prisma client
npx prisma migrate    # Run database migrations
npx prisma studio     # Open database GUI
npx prisma db push    # Push schema to database
```

## 🌐 Deployment

The application is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

For other platforms, ensure:
- Node.js 18+ runtime
- PostgreSQL database
- Environment variables are properly configured

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Open an issue on GitHub
- Check the documentation
- Contact the development team

## 🔮 Roadmap

- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Integration with popular HR systems
- [ ] Multi-language support
- [ ] Advanced reporting features
- [ ] API for third-party integrations

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.