CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "userName" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "sessions" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "token" TEXT NOT NULL UNIQUE,
    "valid" BOOLEAN NOT NULL DEFAULT false, 
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "posts" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "linkId" INTEGER NOT NULL REFERENCES "linkInfo"("id"),
    "description" TEXT NOT NULL, 
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "deletedAt" TIMESTAMP DEFAULT null
);
CREATE TABLE "hashtags" (
    "id" SERIAL PRIMARY KEY,
    "hashtag" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "postsLikes" (
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER NOT NULL REFERENCES "users"("id"),
    "postId" INTEGER NOT NULL REFERENCES "posts"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE TABLE "postHashtag" (
    "id" SERIAL PRIMARY KEY,
    "postId" INTEGER NOT NULL REFERENCES "posts"("id"),
    "hashtagId" INTEGER NOT NULL REFERENCES "hashtags"("id"),
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "linkInfo" (
    "id" SERIAL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);