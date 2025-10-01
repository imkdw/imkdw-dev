import { faker } from '@faker-js/faker';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import { Article, ArticleComment, Member, PrismaClient, Series, Tag } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async tx => {
      await tx.articleComment.deleteMany();
      await tx.articleTag.deleteMany();
      await tx.seriesTag.deleteMany();
      await tx.article.deleteMany();
      await tx.articleHistory.deleteMany();
      await tx.series.deleteMany();
      await tx.tag.deleteMany();
      await tx.member.deleteMany();

      const members: Member[] = [];
      for (let i = 0; i < 20; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const member = await tx.member.create({
          data: {
            id: faker.string.uuid(),
            email: faker.internet.email(),
            nickname: `${firstName}${lastName}`.toLowerCase(),
            profileImage: faker.image.avatar(),
            providerId: faker.string.alphanumeric(20),
            provider: faker.helpers.arrayElement(['google', 'github']),
            role: MEMBER_ROLE.USER,
          },
        });
        members.push(member);
      }

      const tagNames = [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'NestJS',
        'Next.js',
        'Prisma',
        'PostgreSQL',
        'Docker',
        'AWS',
      ];
      const tags: Tag[] = [];
      for (const tagName of tagNames) {
        const tag = await tx.tag.create({
          data: {
            id: tagName.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            name: tagName,
          },
        });
        tags.push(tag);
      }

      const series: Series[] = [];
      const seriesTitles = [
        'Modern JavaScript Guide',
        'TypeScript Deep Dive',
        'React Best Practices',
        'Backend with NestJS',
        'Full-Stack Development',
        'Frontend Development',
      ];

      for (const title of seriesTitles) {
        const slug = title.toLowerCase().replace(/\s+/g, '-');
        const seriesData = await tx.series.create({
          data: {
            id: faker.string.uuid(),
            title,
            slug,
            description: faker.lorem.paragraph(2),
            articleCount: 0, // 초기값
            totalReadMinute: 0, // 초기값
          },
        });
        series.push(seriesData);
      }

      const articles: Article[] = [];
      for (let i = 0; i < 100; i++) {
        const title = faker.lorem.sentence({ min: 3, max: 8 });
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9\s]/g, '')
          .replace(/\s+/g, '-');
        const readMinute = faker.number.int({ min: 3, max: 30 });
        const randomSeries = faker.helpers.arrayElement(series);

        const article = await tx.article.create({
          data: {
            id: faker.string.uuid(),
            title,
            slug,
            content: faker.lorem.paragraphs(faker.number.int({ min: 5, max: 20 }), '\n\n'),
            seriesId: randomSeries.id,
            viewCount: faker.number.int({ min: 0, max: 1000 }),
            readMinute,
          },
        });
        articles.push(article);
      }

      for (const article of articles) {
        const randomTags = faker.helpers.arrayElements(tags, { min: 2, max: 5 });
        for (const tag of randomTags) {
          await tx.articleTag.create({
            data: {
              articleId: article.id,
              tagId: tag.id,
            },
          });
        }
      }

      for (const seriesItem of series) {
        const randomTags = faker.helpers.arrayElements(tags, { min: 3, max: 5 });
        for (const tag of randomTags) {
          await tx.seriesTag.create({
            data: {
              seriesId: seriesItem.id,
              tagId: tag.id,
            },
          });
        }
      }

      for (const seriesItem of series) {
        const seriesArticles = articles.filter((article: Article) => article.seriesId === seriesItem.id);
        const totalReadMinute = seriesArticles.reduce((sum: number, article: Article) => sum + article.readMinute, 0);
        const lastArticle = seriesArticles.sort(
          (a: Article, b: Article) => b.createdAt.getTime() - a.createdAt.getTime()
        )[0];

        await tx.series.update({
          where: { id: seriesItem.id },
          data: {
            articleCount: seriesArticles.length,
            totalReadMinute,
            lastArticleCreatedAt: lastArticle?.createdAt ?? null,
          },
        });
      }

      const createdComments: ArticleComment[] = [];

      for (const article of articles) {
        const numComments = faker.number.int({ min: 0, max: 5 });

        for (let i = 0; i < numComments; i++) {
          const randomMember = faker.helpers.arrayElement(members);
          const comment = await tx.articleComment.create({
            data: {
              id: faker.string.uuid(),
              content: faker.lorem.paragraph(faker.number.int({ min: 1, max: 3 })),
              articleId: article.id,
              authorId: randomMember.id,
              parentId: null, // 루트 댓글
            },
          });
          createdComments.push(comment);

          // 대댓글 생성 (30% 확률)
          if (faker.datatype.boolean({ probability: 0.3 })) {
            const replyMember = faker.helpers.arrayElement(members);
            await tx.articleComment.create({
              data: {
                id: faker.string.uuid(),
                content: faker.lorem.sentence(faker.number.int({ min: 5, max: 15 })),
                articleId: article.id,
                authorId: replyMember.id,
                parentId: comment.id,
              },
            });
          }
        }
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

main()
  .catch(error => {
    // eslint-disable-next-line no-console
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
