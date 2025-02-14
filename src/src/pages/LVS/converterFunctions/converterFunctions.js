export const convertHrToSec = (hr) => {
    return hr * 60 * 60;
}

export const convertMinToSec = (min) => {
    return min * 60;
}

export const convertMinToHr = (min) => {
    return Number(min) / 60;
}

export const convertHrToMin = (hr) => {
    return Number(hr) * 60;
}

export const formatHrMin = (time) => {
    if (time && time <= 9 && time.toString().length < 2) {
        time = '0' + time
    };
    return time;
}

export const convertSecToHr = (sec) => {
    return ((sec / 60) / 60)
}

export const splitTime = (timeFormat) => {
    if (typeof (timeFormat) === "string" && timeFormat.includes(':')) {
        let hr;
        let min;
        hr = timeFormat.split(':')[0];
        min = timeFormat.split(':')[1];
        return formatHrMin(hr) + ':' + formatHrMin(min)
    } else if(typeof (timeFormat) === "string" && timeFormat.length === 4) {
        return formatHHMM(timeFormat)
    }
    else {
        return formatHrMin(timeFormat)
    }
}

export const splitTimefromParams_start = (params) => {

    let timeFormat = params.data.starttime;
    if (typeof (timeFormat) === "string" && timeFormat.includes(':')) {
        let hr;
        let min;
        hr = timeFormat.split(':')[0];
        min = timeFormat.split(':')[1];
        return formatHrMin(hr) + ':' + formatHrMin(min)
    } else if(typeof (timeFormat) === "string" && timeFormat.length === 4) {
        return formatHHMM(timeFormat)
    }
    else {
        return formatHrMin(timeFormat)
    }
}




export const nullAndNanChecking = (data, type) => {
    if (data === "null") {
        if (type === 'distance' || type === 'hr') {
            return 0;
        } else if (type === 'time') {
            return '';
        } else if (type === 'status'){
            return 'Open';
        }
    } else if(data === 'undefined'){
        return '';

    } else if(data === 'NaN' && type === 'vrStops') {
              return 0
    }
    else {
        return data;
    }
}

export const formatTime = (d) => {
    d = Number(d);
    var h = Math.floor(d / 60 / 60);
    var m = Math.floor(d / 60) - (h * 60);
    var hDisplay = h > 0 ? h : "0";
    var mDisplay = m > 0 ? m : "0";
    return formatHrMin(hDisplay) + ':' + formatHrMin(mDisplay);
}

export const formatHHMM = (hm) => {
    let hr = hm.substring(0, 2);
    let mm = hm.substring(2, 4);
    return hr + ':' + mm;
}