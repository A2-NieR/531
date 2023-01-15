import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (locals.user) {
		const weightList = await locals.pb.collection('weights').getList(1);

		return {
			user: locals.user,
			weightRecordId: weightList.items[0].id
		};
	}
	return { user: undefined, weightRecordId: undefined };
};
