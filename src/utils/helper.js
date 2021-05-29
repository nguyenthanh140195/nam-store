export function numberWithCommas(str = '') {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function numberWithCommasES5(num = 0) {
    return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
}

export function convertTimeStamp(second = 0) {
    const numberSecond = Number(second);
    const hours = Math.floor(numberSecond / (60 * 60));
    const minutes = Math.floor(numberSecond / 60 % 60);

    if (hours) return `${hours}h${minutes}m`;
    else if (minutes) return `${minutes}m`;
    else return 'Less than 30s';
}

export function dateToString(d = new Date()) {
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const abc = num => num > 9 ? '' + num : '0' + num;

    return year.toString() + abc(month) + abc(date);
}
