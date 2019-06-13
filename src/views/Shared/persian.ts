export function toPersianNumbers(content: any): string {
    content = content + ''; // cast content to string
    const numbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return content.replace(/[0-9]/g, function (w: any) {
        return numbers[+w]
    })
}
