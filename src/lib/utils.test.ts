import { describe, expect, it } from 'vitest';
import { calculateWeights, increaseWeights } from './utils';

const weights = {
	deadlift: 150,
	squat: 100,
	benchpress: 80,
	overheadpress: 50
};

describe('Workouts Week 1-3', () => {
	it('Week 1 - Cycle 1 - Day 1', () => {
		const weekOneCycleOneDayOne = calculateWeights(1, 1, weights);
		expect(weekOneCycleOneDayOne.mainLiftOne.thirdSet.reps).toBe(5);
		expect(weekOneCycleOneDayOne.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(weekOneCycleOneDayOne.mainLiftOne.firstSet.weight).toBe(100 * 0.65);
		expect(weekOneCycleOneDayOne.mainLiftTwo.thirdSet.weight).toBe(80 * 0.85);
	});
	it('Week 1 - Cycle 1 - Day 2', () => {
		const weekOneCycleOneDayTwo = calculateWeights(1, 2, weights);
		expect(weekOneCycleOneDayTwo.mainLiftOne.thirdSet.reps).toBe(5);
		expect(weekOneCycleOneDayTwo.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(weekOneCycleOneDayTwo.mainLiftOne.firstSet.weight).toBe(150 * 0.65);
		expect(weekOneCycleOneDayTwo.mainLiftTwo.thirdSet.weight).toBe(50 * 0.85);
	});
	it('Week 1 - Cycle 1 - Day 3', () => {
		const weekOneCycleOneDayThree = calculateWeights(1, 3, weights);
		expect(weekOneCycleOneDayThree.mainLiftOne.thirdSet.reps).toBe(5);
		expect(weekOneCycleOneDayThree.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(weekOneCycleOneDayThree.mainLiftOne.firstSet.weight).toBe(80 * 0.65);
		expect(weekOneCycleOneDayThree.mainLiftTwo.secondSet.weight).toBe(100 * 0.75);
	});
	it('Week 2 - Cycle 2 - Day 1', () => {
		const weekTwoCycleTwoDayOne = calculateWeights(2, 1, weights);
		expect(weekTwoCycleTwoDayOne.mainLiftOne.thirdSet.reps).toBe(3);
		expect(weekTwoCycleTwoDayOne.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(weekTwoCycleTwoDayOne.mainLiftOne.firstSet.weight).toBe(100 * 0.7);
		expect(weekTwoCycleTwoDayOne.mainLiftTwo.thirdSet.weight).toBe(80 * 0.9);
	});
	it('Week 2 - Cycle 2 - Day 2', () => {
		const weekTwoCycleTwoDayTwo = calculateWeights(2, 2, weights);
		expect(weekTwoCycleTwoDayTwo.mainLiftOne.thirdSet.reps).toBe(3);
		expect(weekTwoCycleTwoDayTwo.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(weekTwoCycleTwoDayTwo.mainLiftOne.firstSet.weight).toBe(150 * 0.7);
		expect(weekTwoCycleTwoDayTwo.mainLiftTwo.thirdSet.weight).toBe(50 * 0.9);
	});
	it('Week 2 - Cycle 2 - Day 3', () => {
		const weekTwoCycleTwoDayThree = calculateWeights(2, 3, weights);
		expect(weekTwoCycleTwoDayThree.mainLiftOne.thirdSet.reps).toBe(3);
		expect(weekTwoCycleTwoDayThree.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(weekTwoCycleTwoDayThree.mainLiftOne.firstSet.weight).toBe(80 * 0.7);
		expect(weekTwoCycleTwoDayThree.mainLiftTwo.secondSet.weight).toBe(100 * 0.8);
	});
	it('Week 3 - Cycle 3 - Day 1', () => {
		const weekThreeCycleThreeDayOne = calculateWeights(3, 1, weights);
		expect(weekThreeCycleThreeDayOne.mainLiftOne.thirdSet.reps).toBe(1);
		expect(weekThreeCycleThreeDayOne.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(weekThreeCycleThreeDayOne.mainLiftOne.firstSet.weight).toBe(100 * 0.75);
		expect(weekThreeCycleThreeDayOne.mainLiftTwo.thirdSet.weight).toBe(80 * 0.95);
	});
	it('Week 3 - Cycle 3 - Day 2', () => {
		const weekThreeCycleTwoDayTwo = calculateWeights(3, 2, weights);
		expect(weekThreeCycleTwoDayTwo.mainLiftOne.thirdSet.reps).toBe(1);
		expect(weekThreeCycleTwoDayTwo.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(weekThreeCycleTwoDayTwo.mainLiftOne.firstSet.weight).toBe(150 * 0.75);
		expect(weekThreeCycleTwoDayTwo.mainLiftTwo.thirdSet.weight).toBe(50 * 0.95);
	});
	it('Week 3 - Cycle 3 - Day 3', () => {
		const weekThreeCycleTwoDayThree = calculateWeights(3, 3, weights);
		expect(weekThreeCycleTwoDayThree.mainLiftOne.thirdSet.reps).toBe(1);
		expect(weekThreeCycleTwoDayThree.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(weekThreeCycleTwoDayThree.mainLiftOne.firstSet.weight).toBe(80 * 0.75);
		expect(weekThreeCycleTwoDayThree.mainLiftTwo.secondSet.weight).toBe(100 * 0.85);
	});
});

describe('Workouts Week 4-6', () => {
	const addedWeights = increaseWeights(weights);

	it('Week 4 - Cycle 1 - Day 1', () => {
		const weekFourCycleOneDayOne = calculateWeights(1, 1, addedWeights);
		expect(weekFourCycleOneDayOne.mainLiftOne.thirdSet.reps).toBe(5);
		expect(weekFourCycleOneDayOne.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(weekFourCycleOneDayOne.mainLiftOne.firstSet.weight).toBe((100 + 5) * 0.65);
		expect(weekFourCycleOneDayOne.mainLiftTwo.secondSet.weight).toBe((80 + 2.5) * 0.75);
	});
	it('Week 4 - Cycle 1 - Day 2', () => {
		const weekFourCycleOneDayTwo = calculateWeights(1, 2, addedWeights);
		expect(weekFourCycleOneDayTwo.mainLiftOne.thirdSet.reps).toBe(5);
		expect(weekFourCycleOneDayTwo.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(weekFourCycleOneDayTwo.mainLiftOne.firstSet.weight).toBe((150 + 5) * 0.65);
		expect(weekFourCycleOneDayTwo.mainLiftTwo.secondSet.weight).toBe((50 + 2.5) * 0.75);
	});
	it('Week 4 - Cycle 1 - Day 3', () => {
		const weekFourCycleOneDayThree = calculateWeights(1, 3, addedWeights);
		expect(weekFourCycleOneDayThree.mainLiftOne.thirdSet.reps).toBe(5);
		expect(weekFourCycleOneDayThree.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(weekFourCycleOneDayThree.mainLiftOne.firstSet.weight).toBe((80 + 2.5) * 0.65);
		expect(weekFourCycleOneDayThree.mainLiftTwo.secondSet.weight).toBe((100 + 5) * 0.75);
	});
	it('Week 5 - Cycle 2 - Day 1', () => {
		const weekFiveCycleTwoDayOne = calculateWeights(2, 1, addedWeights);
		expect(weekFiveCycleTwoDayOne.mainLiftOne.thirdSet.reps).toBe(3);
		expect(weekFiveCycleTwoDayOne.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(weekFiveCycleTwoDayOne.mainLiftOne.firstSet.weight).toBe((100 + 5) * 0.7);
		expect(weekFiveCycleTwoDayOne.mainLiftTwo.thirdSet.weight).toBe((80 + 2.5) * 0.9);
	});
	it('Week 5 - Cycle 2 - Day 2', () => {
		const weekFiveCycleTwoDayTwo = calculateWeights(2, 2, addedWeights);
		expect(weekFiveCycleTwoDayTwo.mainLiftOne.thirdSet.reps).toBe(3);
		expect(weekFiveCycleTwoDayTwo.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(weekFiveCycleTwoDayTwo.mainLiftOne.firstSet.weight).toBe((150 + 5) * 0.7);
		expect(weekFiveCycleTwoDayTwo.mainLiftTwo.thirdSet.weight).toBe((50 + 2.5) * 0.9);
	});
	it('Week 5 - Cycle 2 - Day 3', () => {
		const weekFiveCycleTwoDayThree = calculateWeights(2, 3, addedWeights);
		expect(weekFiveCycleTwoDayThree.mainLiftOne.thirdSet.reps).toBe(3);
		expect(weekFiveCycleTwoDayThree.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(weekFiveCycleTwoDayThree.mainLiftOne.firstSet.weight).toBe((80 + 2.5) * 0.7);
		expect(weekFiveCycleTwoDayThree.mainLiftTwo.secondSet.weight).toBe((100 + 5) * 0.8);
	});
	it('Week 6 - Cycle 3 - Day 1', () => {
		const weekSixCycleThreeDayOne = calculateWeights(3, 1, addedWeights);
		expect(weekSixCycleThreeDayOne.mainLiftOne.thirdSet.reps).toBe(1);
		expect(weekSixCycleThreeDayOne.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(weekSixCycleThreeDayOne.mainLiftOne.firstSet.weight).toBe((100 + 5) * 0.75);
		expect(weekSixCycleThreeDayOne.mainLiftTwo.thirdSet.weight).toBe((80 + 2.5) * 0.95);
	});
	it('Week 6 - Cycle 3 - Day 2', () => {
		const weekSixCycleTwoDayTwo = calculateWeights(3, 2, addedWeights);
		expect(weekSixCycleTwoDayTwo.mainLiftOne.thirdSet.reps).toBe(1);
		expect(weekSixCycleTwoDayTwo.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(weekSixCycleTwoDayTwo.mainLiftOne.firstSet.weight).toBe((150 + 5) * 0.75);
		expect(weekSixCycleTwoDayTwo.mainLiftTwo.thirdSet.weight).toBe((50 + 2.5) * 0.95);
	});
	it('Week 6 - Cycle 3 - Day 3', () => {
		const weekSixCycleTwoDayThree = calculateWeights(3, 3, addedWeights);
		expect(weekSixCycleTwoDayThree.mainLiftOne.thirdSet.reps).toBe(1);
		expect(weekSixCycleTwoDayThree.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(weekSixCycleTwoDayThree.mainLiftOne.firstSet.weight).toBe((80 + 2.5) * 0.75);
		expect(weekSixCycleTwoDayThree.mainLiftTwo.secondSet.weight).toBe((100 + 5) * 0.85);
	});
});

describe('Increase weights', () => {
	it('Add 2.5 & 5', () => {
		const addedWeights = increaseWeights(weights);
		expect(addedWeights.deadlift).toBe(155);
		expect(addedWeights.squat).toBe(105);
		expect(addedWeights.benchpress).toBe(82.5);
		expect(addedWeights.overheadpress).toBe(52.5);
	});
});
