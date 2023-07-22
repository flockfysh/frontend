export function join<Type1, Type2>(array: Type1[], joiner: Type2) {
    const result: (Type1 | Type2)[] = [];
    for (let i = 0; i < array.length - 1; i++) {
        result.push(array[i]);
        result.push(joiner);
    }

    if (array.length - 1 in array) result.push(array[array.length - 1]);

    return result;
}
