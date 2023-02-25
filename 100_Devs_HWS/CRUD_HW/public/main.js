document.querySelector('#update-button').addEventListener('click',()=>{
    console.log('click');
    fetch('/quotes',{
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            name:"Darth Vader",
            quote:"I find your lack of faith disturbing"
        })
    })
    .then(res=>{
        if(res.ok){
            return res.json()
        }
    })
    .then(response=>{
        console.log(response)
        window.location.reload(true); 
    })
});

document.querySelector('#delete-button').addEventListener('click',()=>{
    console.log('click');
    fetch('/quotes',{
        method: 'delete',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            name:"Darth Vader"
        })
    })
    .then(res=>{
        if(res.ok){
            return res.json()
        }
    })
    .then(response=>{
        console.log(response)
        if(response == 'No more Darth Quotes to delete'){
            document.querySelector('#deleted').textContent = response;
        }else{
            window.location.reload(true); 
        }
    })
});
