// Generated by Wrangler on Fri Mar 08 2024 16:07:38 GMT+0900 (日本標準時)
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
