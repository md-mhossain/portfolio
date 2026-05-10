import {FaFacebook, FaGithub, FaLinkedin, FaWhatsapp} from "react-icons/fa";


export const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Projects', path: '/projects' },
    { label: 'Blog', path: '/blogs' },
    { label: 'Resume', path: '/cv/Monir_Hossain.pdf', download: true},
    { label: 'Start Project', path: '/contact'},
];


export const skills = [
    {
        "name": "JavaScript",
        "description": "JavaScript is a high-level, dynamic programming language that enables interactive web pages. It's the core technology of the web alongside HTML and CSS, and it's used for both frontend and backend development.",
        "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"
    },
    {
        "name": "React",
        "description": "React is a popular JavaScript library developed by Facebook for building fast and interactive user interfaces. It uses a component-based architecture and a virtual DOM for efficient rendering.",
        "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
    },
    {
        "name": "Next.js",
        "description": "Next.js is a powerful React framework that enables server-side rendering, static site generation, and API routes. It enhances performance, SEO, and developer experience in modern web apps.",
        "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
    },
    {
        "name": "Node.js",
        "description": "Node.js is a JavaScript runtime built on Chrome's V8 engine. It allows developers to build scalable backend services and APIs using JavaScript on the server-side.",
        "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
    },
    {
        "name": "Express.js",
        "description": "Express.js is a minimal and flexible Node.js web application framework that provides a robust set of features for building single-page, multi-page, and RESTful APIs.",
        "image": "/images/express.webp"
    },
    {
        "name": "MongoDB",
        "description": "MongoDB is a NoSQL database that stores data in JSON-like documents. It is highly scalable and ideal for handling large amounts of unstructured data.",
        "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
    },
    {
        "name": "Postman",
        "description": "Postman is an API platform used by developers to design, test, and document APIs. It simplifies HTTP request testing and enhances collaboration across teams.",
        "image": "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg"
    },
    {
        "name": "Tailwind CSS",
        "description": "Tailwind CSS is a utility-first CSS framework that allows you to style elements by applying pre-defined classes directly in your markup, speeding up the UI development process.",
        "image": "/images/icon.tailwind.png"
    },
    {
        "name": "Bootstrap",
        "description": "Bootstrap is a responsive CSS framework developed by Twitter. It includes prebuilt components and layout tools for building mobile-first, responsive websites quickly.",
        "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg"
    },
    {
        "name": "Git",
        "description": "Git is a distributed version control system used to track changes in source code. It allows multiple developers to collaborate on projects efficiently and safely.",
        "image": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"
    },
    {
        "name": "Vercel",
        "description": "Vercel is a cloud platform for static sites and serverless functions. It's the official hosting platform for Next.js and enables fast global deployments with an optimized developer experience.",
        "image": "/images/vercel.jpeg"
    },
    {
        "name": "Cloudinary",
        "description": "Cloudinary is a cloud-based image and video management platform that enables developers to upload, store, manipulate, optimize, and deliver media assets efficiently across web and mobile applications.",
        "image": "/images/cloudinary.svg"
    }
]




export const workProcess = [
    {
        title: "Discovery",
        description: "We start every new client interaction with an in-depth discovery call where we get to know each other, discuss your current and future objectives, and recommend the best course of action."
    },
    {
        title: "Strategy",
        description: "Every end-to-end project of ours begins with a tEspoke pre-build strateu. From brand ID consultation to in-depth ccxle reviews we're here to set the stage for success.",
        rotate: "4"
    },
    {
        title: "Design",
        description: "After we have a comprehensive understanding of your brand, we'll be ready to move onto design. Each page or will be designed, reviewed, and given your stamp of approval."
    }
    ,
    {
        title: "Build",
        description: "Whether we've just finished designing your new site or you're handing off finished designs for us to develop in Webflow, we're here to apply our trusted development process to your project."
    }
]

export const socials = [
    {
        id: 1,
        name: "Linkedin",
        image: "/images/linkedin.png",
        onClick: ()=>{
            window.open("https://www.linkedin.com/in/monirhdigital", "_blank", "noopener,noreferrer");
        }
    },
    {
        id: 2,
        name: "Github",
        image: "/images/github.png",
        onClick: ()=>{
            window.open("https://github.com/monir-hossaien", "_blank", "noopener,noreferrer");
        }
    },
    {
        id: 3,
        name: "Facebook",
        image: "/images/facebook.png",
        onClick: ()=>{
            window.open("https://facebook.com/MonirHossain20230", "_blank", "noopener,noreferrer");
        }
    },
    {
        id: 4,
        name: "Whatsapp",
        image: "/images/whatsapp.png",
        onClick: ()=>{
            window.open("https://wa.me/8801787960556", "_blank", "noopener,noreferrer");
        }
    }
];


// blog
export const blogs = [
    {
        id: 1,
        title: "Understanding the MERN Stack: A Beginner's Guide",
        shortDes:
            "The MERN stack is a powerful combination of technologies including MongoDB, Express.js, React, and Node.js. This guide walks you through how these tools work together to build robust full-stack applications, with examples and diagrams to make the learning process easier.",
        image:
            "/images/Mern Stack.png",
        category: "Web Development",
        date: "2025-06-25",
    },
    {
        id: 2,
        title: "What are React Server Components and Why Do They Matter?",
        shortDes:
            "React Server Components enable rendering on the server without sending unnecessary JavaScript to the browser. This article explores the motivation behind Server Components, their benefits for performance, and how to start using them with frameworks like Next.js.",
        image:
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
        category: "React.js",
        date: "2025-06-20",
    },
    {
        id: 3,
        title: "Why Tailwind CSS is a Game Changer for Modern UI",
        shortDes:
            "Tailwind CSS introduces a utility-first approach to styling, making it faster and more consistent to build responsive user interfaces. This post explains how Tailwind improves development speed, how to customize themes, and why developers love it.",
        image:
            "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1200&q=80",
        category: "CSS & Styling",
        date: "2025-06-15",
    },
    {
        id: 4,
        title: "Deploying Your Full-Stack App on Render",
        shortDes:
            "Deploying full-stack applications can be intimidating, but Render makes it simple. This tutorial covers step-by-step deployment of a Node.js backend and React frontend, handling environment variables, and setting up auto-deploy from GitHub.",
        image:
            "https://images.unsplash.com/photo-1556761175-129418cb2dfe?auto=format&fit=crop&w=1200&q=80",
        category: "Deployment",
        date: "2025-06-10",
    },
    {
        id: 5,
        title: "Securing Your Node.js APIs with JWT Authentication",
        shortDes:
            "Authentication is critical in modern applications. Learn how to implement JSON Web Token (JWT) based authentication in a Node.js API using Express, and protect routes with middleware to ensure secure access control.",
        image:
            "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=1200&q=80",
        category: "Backend",
        date: "2025-06-05",
    },
    {
        id: 6,
        title: "React Performance Optimization: Techniques You Should Know",
        shortDes:
            "React performance issues can occur as your application grows. This post discusses effective techniques like memoization, lazy loading, code splitting, and virtualization to boost your React app's speed and efficiency.",
        image:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
        category: "React.js",
        date: "2025-06-01",
    },
    {
        id: 7,
        title: "Simplify State Management in React with Zustand",
        shortDes:
            "Zustand offers a simple yet powerful alternative to Redux and Context API for state management. This article covers the basics of Zustand, creating global state stores, and integrating it seamlessly in your component tree.",
        image:
            "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
        category: "React.js",
        date: "2025-05-28",
    },
];

//projects
export const projects = [
    {
        id: 1,
        title: "Raangalay",
        description: "A premium e-commerce platform specializing in traditional and lifestyle products. Developed the high-performance frontend using Next.js, focusing on a seamless user experience, responsive product galleries, and optimized page speed.",
        image: "/images/raangalay.png",
        tags: ["Next.js", "Shadcn UI", "Tailwind CSS", "TypeScript", "Lucide Icons", "Framer Motion"],
        github: "https://github.com/monir-hossaien/raangalay-frontend", // Verify your repo name
        live: "https://raangalay.com"
    },
    {
        id: 2,
        title: "Doctor Finder",
        description: "A MERN-based platform to search doctors by location, specialty, and hospital. Includes secure JWT authentication, admin dashboard, and a full appointment booking system with modern UI/UX.",
        image: "/images/doctor_finder.png",
        tags: ["React", "Express.js", "MongoDB", "JWT", "Tailwind", "Zustand"],
        github: "https://github.com/monir-hossaien/doctor-finder",
        live: "https://care-hop-service.vercel.app"
    },
    {
        id: 3,
        title: "Quran",
        description: "A modern Quran learning app with a beautiful UI and comprehensive features, including audio recitation playback and search by translation, designed to help users study, read, and memorize the Holy Quran effectively.",
        image: "/images/quran.png",
        tags: ["Next.js", "Tailwind", "Express Js"],
        github: "https://github.com/md-mhossain/quran-web-app",
        live: "https://quran-web-app-sigma.vercel.app"
    },
];




