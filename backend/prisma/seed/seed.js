import prisma from "../../src/models/prisma-client.js";
import fs from "node:fs/promises";
import benchmark from "../../src/utils/benchmark.js";
import bcrypt from "bcrypt";

async function readFile(filename, trim = false) {
	const regex = { paragraphs: /\r?\n/, words: /\r?\n|,|\s|[.]/ };
	try {
		let data = await fs.readFile(`./prisma/seed/${filename}.txt`, { encoding: "utf8" });
		data = data.split(regex[filename] || /\r?\n/).filter((item) => item !== "");
		if (trim) data = data.map((item) => item.replaceAll(" ", ""));
		return data.sort();
	} catch (err) {
		console.error(err);
	}
}

function rand(min = 0, max = 1) {
	return Math.floor(Math.random() * max + min);
}

function randWords(words, min = 0, max = 1) {
	return Array.from({ length: rand(min, max) }).reduce(
		(title, item, index) => title + (index > 0 ? " " : "") + words[rand(0, words.length)],
		""
	);
}

function randCreation(index = 1) {
	return new Date(new Date() - rand(1000, (2592000000 * index) / 20));
}

const MAX_USER = 100;
const MAX_POSTS = 6;
const MAX_POST_VOTES = 100;
const MAX_COMMENTS = 10;
const MAX_COMMENT_VOTES = 30;

async function main() {
	const mainBench = benchmark("Seed");
	const names = await readFile("names", true);
	const userNames = Array.from({ length: MAX_USER }).map(() => names[rand(0, names.length - 1)]);
	const paragraphs = await readFile("paragraphs");
	const words = await readFile("words");
	// console.log("names : ", names, randWords(words, 6));

	// return;
	await prisma.commentVotes.deleteMany({});
	await prisma.postTags.deleteMany({});
	await prisma.tags.deleteMany({});
	await prisma.posts.deleteMany({});
	await prisma.users.deleteMany({});

	const usersData = await Promise.all([
		...userNames.map(async (name, index) => {
			return {
				username: name,
				email: `${name + index}@email.com`,
				password: await bcrypt.hash("1111111111", 1),
				created: randCreation(1000),
			};
		}),
	]);

	const users = await prisma.users.createManyAndReturn({
		data: usersData,
		skipDuplicates: true,
	});

	const tags = await prisma.tags.createManyAndReturn({
		data: Array.from({ length: 100 }).map(() => {
			return { name: randWords(words, 1, 2), created: randCreation(1000) };
		}),
		skipDuplicates: true,
	});

	const posts = await Promise.all(
		users.map(
			async (user, index) =>
				await Promise.all(
					Array.from({ length: rand(0, MAX_POSTS) }).map(
						async (item) =>
							await prisma.posts.create({
								data: {
									title: randWords(words, 3, 8),
									content: paragraphs[rand(0, paragraphs.length - 1)],
									created: randCreation(index),
									authorId: user.id,
									tags: {
										createMany: {
											data: [
												...Array.from({ length: rand(1, 5) }).map(() => {
													return {
														tagName: tags[rand(0, tags.length - 1)].name,
													};
												}),
											],
											skipDuplicates: true,
										},
									},
									votes: {
										createMany: {
											data: [
												...Array.from({ length: rand(0, MAX_POST_VOTES) }).map(() => {
													return {
														value: Boolean(rand(0, 2)),
														userId: users[rand(0, users.length - 1)].id,
													};
												}),
											],
											skipDuplicates: true,
										},
									},
									comments: {
										createMany: {
											data: [
												...Array.from({ length: rand(0, MAX_COMMENTS) }).map(() => {
													return {
														content: randWords(words, 2, 20),
														userId: users[rand(0, users.length - 1)].id,
													};
												}),
											],
											skipDuplicates: true,
										},
									},
								},
								include: { tags: true, votes: true, comments: true },
							})
					)
				)
		)
	);

	const comments = [];
	posts.forEach((userPosts) =>
		userPosts.forEach((post) =>
			post.comments.forEach((comment) => {
				comments.push(comment);
			})
		)
	);

	const commentVotes = await Promise.all(
		comments.map((comment) => {
			return prisma.commentVotes.createMany({
				data: [
					...Array.from({ length: rand(0, MAX_COMMENT_VOTES) }).map(() => {
						return {
							value: Boolean(rand(0, 2)),
							userId: users[rand(0, users.length - 1)].id,
							commentId: comment.id,
						};
					}),
				],
				skipDuplicates: true,
			});
		})
	);

	mainBench.stop();
	console.log("Users added : ", users.length);
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
