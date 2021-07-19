/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { values } from 'lodash';
import {
  all,
  allPass, and, either, equals,
  filter,
  gte, length, not, omit,
  pick,
  pipe,
  prop,
  propEq,
  whereEq, __
} from 'ramda';

const isEqWhite = equals('white');
const isEqGreen = equals('green');
const isEqRed = equals('red');
const isEqBlue = equals('blue');
const isOrange = equals('orange');

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (colors) => {
  const props = ['square', 'star'];

  return allPass([
    pipe(pick(props), whereEq({ square: 'green', star: 'red' })),
    pipe(omit(props), values, all(isEqWhite)),
  ])(colors);
};

/** Вариант первой функции попроще, но мы жестко задаем, что именно треугольник и квадрат должны быть белыми,
 * если добавятся еще фигуры, которые тоже должны быть белыми, то функция не сработает */
// export const validateFieldN1 = (colors) => {
//   return whereEq({ circle: 'white', square: 'green', triangle: 'white', star: 'red' })(colors);
// };

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (colors) =>
  pipe(values, filter(isEqGreen), length, gte(__, 2))(colors);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (colors) =>
  equals(
    pipe(values, filter(isEqRed), length)(colors),
    pipe(values, filter(isEqBlue), length)(colors),
  );

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (colors) =>
  whereEq({ circle: 'blue', star: 'red', square: 'orange' })(colors);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => {
  return pipe(
   values,
   length,
   

  )
}

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = (colors) => {
  const hasTwoGreen = pipe(values, filter(isEqGreen), length, equals(2));
  const hasGreenTriangle = propEq('triangle', 'green');
  const hasOneRed = pipe(values, filter(isEqRed), length, equals(1));

  return allPass([hasTwoGreen, hasGreenTriangle, hasOneRed])(colors);
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (colors) => all(isOrange, values(colors));

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = (colors) =>
  pipe(prop('star'), either(isEqRed, isEqWhite), not)(colors);

// 9. Все фигуры зеленые.
export const validateFieldN9 = (colors) => all(isEqGreen, values(colors));

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = (colors) => {
  return and(
      equals(prop('triangle', colors), prop('square', colors)),
      pipe(prop('triangle'), isEqWhite, not)(colors)
    );
};
