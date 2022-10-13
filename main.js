/*fetch('https://api.escuelajs.co/api/v1/products')
.then(res => res.json())
.then(data => console.log(data))*/

//otra forma de hacerlo con await

//variables iniciales
let shopingCartArray =[]
let total = 0
let productContainer =document.querySelector('.shop-items')
let totalElement = document.querySelector('.cart-total-title')

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1d11d3fbc3msh9944c36290fbc3ap132cc3jsnba875ac334d2',
		'X-RapidAPI-Host': 'books39.p.rapidapi.com'
	}
};
//peticion de productos al servidor
//let res= await fetch(' https://api.escuelajs.co/api/v1/products')
let res= await fetch('https://books39.p.rapidapi.com/CZFA4F/books', options)
let data =await res.json()

//limitados a 4 productos
let productsArray= data.slice(0,4)
console.log(productsArray)

// imprimir productos en pantalla
productsArray.forEach(product =>{
    productContainer.innerHTML += ` 
    <div class="shop-item" id="${product.id}">
        <span class="shop-item-title">${product.TITLE}</span>
        <img class="shop-item-image" src="./Images/img2.jpg">
        <p class="shop-item-author">${product.AUTHOR}</p>
        <div class="shop-item-details">
        <span class="shop-item-price">$${product.YEAR}</span>
        <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
    </div>
</div>`
    
 })
 //escucho cuando se hace click en un boton
 let addBtns =document.querySelectorAll('.shop-item-button')
addBtns = [...addBtns];


let cartContainer = document.querySelector('.cart-items')
addBtns.forEach(btn =>{
    btn.addEventListener('click', event=>{
       
        //agrego productos al carro
     

        //buscar el id del producto
        
        let actualId=parseInt(event.target.parentNode.parentNode.id)
       
        //con el id encontrar el objeto actual
        let  actualProduct = productsArray.find(item => item.id == actualId)

        if (actualProduct.quantity === undefined){
            actualProduct.quantity = 1
        }
        

         // preguntar si el producto que estoy agregando ya existe

        
        let existe = false
         shopingCartArray.forEach(libro=>{
            if(actualId == libro.id){
                existe = true
            }
         })

        if (existe){
            actualProduct.quantity++
            console.log(actualProduct.quantity)
        }else{

            shopingCartArray.push(actualProduct)  
        }

    //Dibujar en el DOM el arreglo de compras actualizado        
            drowItems()

    //actualizar el valor total
            getTotal()

    //actualizo el numero de items
            updateNumberofItems()
    //remuevo  items    
            removeItem()    

    })

})

function getTotal(){
    let sumTotal
    let total = shopingCartArray.reduce((sum, item)=>{
        sumTotal= sum + item.quantity * item.YEAR
        return sumTotal

    },0)
    totalElement.innerText = `$${total}`

}

function drowItems(){
    cartContainer.innerHTML=''
    shopingCartArray.forEach(item=>{
        cartContainer.innerHTML += `
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="./Images/img2.jpg" width="100" height="100">
                    <span class="cart-item-title">${item.TITLE}</span>
                </div>
                <span class="cart-price cart-column">$${item.YEAR}</span>
                <div class="cart-quantity cart-column">
                    <input class="cart-quantity-input" min="1" type="number" value="${item.quantity}">
                    <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`           
        
    })
    removeItem()
}
function updateNumberofItems(){

    let inputNumber = document.querySelectorAll('.cart-quantity-input')
    inputNumber = [...inputNumber]

    inputNumber.forEach (item => {
        item.addEventListener('click',event =>{
            //conseguir el titulo del libro
            let actualBookTitle = event.target.parentElement.parentElement.childNodes[1].innerText
            let actualBookQuantity = parseInt(event.target.value)
            
            //Busco el objeto con ese titulo
            let actualBookObject= shopingCartArray.find(item => item.TITLE == actualBookTitle)

            //actualizar el numero de la propiedad quantity
            actualBookObject.quantity = actualBookQuantity

            //actualizar el precio total

            getTotal()
         })

    })
}

function removeItem (){
   
    let removeBtns = document.querySelectorAll('.btn-danger')
    removeBtns = [...removeBtns]
        removeBtns.forEach(btn => {
            btn.addEventListener('click', event=>{
         
           //conseguir el titulo del libro 
           
           let actualBookTitle = event.target.parentElement.parentElement.childNodes[1].innerText

           //Busco el objeto con ese titulo

           let actualBookObject= shopingCartArray.find(item => item.TITLE == actualBookTitle)
          
           //remover el arreglo de productos del cart
           shopingCartArray = shopingCartArray.filter( item => item != actualBookObject)
           console.log(shopingCartArray)

            //actualizar el precio total
            drowItems()
            getTotal()
            updateNumberofItems()
        })
    })
  

} 




