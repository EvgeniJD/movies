export default function fullNameValidator(username) {
    let regX = new RegExp(/^[A-Za-z]+( [A-Za-z]+)+$/);
    return regX.test(username);
}