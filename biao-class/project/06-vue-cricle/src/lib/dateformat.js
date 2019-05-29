
function pad(num){
    if(num<10)
    return '0'+num;

    return num;
}

function format(dateObj){
    let year = dateObj.getFullYear();
    let month = pad(dateObj.getMonth()+1);
    let date = pad(dateObj.getDate());
    let hour = pad(dateObj.getHours());
    let minute = pad(dateObj.getMinutes());
    let second = pad(dateObj.getSeconds());

    return year + '-' + month +'-' + date +' '+ hour +':' + minute + ':' + second ;
}

//  Y-m-d H:i:s.

export default  {
    format,
}