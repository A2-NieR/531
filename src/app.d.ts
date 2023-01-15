// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Error {}
	interface Locals {
		pb: import('pocketbase').default;
		user: import('pocketbase').Record | import('pocketbase').Admin | null;
		weightRecordId: string;
	}
	// interface PageData {}
	// interface Platform {}
}
