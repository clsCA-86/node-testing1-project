const utils = require('./index')

describe('[Exercise 1] trimProperties', () => {
  test('[1] returns an object with the properties trimmed', () => {
    // EXAMPLE
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    const expected = { foo: 'foo', bar: 'bar', baz: 'baz' }
    const actual = utils.trimProperties(input)
    expect(actual).toEqual(expected)
  })
  test('[2] returns a copy, leaving the original object intact', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    utils.trimProperties(input)
    expect(input).toEqual({ foo: '  foo ', bar: 'bar ', baz: ' baz' })
  })
})

describe('[Exercise 2] trimPropertiesMutation', () => {
  test('[3] returns an object with the properties trimmed', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    const expected = { foo: 'foo', bar: 'bar', baz: 'baz' }
    const actual = utils.trimPropertiesMutation(input)
    expect(actual).toEqual(expected)
  })
  test('[4] the object returned is the exact same one we passed in', () => {
      const input = {foo: 'foo', bar: 'bar', baz: 'baz'}
      const actual = utils.trimPropertiesMutation(input)
      expect(actual).toBe(input)
    })
  })


describe('[Exercise 3] findLargestInteger', () => {
  test('[5] returns the largest number in an array of objects { integer: 2 }', () => {
    const input = [{integer: 1}, {integer: 3}, {integer: 100}, {integer: 35}];
    const largestNum = utils.findLargestInteger(input);
    expect(largestNum).toBe(100);
  })
})

describe('[Exercise 4] Counter', () => {
  const startingNum = 3
  let counter
  beforeEach(() => {
    counter = new utils.Counter(startingNum) // each test must start with a fresh couter
  })
  test('[6] the FIRST CALL of counter.countDown returns the initial count', () => {
    const firstCount = counter.countDown()
    expect(firstCount).toEqual(startingNum)
  })
  test('[7] the SECOND CALL of counter.countDown returns the initial count minus one', () => {
    const firstCount = counter.countDown()
    const secondCount = counter.countDown()
    expect(secondCount).toEqual(startingNum - 1)
  })
  test('[8] the count eventually reaches zero but does not go below zero', () => {
    let count = counter.countDown() // 3
    count = counter.countDown() // 2
    count = counter.countDown() // 1
    count = counter.countDown() // 0
    count = counter.countDown() // 0
    count = counter.countDown() // 0
    expect(count).toEqual(0)
    expect(count).toBeGreaterThanOrEqual(0)
  })
})

describe('[Exercise 5] Seasons', () => {
  let seasons
  beforeEach(() => {
    seasons = new utils.Seasons() // each test must start with fresh seasons
  })
  test('[9] the FIRST call of seasons.next returns "summer"', () => {
    let season = seasons.next()
    expect(season).toBe('summer')
  })
  test('[10] the SECOND call of seasons.next returns "fall"', () => {
    let season = seasons.next()
    season = seasons.next()
    expect(season).toBe('fall')
  })
  test('[11] the THIRD call of seasons.next returns "winter"', () => {
    let season = seasons.next()
    season = seasons.next()
    season = seasons.next()
    expect(season).toBe('winter')
  })
  test('[12] the FOURTH call of seasons.next returns "spring"', () => {
    let season = seasons.next()
    season = seasons.next()
    season = seasons.next()
    season = seasons.next()
    expect(season).toBe('spring')
  })
  test('[13] the FIFTH call of seasons.next returns again "summer"', () => {
    let season = seasons.next()
    season = seasons.next()
    season = seasons.next()
    season = seasons.next()
    season = seasons.next()
    expect(season).toBe('summer')

  })
  test('[14] the 40th call of seasons.next returns "spring"', () => {
    let season = seasons.next()
    const calls = 39
    for (let i = 1; i <= calls; i++) {
      season = seasons.next()
    }
    expect(season).toBe('spring')
  })
})

describe('[Exercise 6] Car', () => {
  let focus
  beforeEach(() => {
    focus = new utils.Car('focus', 20, 30) // each test must start with a fresh car
  })
  test('[15] driving the car returns the updated odometer', () => {
    let drive = focus.drive(100)
    expect(focus.odometer).toBe(100)
    drive = focus.drive(100)
    expect(focus.odometer).toBe(200)
  })
  test('[16] driving the car uses gas', () => {
    let drive = focus.drive(100)
    let tank = focus.tank
    expect(tank).toBeLessThan(focus.tankSize)

    /* Tests tank keeps decreasing on subsequent drives*/
    drive = focus.drive(100)
    let tank2 = focus.tank
    expect(tank2).toBeLessThan(tank)

  })
  test('[17] refueling allows to keep driving', () => {
    let drive = focus.drive(600)
    expect(focus.tank).toBe(0)

    /* tank is empty, odometer doesn't cahnge */
    drive = focus.drive(100)
    expect(focus.odometer).toBe(600)

    /* tank doesn't exceed tank size */
    focus.refuel(100)
    expect(focus.tank).toBeGreaterThan(0)
    expect(focus.tank).toBe(20)

    /* car resumes driving, but runs out of gas again */
    focus.drive(600)
    focus.drive(600)
    expect(focus.odometer).toBe(1200)

    /* car refuels and resumes driving */
    focus.refuel(20)
    focus.drive(100)
    expect(focus.odometer).toBe(1300)

  })

  test('[18] adding fuel to a full tank has no effect', () => {
    /* no matter how much gas is added, tank never exceeds 20 */
    focus.refuel(10000000)
    expect(focus.tank).toBe(20)    
  })
})

describe('[Exercise 7] isEvenNumberAsync', () => {
  test('[19] resolves true if passed an even number', async () => {
    const ten = await utils.isEvenNumberAsync(10)
    expect(ten).toEqual(true)
  })

  test('[20] resolves false if passed an odd number', async () => {
    const eleven = await utils.isEvenNumberAsync(11)
    expect(eleven).toEqual(false)
  })
})
