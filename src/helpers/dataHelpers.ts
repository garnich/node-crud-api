const isHobbieDataValid = (hobbies: unknown[]): boolean => {
  return hobbies.every((hobbie) => typeof hobbie === 'string');
};

export const isNewUserDataValid = (data: Record<string, unknown>): boolean =>
  Boolean(
    data.username &&
      typeof data.username === 'string' &&
      data.age &&
      typeof data.age === 'number' &&
      Array.isArray(data.hobbies) &&
      isHobbieDataValid(data.hobbies)
  );
