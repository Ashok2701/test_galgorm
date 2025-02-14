export const getFullDate = (date) =>{
    return appendZero(appendZero(Number(date.get('month'))+1) +'-'+ date.get('date'))+'-'+ date.get('year') 
}

export const appendZero = (number) =>{
    if(Number(number) <= 9){
        let num =  '0'+ Number(number);
        return num
    } else {
        return number
    }
}