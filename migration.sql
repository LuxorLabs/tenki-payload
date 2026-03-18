-- Migration 1: 20250929_111647 - Initial schema setup
-- Create base tables for users, media, and payload system tables

CREATE TABLE IF NOT EXISTS `users_sessions` (
	`_order` integer NOT NULL,
	`_parent_id` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`created_at` text,
	`expires_at` text NOT NULL,
	FOREIGN KEY (`_parent_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `users_sessions_order_idx` ON `users_sessions` (`_order`);
CREATE INDEX IF NOT EXISTS `users_sessions_parent_id_idx` ON `users_sessions` (`_parent_id`);

CREATE TABLE IF NOT EXISTS `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`email` text NOT NULL,
	`reset_password_token` text,
	`reset_password_expiration` text,
	`salt` text,
	`hash` text,
	`login_attempts` numeric DEFAULT 0,
	`lock_until` text
);

CREATE INDEX IF NOT EXISTS `users_updated_at_idx` ON `users` (`updated_at`);
CREATE INDEX IF NOT EXISTS `users_created_at_idx` ON `users` (`created_at`);
CREATE UNIQUE INDEX IF NOT EXISTS `users_email_idx` ON `users` (`email`);

CREATE TABLE IF NOT EXISTS `media` (
	`id` integer PRIMARY KEY NOT NULL,
	`alt` text NOT NULL,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`url` text,
	`thumbnail_u_r_l` text,
	`filename` text,
	`mime_type` text,
	`filesize` numeric,
	`width` numeric,
	`height` numeric
);

CREATE INDEX IF NOT EXISTS `media_updated_at_idx` ON `media` (`updated_at`);
CREATE INDEX IF NOT EXISTS `media_created_at_idx` ON `media` (`created_at`);
CREATE UNIQUE INDEX IF NOT EXISTS `media_filename_idx` ON `media` (`filename`);

CREATE TABLE IF NOT EXISTS `payload_locked_documents` (
	`id` integer PRIMARY KEY NOT NULL,
	`global_slug` text,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE INDEX IF NOT EXISTS `payload_locked_documents_global_slug_idx` ON `payload_locked_documents` (`global_slug`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_updated_at_idx` ON `payload_locked_documents` (`updated_at`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_created_at_idx` ON `payload_locked_documents` (`created_at`);

CREATE TABLE IF NOT EXISTS `payload_locked_documents_rels` (
	`id` integer PRIMARY KEY NOT NULL,
	`order` integer,
	`parent_id` integer NOT NULL,
	`path` text NOT NULL,
	`users_id` integer,
	`media_id` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `payload_locked_documents`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`media_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_order_idx` ON `payload_locked_documents_rels` (`order`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_parent_idx` ON `payload_locked_documents_rels` (`parent_id`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_path_idx` ON `payload_locked_documents_rels` (`path`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_users_id_idx` ON `payload_locked_documents_rels` (`users_id`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_media_id_idx` ON `payload_locked_documents_rels` (`media_id`);

CREATE TABLE IF NOT EXISTS `payload_preferences` (
	`id` integer PRIMARY KEY NOT NULL,
	`key` text,
	`value` text,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE INDEX IF NOT EXISTS `payload_preferences_key_idx` ON `payload_preferences` (`key`);
CREATE INDEX IF NOT EXISTS `payload_preferences_updated_at_idx` ON `payload_preferences` (`updated_at`);
CREATE INDEX IF NOT EXISTS `payload_preferences_created_at_idx` ON `payload_preferences` (`created_at`);

CREATE TABLE IF NOT EXISTS `payload_preferences_rels` (
	`id` integer PRIMARY KEY NOT NULL,
	`order` integer,
	`parent_id` integer NOT NULL,
	`path` text NOT NULL,
	`users_id` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `payload_preferences`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`users_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `payload_preferences_rels_order_idx` ON `payload_preferences_rels` (`order`);
CREATE INDEX IF NOT EXISTS `payload_preferences_rels_parent_idx` ON `payload_preferences_rels` (`parent_id`);
CREATE INDEX IF NOT EXISTS `payload_preferences_rels_path_idx` ON `payload_preferences_rels` (`path`);
CREATE INDEX IF NOT EXISTS `payload_preferences_rels_users_id_idx` ON `payload_preferences_rels` (`users_id`);

CREATE TABLE IF NOT EXISTS `payload_migrations` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`batch` numeric,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE INDEX IF NOT EXISTS `payload_migrations_updated_at_idx` ON `payload_migrations` (`updated_at`);
CREATE INDEX IF NOT EXISTS `payload_migrations_created_at_idx` ON `payload_migrations` (`created_at`);

-- Migration 2: 20251119_080727 - Add blog collections (Authors, Categories, Tags, Posts)
-- Create blog-related tables

CREATE TABLE IF NOT EXISTS `authors` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`bio` text,
	`avatar_id` integer,
	`role` text DEFAULT 'marketing',
	`social_links_twitter` text,
	`social_links_linkedin` text,
	`social_links_github` text,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	FOREIGN KEY (`avatar_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE UNIQUE INDEX IF NOT EXISTS `authors_email_idx` ON `authors` (`email`);
CREATE INDEX IF NOT EXISTS `authors_avatar_idx` ON `authors` (`avatar_id`);
CREATE INDEX IF NOT EXISTS `authors_updated_at_idx` ON `authors` (`updated_at`);
CREATE INDEX IF NOT EXISTS `authors_created_at_idx` ON `authors` (`created_at`);

CREATE TABLE IF NOT EXISTS `categories` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text,
	`color` text,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `categories_slug_idx` ON `categories` (`slug`);
CREATE INDEX IF NOT EXISTS `categories_updated_at_idx` ON `categories` (`updated_at`);
CREATE INDEX IF NOT EXISTS `categories_created_at_idx` ON `categories` (`created_at`);

CREATE TABLE IF NOT EXISTS `tags` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `tags_slug_idx` ON `tags` (`slug`);
CREATE INDEX IF NOT EXISTS `tags_updated_at_idx` ON `tags` (`updated_at`);
CREATE INDEX IF NOT EXISTS `tags_created_at_idx` ON `tags` (`created_at`);

CREATE TABLE IF NOT EXISTS `posts_seo_keywords` (
	`_order` integer NOT NULL,
	`_parent_id` integer NOT NULL,
	`id` text PRIMARY KEY NOT NULL,
	`keyword` text,
	FOREIGN KEY (`_parent_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `posts_seo_keywords_order_idx` ON `posts_seo_keywords` (`_order`);
CREATE INDEX IF NOT EXISTS `posts_seo_keywords_parent_id_idx` ON `posts_seo_keywords` (`_parent_id`);

CREATE TABLE IF NOT EXISTS `posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`slug` text,
	`excerpt` text,
	`content` text,
	`featured_image_id` integer,
	`author_id` integer,
	`category_id` integer,
	`status` text DEFAULT 'draft',
	`published_at` text,
	`reading_time` numeric,
	`seo_meta_title` text,
	`seo_meta_description` text,
	`seo_og_image_id` integer,
	`seo_canonical_u_r_l` text,
	`seo_no_index` integer DEFAULT false,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`_status` text DEFAULT 'draft',
	FOREIGN KEY (`featured_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`author_id`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`seo_og_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE UNIQUE INDEX IF NOT EXISTS `posts_slug_idx` ON `posts` (`slug`);
CREATE INDEX IF NOT EXISTS `posts_featured_image_idx` ON `posts` (`featured_image_id`);
CREATE INDEX IF NOT EXISTS `posts_author_idx` ON `posts` (`author_id`);
CREATE INDEX IF NOT EXISTS `posts_category_idx` ON `posts` (`category_id`);
CREATE INDEX IF NOT EXISTS `posts_seo_seo_og_image_idx` ON `posts` (`seo_og_image_id`);
CREATE INDEX IF NOT EXISTS `posts_updated_at_idx` ON `posts` (`updated_at`);
CREATE INDEX IF NOT EXISTS `posts_created_at_idx` ON `posts` (`created_at`);
CREATE INDEX IF NOT EXISTS `posts__status_idx` ON `posts` (`_status`);

CREATE TABLE IF NOT EXISTS `posts_rels` (
	`id` integer PRIMARY KEY NOT NULL,
	`order` integer,
	`parent_id` integer NOT NULL,
	`path` text NOT NULL,
	`tags_id` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tags_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `posts_rels_order_idx` ON `posts_rels` (`order`);
CREATE INDEX IF NOT EXISTS `posts_rels_parent_idx` ON `posts_rels` (`parent_id`);
CREATE INDEX IF NOT EXISTS `posts_rels_path_idx` ON `posts_rels` (`path`);
CREATE INDEX IF NOT EXISTS `posts_rels_tags_id_idx` ON `posts_rels` (`tags_id`);

CREATE TABLE IF NOT EXISTS `_posts_v_version_seo_keywords` (
	`_order` integer NOT NULL,
	`_parent_id` integer NOT NULL,
	`id` integer PRIMARY KEY NOT NULL,
	`keyword` text,
	`_uuid` text,
	FOREIGN KEY (`_parent_id`) REFERENCES `_posts_v`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `_posts_v_version_seo_keywords_order_idx` ON `_posts_v_version_seo_keywords` (`_order`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_seo_keywords_parent_id_idx` ON `_posts_v_version_seo_keywords` (`_parent_id`);

CREATE TABLE IF NOT EXISTS `_posts_v` (
	`id` integer PRIMARY KEY NOT NULL,
	`parent_id` integer,
	`version_title` text,
	`version_slug` text,
	`version_excerpt` text,
	`version_content` text,
	`version_featured_image_id` integer,
	`version_author_id` integer,
	`version_category_id` integer,
	`version_status` text DEFAULT 'draft',
	`version_published_at` text,
	`version_reading_time` numeric,
	`version_seo_meta_title` text,
	`version_seo_meta_description` text,
	`version_seo_og_image_id` integer,
	`version_seo_canonical_u_r_l` text,
	`version_seo_no_index` integer DEFAULT false,
	`version_updated_at` text,
	`version_created_at` text,
	`version__status` text DEFAULT 'draft',
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`updated_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
	`latest` integer,
	`autosave` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`version_featured_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`version_author_id`) REFERENCES `authors`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`version_category_id`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`version_seo_og_image_id`) REFERENCES `media`(`id`) ON UPDATE no action ON DELETE set null
);

CREATE INDEX IF NOT EXISTS `_posts_v_parent_idx` ON `_posts_v` (`parent_id`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_version_slug_idx` ON `_posts_v` (`version_slug`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_version_featured_image_idx` ON `_posts_v` (`version_featured_image_id`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_version_author_idx` ON `_posts_v` (`version_author_id`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_version_category_idx` ON `_posts_v` (`version_category_id`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_seo_version_seo_og_image_idx` ON `_posts_v` (`version_seo_og_image_id`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_version_updated_at_idx` ON `_posts_v` (`version_updated_at`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_version_created_at_idx` ON `_posts_v` (`version_created_at`);
CREATE INDEX IF NOT EXISTS `_posts_v_version_version__status_idx` ON `_posts_v` (`version__status`);
CREATE INDEX IF NOT EXISTS `_posts_v_created_at_idx` ON `_posts_v` (`created_at`);
CREATE INDEX IF NOT EXISTS `_posts_v_updated_at_idx` ON `_posts_v` (`updated_at`);
CREATE INDEX IF NOT EXISTS `_posts_v_latest_idx` ON `_posts_v` (`latest`);
CREATE INDEX IF NOT EXISTS `_posts_v_autosave_idx` ON `_posts_v` (`autosave`);

CREATE TABLE IF NOT EXISTS `_posts_v_rels` (
	`id` integer PRIMARY KEY NOT NULL,
	`order` integer,
	`parent_id` integer NOT NULL,
	`path` text NOT NULL,
	`tags_id` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `_posts_v`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tags_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE INDEX IF NOT EXISTS `_posts_v_rels_order_idx` ON `_posts_v_rels` (`order`);
CREATE INDEX IF NOT EXISTS `_posts_v_rels_parent_idx` ON `_posts_v_rels` (`parent_id`);
CREATE INDEX IF NOT EXISTS `_posts_v_rels_path_idx` ON `_posts_v_rels` (`path`);
CREATE INDEX IF NOT EXISTS `_posts_v_rels_tags_id_idx` ON `_posts_v_rels` (`tags_id`);

CREATE TABLE IF NOT EXISTS `payload_kv` (
	`id` integer PRIMARY KEY NOT NULL,
	`key` text NOT NULL,
	`data` text NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS `payload_kv_key_idx` ON `payload_kv` (`key`);

-- Add columns to existing tables (using ALTER TABLE ADD COLUMN which is safe if column already exists)
ALTER TABLE `users` ADD COLUMN `name` text;
ALTER TABLE `users` ADD COLUMN `role` text DEFAULT 'viewer';

ALTER TABLE `media` ADD COLUMN `caption` text;
ALTER TABLE `media` ADD COLUMN `credit` text;
ALTER TABLE `media` ADD COLUMN `focal_x` numeric;
ALTER TABLE `media` ADD COLUMN `focal_y` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_thumbnail_url` text;
ALTER TABLE `media` ADD COLUMN `sizes_thumbnail_width` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_thumbnail_height` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_thumbnail_mime_type` text;
ALTER TABLE `media` ADD COLUMN `sizes_thumbnail_filesize` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_thumbnail_filename` text;
ALTER TABLE `media` ADD COLUMN `sizes_card_url` text;
ALTER TABLE `media` ADD COLUMN `sizes_card_width` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_card_height` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_card_mime_type` text;
ALTER TABLE `media` ADD COLUMN `sizes_card_filesize` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_card_filename` text;
ALTER TABLE `media` ADD COLUMN `sizes_featured_url` text;
ALTER TABLE `media` ADD COLUMN `sizes_featured_width` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_featured_height` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_featured_mime_type` text;
ALTER TABLE `media` ADD COLUMN `sizes_featured_filesize` numeric;
ALTER TABLE `media` ADD COLUMN `sizes_featured_filename` text;

CREATE INDEX IF NOT EXISTS `media_sizes_thumbnail_sizes_thumbnail_filename_idx` ON `media` (`sizes_thumbnail_filename`);
CREATE INDEX IF NOT EXISTS `media_sizes_card_sizes_card_filename_idx` ON `media` (`sizes_card_filename`);
CREATE INDEX IF NOT EXISTS `media_sizes_featured_sizes_featured_filename_idx` ON `media` (`sizes_featured_filename`);

ALTER TABLE `payload_locked_documents_rels` ADD COLUMN `authors_id` integer REFERENCES authors(id);
ALTER TABLE `payload_locked_documents_rels` ADD COLUMN `categories_id` integer REFERENCES categories(id);
ALTER TABLE `payload_locked_documents_rels` ADD COLUMN `tags_id` integer REFERENCES tags(id);
ALTER TABLE `payload_locked_documents_rels` ADD COLUMN `posts_id` integer REFERENCES posts(id);

CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_authors_id_idx` ON `payload_locked_documents_rels` (`authors_id`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_categories_id_idx` ON `payload_locked_documents_rels` (`categories_id`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_tags_id_idx` ON `payload_locked_documents_rels` (`tags_id`);
CREATE INDEX IF NOT EXISTS `payload_locked_documents_rels_posts_id_idx` ON `payload_locked_documents_rels` (`posts_id`);

-- Migration 4: Add source_url to media
ALTER TABLE `media` ADD COLUMN `source_url` text;

-- Migration 3: 20251120_135256 - Add API key support to users
ALTER TABLE `users` ADD COLUMN `enable_a_p_i_key` integer;
ALTER TABLE `users` ADD COLUMN `api_key` text;
ALTER TABLE `users` ADD COLUMN `api_key_index` text;
