// export const serializeNonPOJOS = (obj: unknown) => structuredClone(obj);

type Weights = {
	deadlift: number;
	squat: number;
	benchpress: number;
	overheadpress: number;
};

type Set = {
	reps: number;
	weight: number;
};

type Workout = {
	mainLiftOne: {
		lift: string;
		firstSet: Set;
		secondSet: Set;
		thirdSet: Set;
		lastSet: Set;
	};
	mainLiftTwo: {
		lift: string;
		firstSet: Set;
		secondSet: Set;
		thirdSet: Set;
		lastSet: Set;
	};
};

export const displayTimer = (time: number): string => {
	const minutes = Math.floor(time / 60).toString();
	const seconds = time % 60 === 0 ? '00' : (time % 60).toString();

	return `${minutes}:${seconds}`;
};

export const calculateWeights = (cycle: number, day: number, weights: Weights): Workout => {
	if (cycle === 3 && day === 3) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Benchpress',
				firstSet: { reps: 5, weight: weights.benchpress * 0.75 },
				secondSet: { reps: 3, weight: weights.benchpress * 0.85 },
				thirdSet: { reps: 1, weight: weights.benchpress * 0.95 },
				lastSet: { reps: 5, weight: weights.benchpress * 0.75 }
			},
			mainLiftTwo: {
				lift: 'Squats',
				firstSet: { reps: 5, weight: weights.squat * 0.75 },
				secondSet: { reps: 3, weight: weights.squat * 0.85 },
				thirdSet: { reps: 1, weight: weights.squat * 0.95 },
				lastSet: { reps: 5, weight: weights.squat * 0.75 }
			}
		};
		return workout;
	} else if (cycle === 3 && day === 2) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Deadlifts',
				firstSet: { reps: 5, weight: weights.deadlift * 0.75 },
				secondSet: { reps: 3, weight: weights.deadlift * 0.85 },
				thirdSet: { reps: 1, weight: weights.deadlift * 0.95 },
				lastSet: { reps: 5, weight: weights.deadlift * 0.75 }
			},
			mainLiftTwo: {
				lift: 'Overheadpress',
				firstSet: { reps: 5, weight: weights.overheadpress * 0.75 },
				secondSet: { reps: 3, weight: weights.overheadpress * 0.85 },
				thirdSet: { reps: 1, weight: weights.overheadpress * 0.95 },
				lastSet: { reps: 5, weight: weights.overheadpress * 0.75 }
			}
		};
		return workout;
	} else if (cycle === 3 && day === 1) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Squats',
				firstSet: { reps: 5, weight: weights.squat * 0.75 },
				secondSet: { reps: 3, weight: weights.squat * 0.85 },
				thirdSet: { reps: 1, weight: weights.squat * 0.95 },
				lastSet: { reps: 5, weight: weights.squat * 0.75 }
			},
			mainLiftTwo: {
				lift: 'Benchpress',
				firstSet: { reps: 5, weight: weights.benchpress * 0.75 },
				secondSet: { reps: 3, weight: weights.benchpress * 0.85 },
				thirdSet: { reps: 1, weight: weights.benchpress * 0.95 },
				lastSet: { reps: 5, weight: weights.benchpress * 0.75 }
			}
		};
		return workout;
	} else if (cycle === 2 && day === 3) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Benchpress',
				firstSet: { reps: 3, weight: weights.benchpress * 0.7 },
				secondSet: { reps: 3, weight: weights.benchpress * 0.8 },
				thirdSet: { reps: 3, weight: weights.benchpress * 0.9 },
				lastSet: { reps: 5, weight: weights.benchpress * 0.7 }
			},
			mainLiftTwo: {
				lift: 'Squats',
				firstSet: { reps: 3, weight: weights.squat * 0.7 },
				secondSet: { reps: 3, weight: weights.squat * 0.8 },
				thirdSet: { reps: 3, weight: weights.squat * 0.9 },
				lastSet: { reps: 5, weight: weights.squat * 0.7 }
			}
		};
		return workout;
	} else if (cycle === 2 && day === 2) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Deadlifts',
				firstSet: { reps: 3, weight: weights.deadlift * 0.7 },
				secondSet: { reps: 3, weight: weights.deadlift * 0.8 },
				thirdSet: { reps: 3, weight: weights.deadlift * 0.9 },
				lastSet: { reps: 5, weight: weights.deadlift * 0.7 }
			},
			mainLiftTwo: {
				lift: 'Overheadpress',
				firstSet: { reps: 3, weight: weights.overheadpress * 0.7 },
				secondSet: { reps: 3, weight: weights.overheadpress * 0.8 },
				thirdSet: { reps: 3, weight: weights.overheadpress * 0.9 },
				lastSet: { reps: 5, weight: weights.overheadpress * 0.7 }
			}
		};
		return workout;
	} else if (cycle === 2 && day === 1) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Squats',
				firstSet: { reps: 3, weight: weights.squat * 0.7 },
				secondSet: { reps: 3, weight: weights.squat * 0.8 },
				thirdSet: { reps: 3, weight: weights.squat * 0.9 },
				lastSet: { reps: 5, weight: weights.squat * 0.7 }
			},
			mainLiftTwo: {
				lift: 'Benchpress',
				firstSet: { reps: 3, weight: weights.benchpress * 0.7 },
				secondSet: { reps: 3, weight: weights.benchpress * 0.8 },
				thirdSet: { reps: 3, weight: weights.benchpress * 0.9 },
				lastSet: { reps: 5, weight: weights.benchpress * 0.7 }
			}
		};
		return workout;
	} else if (cycle === 1 && day === 3) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Benchpress',
				firstSet: { reps: 5, weight: weights.benchpress * 0.65 },
				secondSet: { reps: 5, weight: weights.benchpress * 0.75 },
				thirdSet: { reps: 5, weight: weights.benchpress * 0.85 },
				lastSet: { reps: 5, weight: weights.benchpress * 0.65 }
			},
			mainLiftTwo: {
				lift: 'Squats',
				firstSet: { reps: 5, weight: weights.squat * 0.65 },
				secondSet: { reps: 5, weight: weights.squat * 0.75 },
				thirdSet: { reps: 5, weight: weights.squat * 0.85 },
				lastSet: { reps: 5, weight: weights.squat * 0.65 }
			}
		};
		return workout;
	} else if (cycle === 1 && day === 2) {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Deadlifts',
				firstSet: { reps: 5, weight: weights.deadlift * 0.65 },
				secondSet: { reps: 5, weight: weights.deadlift * 0.75 },
				thirdSet: { reps: 5, weight: weights.deadlift * 0.85 },
				lastSet: { reps: 5, weight: weights.deadlift * 0.65 }
			},
			mainLiftTwo: {
				lift: 'Overheadpress',
				firstSet: { reps: 5, weight: weights.overheadpress * 0.65 },
				secondSet: { reps: 5, weight: weights.overheadpress * 0.75 },
				thirdSet: { reps: 5, weight: weights.overheadpress * 0.85 },
				lastSet: { reps: 5, weight: weights.overheadpress * 0.65 }
			}
		};
		return workout;
	} else {
		const workout: Workout = {
			mainLiftOne: {
				lift: 'Squats',
				firstSet: { reps: 5, weight: weights.squat * 0.65 },
				secondSet: { reps: 5, weight: weights.squat * 0.75 },
				thirdSet: { reps: 5, weight: weights.squat * 0.85 },
				lastSet: { reps: 5, weight: weights.squat * 0.65 }
			},
			mainLiftTwo: {
				lift: 'Benchpress',
				firstSet: { reps: 5, weight: weights.benchpress * 0.65 },
				secondSet: { reps: 5, weight: weights.benchpress * 0.75 },
				thirdSet: { reps: 5, weight: weights.benchpress * 0.85 },
				lastSet: { reps: 5, weight: weights.benchpress * 0.65 }
			}
		};
		return workout;
	}
};

export const increaseWeights = (currentWeights: Weights): Weights => {
	return {
		deadlift: (currentWeights.deadlift += 5),
		squat: (currentWeights.squat += 5),
		benchpress: (currentWeights.benchpress += 2.5),
		overheadpress: (currentWeights.overheadpress += 2.5)
	};
};
