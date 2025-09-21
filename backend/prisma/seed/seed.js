import prisma from "../../src/models/prisma-client.js";
import fs from "node:fs/promises";
import benchmark from "../../src/utils/benchmark.js";
import bcrypt from "bcrypt";

import cloudinaryService from "../../src/services/cloudinary.service.js";
import { PermissionActions, PermissionSubjects, PermissionTarget } from "../../generated/prisma/index.js";

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

const { userNames, getRandParagraph, getRandomWords } = await readDataFromFiles();

async function main() {
    const mainBench = benchmark("Seed", true);

    const avatars = FetchCloudinaryAvatars();
    // const roles = permissions.then((permissions) => createRoles(permissions));

    await clearTables();

    const permissions = await createPermissions();
    const roles = await createRoles(permissions);

    const users = await createUsers(userNames, roles);
    const profiles = avatars.then((avatars) => craeteProfiles(users, avatars));
    const tags = await createTags();
    const posts = await createPosts(users, tags);
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

        const userNames = Array.from({ length: MAX_USER }).map(() => names[rand(0, names.length)]);
        const paragraphs = await readFile("paragraphs");
        const words = await readFile("words");

        const getRandParagraph = (maxLength) => paragraphs[rand(0, paragraphs.length)].slice(0, maxLength);
        const getRandomWords = (min = 0, max = 1) =>
            Array.from({ length: rand(min, max) }).reduce(
                (selectedWords, _, index) => selectedWords + (index > 0 ? " " : "") + words[rand(0, words.length)],
                ""
            );

        bench.stop();
        return { userNames, getRandParagraph, getRandomWords };
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
        bench.stop();
    } catch (error) {
        console.log("Clear tables failed!", error);
    }
}

async function createUsers(userNames, roles) {
    try {
        const bench = benchmark("createUsers", true);

        const usersData = await Promise.all([
            ...userNames.map(async (name, index) => {
                return {
                    username: name.slice(0, MAX_USERNAME_LENGTH),
                    email: `${name + index}@email.com`,
                    password: await bcrypt.hash("1111111111", 1),
                    created: randCreation(1000),
                    role: roles[rand(0, roles.length)].name,
                };
            }),
        ]);

        const users = await prisma.users.createManyAndReturn({
            data: usersData,
            skipDuplicates: true,
        });

        bench.stop();
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
        bench.stop();
        return { cloudDefaultAvatars, countAvatar };
    } catch (error) {
        console.log("Fetc cloudinary avatars failed", error);
    }
}

async function craeteProfiles(users, avatars) {
    const { cloudDefaultAvatars, countAvatar } = avatars;

    const getRandomAvatar = () => cloudDefaultAvatars.resources[rand(0, countAvatar)].secure_url;
    try {
        const bench = benchmark("craeteProfiles", true);
        const profiles = await prisma.profiles.createManyAndReturn({
            data: users.map((user) => {
                const userId = user.id;
                const avatarUrl = getRandomAvatar();
                const introduction = getRandParagraph(MAX_COMMENT_LENGTH);

                return {
                    userId,
                    avatarUrl,
                    introduction,
                };
            }),
        });
        bench.stop();
        return profiles;
    } catch (error) {
        console.log("Create profiles failed", error);
    }
}

async function createTags() {
    const getRandomTagName = () => getRandomWords(1, 2).slice(0, MAX_TAG_LENGTH);
    try {
        const bench = benchmark("createTags", true);
        const tags = await prisma.tags.createManyAndReturn({
            data: Array.from({ length: 100 }).map(() => {
                return { name: getRandomTagName(), created: randCreation(1000) };
            }),
            skipDuplicates: true,
        });
        bench.stop();
        return tags;
    } catch (error) {
        console.log("Craete tags failed", error);
    }
}

async function createPosts(users, tags) {
    const randTitle = () => getRandomWords(3, 8).slice(0, MAX_TITLE_LENGTH);
    const randCommentContent = () => getRandomWords(2, 20).slice(0, MAX_COMMENT_LENGTH);
    try {
        const bench = benchmark("createPosts", true);
        const posts = await Promise.all(
            users.map(
                async (user, index) =>
                    await Promise.all(
                        Array.from({ length: rand(0, MAX_POSTS) }).map((item) => {
                            return prisma.posts.create({
                                data: {
                                    title: randTitle(),
                                    content: getRandParagraph(MAX_POST_LENGTH),
                                    created: randCreation(index),
                                    userId: user.id,
                                    tags: {
                                        createMany: {
                                            data: [
                                                ...Array.from({ length: rand(1, 5) }).map(() => {
                                                    return {
                                                        tagName: tags[rand(0, tags.length)].name,
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
                                                        userId: users[rand(0, users.length)].id,
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
                                                        content: randCommentContent(),
                                                        userId: users[rand(0, users.length)].id,
                                                    };
                                                }),
                                            ],
                                            skipDuplicates: true,
                                        },
                                    },
                                },
                                include: { tags: true, votes: true, comments: true },
                            });
                        })
                    )
            )
        );
        bench.stop();
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

        bench.stop();
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
                                userId: users[rand(0, users.length)].id,
                                commentId: comment.id,
                            };
                        }),
                    ],
                    skipDuplicates: true,
                });
            })
        );
        bench.stop();
        return;
    } catch (error) {
        console.log("Create comment votes failed", error);
    }
}

async function createPermissions() {
    try {
        const bench = benchmark("createPermissions", true);
        const actions = Object.keys(PermissionActions);
        const subjects = Object.keys(PermissionSubjects);
        const data = [];
        subjects.forEach((subject) =>
            actions.forEach((action) => {
                data.push({
                    subject,
                    action,
                });
            })
        );
        const permissions = await prisma.permissions.createManyAndReturn({ data, skipDuplicates: true });

        bench.stop();
        return permissions;
    } catch (error) {
        errorMsg("Create permissions failed!", error);
    }
}

function errorMsg(msg, error) {
    console.log("***\nERROR :", msg, " \n***\n", error);
}

const ROLES = [
    {
        name: "admin",
        permissions: [
            { action: PermissionActions.CREATE, subject: PermissionSubjects.POSTS, target: PermissionTarget.ALL },
            { action: PermissionActions.READ, subject: PermissionSubjects.POSTS, target: PermissionTarget.ALL },
            { action: PermissionActions.UPDATE, subject: PermissionSubjects.POSTS, target: PermissionTarget.ALL },
            { action: PermissionActions.DELETE, subject: PermissionSubjects.POSTS, target: PermissionTarget.ALL },

            { action: PermissionActions.CREATE, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.ALL },
            { action: PermissionActions.READ, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.ALL },
            { action: PermissionActions.UPDATE, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.ALL },
            { action: PermissionActions.DELETE, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.ALL },

            { action: PermissionActions.CREATE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN },
            { action: PermissionActions.READ, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.ALL },
            { action: PermissionActions.UPDATE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN },
            { action: PermissionActions.DELETE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN },
        ],
    },
    {
        name: "user",
        permissions: [
            { action: PermissionActions.CREATE, subject: PermissionSubjects.POSTS, target: PermissionTarget.OWN },
            { action: PermissionActions.READ, subject: PermissionSubjects.POSTS, target: PermissionTarget.ALL },
            { action: PermissionActions.UPDATE, subject: PermissionSubjects.POSTS, target: PermissionTarget.OWN },
            { action: PermissionActions.DELETE, subject: PermissionSubjects.POSTS, target: PermissionTarget.OWN },

            { action: PermissionActions.CREATE, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.OWN },
            { action: PermissionActions.READ, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.ALL },
            { action: PermissionActions.UPDATE, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.OWN },
            { action: PermissionActions.DELETE, subject: PermissionSubjects.COMMENTS, target: PermissionTarget.OWN },

            { action: PermissionActions.CREATE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN },
            { action: PermissionActions.READ, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.ALL },
            { action: PermissionActions.UPDATE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN },
            { action: PermissionActions.DELETE, subject: PermissionSubjects.SETTINGS, target: PermissionTarget.OWN },
        ],
    },
    // moderator: {},
    // user: {},
];
async function createRoles() {
    try {
        const bench = benchmark("createRoles", true);
        const roles = await Promise.all(
            ROLES.map(
                async (role) =>
                    await prisma.roles.create({
                        data: { name: role.name, permissions: { createMany: { data: role.permissions } } },
                    })
            )
        );
        bench.stop();
        return roles;
    } catch (error) {
        errorMsg("Create roles failed", error);
    }
}
