// Generated by Wrangler on Thu Apr 11 2024 23:55:38 GMT+0900 (日本標準時)
// by running `wrangler types`

interface Env {
	SESSION_KV: KVNamespace;
	GITHUB_CLIENT_ID: string;
	GITHUB_CLIENT_SECRET: string;
	CALLBACK_URL: string;
	SESSION_SECRET: string;
	BUCKET: R2Bucket;
	DB: D1Database;
}
