import { describe, expect, it } from 'vitest';
import { calculateWeights, increaseWeights } from './utils';

const weights = {
	deadlift: 150,
	squat: 100,
	benchpress: 80,
	overheadpress: 50
};

describe('Calculate cycle 1-3', () => {
	it('Cycle 1 / Day 1', () => {
		const cycleOneDayOne = calculateWeights(1, 1, weights);
		expect(cycleOneDayOne.mainLiftOne.thirdSet.reps).toBe(5);
		expect(cycleOneDayOne.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(cycleOneDayOne.mainLiftOne.firstSet.weight).toBe(100 * 0.65);
		expect(cycleOneDayOne.mainLiftTwo.thirdSet.weight).toBe(80 * 0.85);
	});
	it('Cycle 1 / Day 2', () => {
		const cycleOneDayTwo = calculateWeights(1, 2, weights);
		expect(cycleOneDayTwo.mainLiftOne.thirdSet.reps).toBe(5);
		expect(cycleOneDayTwo.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(cycleOneDayTwo.mainLiftOne.firstSet.weight).toBe(150 * 0.65);
		expect(cycleOneDayTwo.mainLiftTwo.thirdSet.weight).toBe(50 * 0.85);
	});
	it('Cycle 1 / Day 3', () => {
		const cycleOneDayThree = calculateWeights(1, 3, weights);
		expect(cycleOneDayThree.mainLiftOne.thirdSet.reps).toBe(5);
		expect(cycleOneDayThree.mainLiftTwo.thirdSet.reps).toBe(5);
		expect(cycleOneDayThree.mainLiftOne.firstSet.weight).toBe(80 * 0.65);
		expect(cycleOneDayThree.mainLiftTwo.secondSet.weight).toBe(100 * 0.75);
	});
	it('Cycle 2 / Day 1', () => {
		const cycleTwoDayOne = calculateWeights(2, 1, weights);
		expect(cycleTwoDayOne.mainLiftOne.thirdSet.reps).toBe(3);
		expect(cycleTwoDayOne.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(cycleTwoDayOne.mainLiftOne.firstSet.weight).toBe(100 * 0.7);
		expect(cycleTwoDayOne.mainLiftTwo.thirdSet.weight).toBe(80 * 0.9);
	});
	it('Cycle 2 / Day 2', () => {
		const cycleTwoDayTwo = calculateWeights(2, 2, weights);
		expect(cycleTwoDayTwo.mainLiftOne.thirdSet.reps).toBe(3);
		expect(cycleTwoDayTwo.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(cycleTwoDayTwo.mainLiftOne.firstSet.weight).toBe(150 * 0.7);
		expect(cycleTwoDayTwo.mainLiftTwo.thirdSet.weight).toBe(50 * 0.9);
	});
	it('Cycle 2 / Day 3', () => {
		const cycleTwoDayThree = calculateWeights(2, 3, weights);
		expect(cycleTwoDayThree.mainLiftOne.thirdSet.reps).toBe(3);
		expect(cycleTwoDayThree.mainLiftTwo.thirdSet.reps).toBe(3);
		expect(cycleTwoDayThree.mainLiftOne.firstSet.weight).toBe(80 * 0.7);
		expect(cycleTwoDayThree.mainLiftTwo.secondSet.weight).toBe(100 * 0.8);
	});
	it('Cycle 3 / Day 1', () => {
		const cycleThreeDayOne = calculateWeights(3, 1, weights);
		expect(cycleThreeDayOne.mainLiftOne.thirdSet.reps).toBe(1);
		expect(cycleThreeDayOne.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(cycleThreeDayOne.mainLiftOne.firstSet.weight).toBe(100 * 0.75);
		expect(cycleThreeDayOne.mainLiftTwo.thirdSet.weight).toBe(80 * 0.95);
	});
	it('Cycle 3 / Day 2', () => {
		const cycleTwoDayTwo = calculateWeights(3, 2, weights);
		expect(cycleTwoDayTwo.mainLiftOne.thirdSet.reps).toBe(1);
		expect(cycleTwoDayTwo.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(cycleTwoDayTwo.mainLiftOne.firstSet.weight).toBe(150 * 0.75);
		expect(cycleTwoDayTwo.mainLiftTwo.thirdSet.weight).toBe(50 * 0.95);
	});
	it('Cycle 3 / Day 3', () => {
		const cycleTwoDayThree = calculateWeights(3, 3, weights);
		expect(cycleTwoDayThree.mainLiftOne.thirdSet.reps).toBe(1);
		expect(cycleTwoDayThree.mainLiftTwo.thirdSet.reps).toBe(1);
		expect(cycleTwoDayThree.mainLiftOne.firstSet.weight).toBe(80 * 0.75);
		expect(cycleTwoDayThree.mainLiftTwo.secondSet.weight).toBe(100 * 0.85);
	});
});

describe('Increase weights', () => {
	it('Add 2.5 & 5', () => {
		const increasedWeights = increaseWeights(weights);
		expect(increasedWeights.deadlift).toBe(155);
		expect(increasedWeights.squat).toBe(105);
		expect(increasedWeights.benchpress).toBe(82.5);
		expect(increasedWeights.overheadpress).toBe(52.5);
	});
});
