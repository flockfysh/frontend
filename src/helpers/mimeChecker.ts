import { is as typeIs } from 'type-is';

export default function mimeChecker(input: string, accepted: string) {
    const acceptedTypes = accepted.split(/, \s*/);
    return !!typeIs(input, acceptedTypes);
}
