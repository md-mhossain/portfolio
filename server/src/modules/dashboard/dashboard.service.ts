import {prisma} from "../../lib/prisma.js"
export const dashboardService = {
  async summary() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      users,
      projects,
      blogs,
      messages,
      unreadMessages,
      newUsersToday,
      publishedBlogs,
      featuredProjects,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
      prisma.blog.count(),
      prisma.message.count(),
      prisma.message.count({ where: { status: "NEW" } }),
      prisma.user.count({ where: { createdAt: { gte: today } } }),
      prisma.blog.count({ where: { status: "PUBLISHED" } }),
      prisma.project.count({ where: { featured: true } }),
    ]);

    const recentMessages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    const recentBlogs = await prisma.blog.findMany({
      orderBy: { publishedAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        publishedAt: true,
        createdAt: true,
      },
    });

    return {
      counts: {
        users,
        projects,
        blogs,
        messages,
        unreadMessages,
        newUsersToday,
        publishedBlogs,
        featuredProjects,
      },
      recentMessages,
      recentBlogs,
    };
  },
};
