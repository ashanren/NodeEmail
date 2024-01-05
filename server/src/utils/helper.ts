
export const createAsyncIterable = async function*(i: any[]) {
  for (const elem of i) {
    yield elem;
  }
}

export const sleep = async (s: number) => {
  return new Promise(r => setTimeout(r, (s * 1000)));
}