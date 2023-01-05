type Weights = {
	deadlift: number;
	squat: number;
	benchpress: number;
	overheadpress: number;
};

export const displayTimer = (time: number): string => {
	const minutes = Math.floor(time / 60).toString();
	const seconds = time % 60 === 0 ? '00' : (time % 60).toString();

	return `${minutes}:${seconds}`;
};

export const calculateWeights = (week: number, day: number, weights: Weights) => {
	if (week % 3 === 0) {
		return;
	} else if (week % 2 === 0) {
		return;
	} else {
		return;
	}
};
