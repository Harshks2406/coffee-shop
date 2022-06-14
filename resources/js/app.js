import axios from 'axios'
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')


function updateCart(drinks){
    axios.post('/update-cart', drinks).then(res =>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty

    })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let drinks = JSON.parse(btn.dataset.drink)
        updateCart(drinks)
    })
})