export default function validateEmail(email: string) {
    // logic below
    // email shouldn't include spaces
    // email is at least 5 letters and include @ and .
    // there are letters before @
    // there are letters after .
    // and if there are letters between @ and .
    if (
        !email.includes(' ') &&
        email.length >= 5 &&
        email.includes('@') &&
        email.includes('.') &&
        email.split('@')[0].length > 0 &&
        email.split('.')[1].length > 0 &&
        email.split('@')[1].split('')[0] !== '.'
    ) return true;

    return false;
}
