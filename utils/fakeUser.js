// utils/fakeUser.js

import { faker } from '@faker-js/faker';

export function createFreshUser() {
  const randomText = faker.string.alpha({
    length: 8,
    casing: 'lower'
  });

  const randomNumber = faker.number.int({
    min: 1000,
    max: 9999
  });

  return {
    freshUsername: `user-${randomText}${randomNumber}`,
    freshPassword: `Test@${faker.string.alphanumeric(8)}`
  };
}