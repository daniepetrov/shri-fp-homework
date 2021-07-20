/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import { allPass, andThen, gt, ifElse, length, lt, match, otherwise, pipe, prop, tap, __ } from 'ramda';
import Api from '../tools/api';

const api = new Api();

const isPositive = gt(__, 0)
const isLengthInRange = (a, z) => pipe(
    length,
    allPass([
        gt(__, a),
        lt(__, z),
    ])
)
const isValidInput = allPass([
    isPositive,
    isLengthInRange(2, 10),
    match(/[0-9.]+/)
])

const convertToNumber = (value) => Number(value)
const convertToFixed = (value) => value.toFixed(0)
const getBinaryFromApi = (value) => api.get('https://api.tech/numbers/base', { from: 10, to: 2, number: value })
const powToSquare = (value) => value ** 2
const getRemainder = (value) => value % 3
const getRandomAnimalFromApi = (id) => api.get(`https://animals.tech/${id}`, null)

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
    pipe(
        tap(writeLog),
        ifElse(isValidInput, pipe(
            convertToNumber,
            convertToFixed,
            tap(writeLog),
            getBinaryFromApi,
            otherwise(tap(handleError)),
            andThen(
                pipe(
                    prop('result'),
                    tap(writeLog),
                    length,
                    tap(writeLog),
                    powToSquare,
                    tap(writeLog),
                    getRemainder,
                    tap(writeLog),
                    getRandomAnimalFromApi,
                    otherwise(tap(handleError)),
                    andThen(pipe(
                        prop('result'),
                        tap(handleSuccess)
                    )
                    )
                )
            )
        ), tap(() => handleError('ValidationError'))),

    )(value)
}

export default processSequence;
