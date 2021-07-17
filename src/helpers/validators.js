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
import { all, allPass, and, anyPass, equals, forEachObjIndexed, propEq } from 'ramda';

const isEqWhite = equals('white');
const isEqGreen = equals('green');
const isEqRed = equals('red');
const isEqBlue = equals('blue');
const isOrange = equals('orange');

// const  = propEq('star', 'red')
const isTriangleGreen = propEq('triangle', 'green')

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = ({circle, square, triangle, star}) => {
    all()
}


// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = () => false;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = () => false;

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = (colors) => all(isOrange, values(colors))

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = (colors) => all(isEqGreen, values(colors))

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
