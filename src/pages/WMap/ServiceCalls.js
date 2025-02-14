export const fetchCall = (url)=>{
    fetch(url)
            .then(function (response) {
                return response.json()
            }).then((res) => { 
                return res
            })
}