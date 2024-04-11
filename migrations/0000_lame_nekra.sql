CREATE TABLE `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`public` integer NOT NULL,
	`markdown` text NOT NULL,
	`html` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `posts_to_tags` (
	`post_id` integer NOT NULL,
	`tag_name` text NOT NULL,
	PRIMARY KEY(`post_id`, `tag_name`),
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);
