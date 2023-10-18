CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`markdown` text NOT NULL,
	`html` text NOT NULL,
	`public` integer
);
