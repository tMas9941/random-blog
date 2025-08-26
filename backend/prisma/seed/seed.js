import prisma from "../../src/models/prisma-client.js";
import fs from "node:fs/promises";
import benchmark from "../../src/utils/benchmark.js";
import bcrypt from "bcrypt";
import { CLOUD_NAME } from "../../src/constants/constants.js";
import cloudinaryService from "../../src/services/cloudinary.service.js";

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

const MAX_USERNAME_LENGTH = 30;
const MAX_TITLE_LENGTH = 150;
const MAX_POST_LENGTH = 1000;
const MAX_COMMENT_LENGTH = 300;
const MAX_TAG_LENGTH = 20;

async function main() {
	const mainBench = benchmark("Seed", true);
	const { userNames, paragraphs, words } = await readDataFromFiles();

	const avatars = FetchCloudinaryAvatars();

	await clearTables();

	const users = await createUsers(userNames);
	const profiles = avatars.then((avatars) => craeteProfiles({ users, paragraphs, avatars }));
	const tags = await createTags({ words });
	const posts = await createPosts({ users, tags, paragraphs, words });
	const comments = await getAllComments(posts);
	await createCommentVotes(comments, users);

	await profiles;
	mainBench.stop();
}
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

async function readDataFromFiles() {
	try {
		const bench = benchmark("readDataFromFiles", true);
		const names = await readFile("names", true);

		const userNames = Array.from({ length: MAX_USER }).map(() => names[rand(0, names.length - 1)]);
		const paragraphs = await readFile("paragraphs");
		const words = await readFile("words");
		bench.stop("Read data from files");
		return { userNames, paragraphs, words };
	} catch (error) {
		console.log("File loading failed!", error);
	}
}

async function clearTables() {
	try {
		const bench = benchmark("clearTables", true);

		await prisma.commentVotes.deleteMany({});
		await prisma.profiles.deleteMany({});
		await prisma.postTags.deleteMany({});
		await prisma.tags.deleteMany({});
		await prisma.posts.deleteMany({});
		await prisma.users.deleteMany({});
		await prisma.roles.deleteMany({});
		await prisma.permissions.deleteMany({});
		bench.stop("Clear tables");
	} catch (error) {
		console.log("Clear tables failed!", error);
	}
}

async function createUsers(userNames) {
	try {
		const bench = benchmark("createUsers", true);
		const usersData = await Promise.all([
			...userNames.map(async (name, index) => {
				return {
					username: name.slice(0, MAX_USERNAME_LENGTH),
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
		bench.stop("Create users");
		return users;
	} catch (error) {
		console.log("Create users failed", error);
	}
}

async function FetchCloudinaryAvatars() {
	try {
		const bench = benchmark("FetchCloudinaryAvatars", true);
		// get default avatar's data from cloudinary
		const cloudDefaultAvatars = await cloudinaryService.getFolderData("default_avatars");
		// get avatar folder size ( api limited to 30, so it can give back false total_size )
		const countAvatar = cloudDefaultAvatars.resources.length;
		bench.stop("Fetch cloudinary avatars");
		return { cloudDefaultAvatars, countAvatar };
	} catch (error) {
		console.log("Fetc cloudinary avatars failed", error);
	}
}

async function craeteProfiles({ users, paragraphs, avatars }) {
	const { cloudDefaultAvatars, countAvatar } = avatars;
	try {
		const bench = benchmark("craeteProfiles", true);
		const profiles = await prisma.profiles.createManyAndReturn({
			data: users.map((user, index) => {
				const randomNumber = rand(0, countAvatar - 1);
				const userId = user.id;
				const avatarUrl = cloudDefaultAvatars.resources[randomNumber].secure_url;
				const introduction = paragraphs[rand(0, paragraphs.length - 1)].slice(0, MAX_COMMENT_LENGTH);

				return {
					userId,
					avatarUrl,
					introduction,
				};
			}),
		});
		bench.stop("Create profiles");
		return profiles;
	} catch (error) {
		console.log("Create profiles failed", error);
	}
}

async function createTags({ words }) {
	try {
		const bench = benchmark("createTags", true);
		const tags = await prisma.tags.createManyAndReturn({
			data: Array.from({ length: 100 }).map(() => {
				return { name: randWords(words, 1, 2).slice(0, MAX_TAG_LENGTH), created: randCreation(1000) };
			}),
			skipDuplicates: true,
		});
		bench.stop("Create tags");
		return tags;
	} catch (error) {
		console.log("Craete tags failed", error);
	}
}

async function createPosts({ users, tags, paragraphs, words }) {
	try {
		const bench = benchmark("createPosts", true);
		const posts = await Promise.all(
			users.map(
				async (user, index) =>
					await Promise.all(
						Array.from({ length: rand(0, MAX_POSTS) }).map(
							async (item) =>
								await prisma.posts.create({
									data: {
										title: randWords(words, 3, 8).slice(0, MAX_TITLE_LENGTH),
										content: paragraphs[rand(0, paragraphs.length - 1)].slice(0, MAX_POST_LENGTH),
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
															content: randWords(words, 2, 20).slice(0, MAX_COMMENT_LENGTH),
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
		bench.stop("Create posts");
		return posts;
	} catch (error) {
		console.log("Create posts failed", error);
	}
}

async function getAllComments(posts) {
	try {
		const bench = benchmark("getAllComments", true);
		const comments = [];
		posts.forEach((userPosts) =>
			userPosts.forEach((post) =>
				post.comments.forEach((comment) => {
					comments.push(comment);
				})
			)
		);

		bench.stop("Get all comments");
		return comments;
	} catch (error) {
		console.log("Get all comments failed", error);
	}
}

async function createCommentVotes(comments, users) {
	try {
		const bench = benchmark("createCommentVotes", true);
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
		bench.stop("Create comment votes");
		return;
	} catch (error) {
		console.log("Create comment votes failed", error);
	}
}
