import '@testing-library/jest-dom/extend-expect';

import { get30DaysAgoDateString } from '../utils/api-utils';

describe('api utils', () => {
  // Didn't have time for more
  test('get30DaysAgoDateString working', () => {
    const dateToTest = get30DaysAgoDateString(new Date('2020/12/18'));
    const date30DaysAgo = '2020-10-18';

    expect(dateToTest).toBe(date30DaysAgo);
  });
});
