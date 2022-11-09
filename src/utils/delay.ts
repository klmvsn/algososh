export const delay = (delay: number = 1000): Promise<null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null);
      }, delay);
    });
  };