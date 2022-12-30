import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);

export const weightList = () => pb.collection('weights').getList(1);
export const getOneRepMax = (id: string) => pb.collection('weights').getOne(id);
export const updateOneRepMax = (
  id: string,
  data: {
    deadlift?: number;
    squat?: number;
    benchpress?: number;
    overheadpress?: number;
  }
) => pb.collection('weights').update(id, data);

export default pb;
