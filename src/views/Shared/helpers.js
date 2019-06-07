export function toPersianNumbers(string) {
    string = string + '';
    const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return string.replace(/[0-9]/g, function (w) {
        return id[+w]
    })
}
