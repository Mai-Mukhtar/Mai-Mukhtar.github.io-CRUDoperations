// Variables
var productName =document.getElementById('productName');
var productCategory = document.getElementById('productCategory');
var productPrice = document.getElementById('productPrice');
var productDesc = document.getElementById('productDesc');
var addBtn = document.getElementById('addBtn');
var clearBtn =document.getElementById('clearBtn');
var index;
var productSearch =document.getElementById('productSearch');
var productList = JSON.parse(localStorage.getItem('All data'));
var alertName1 =document.getElementById('alertName1');
var alertName2 =document.getElementById('alertName2');
var alertName3 =document.getElementById('alertName3');
var alertName4 =document.getElementById('alertName4');

// Local Storage 
if(localStorage.getItem('All data')!= null){
    var productList = JSON.parse(localStorage.getItem('All data'));
}else{
    var productList=[];
}
displayProduct();
// Creata Product Function
function createProduct(){
    if(validateProductName()&& validateProductCategory()&&validateProductPrice() && validateProductDesc()){
        if(addBtn.innerHTML=='Add Product'){
            var singleProduct ={
                pName:productName.value ,
                pCategory:productCategory.value ,
                pPrice:productPrice.value ,
                pDesc:productDesc.value
            }
            productList.push(singleProduct);
            localStorage.setItem('All data' , JSON.stringify(productList));
            displayProduct();
            clearProduct();
        }else{
            updateProduct(index);
        }
    }
}
addBtn.addEventListener('click' , createProduct);
// Display Product Function
function displayProduct(){
    var str ="";
    var tbody =document.getElementById('tbody');
    for(var i=0 ; i<productList.length ; i+=1){
        str += `<tr>
        <td>${i}</td>
        <td>${productList[i].pName}</td>
        <td>${productList[i].pCategory} </td>
        <td>${productList[i].pPrice} </td>
        <td>${productList[i].pDesc}</td>
        <td><button onclick="retrieveDataInForm(${i})"  class="btn btn-warning"><i class="fas fa-edit "></i></button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
    </tr> `
    }
    tbody.innerHTML=(str);
}
// Clear Product Function
function clearProduct(){
    productName.value ='';
    productCategory.value='';
    productPrice.value='';
    productDesc.value='';
}
clearBtn.addEventListener('click' , clearProduct);
// Delete Product Function
function deleteProduct(i){
    productList.splice( i , 1);
    localStorage.setItem('All data' , JSON.stringify(productList));
    displayProduct();
}
// Retrieve Data In Form
function retrieveDataInForm(i){
    index =i;
     productName.value =  productList[i].pName;
     productCategory.value =  productList[i].pCategory;
     productPrice.value =  productList[i].pPrice;
     productDesc.value =  productList[i].pDesc;
     addBtn.innerHTML =('Update Product');
}
// Search Product
function searchProduct(){
    var str='';
    for(var i=0 ; i<productList.length ; i+=1){
        if(productList[i].pName.toLowerCase().includes(productSearch.value.toLowerCase())){
            str += `<tr>
            <td>${i}</td>
            <td>${productList[i].pName}</td>
            <td>${productList[i].pCategory} </td>
            <td>${productList[i].pPrice} </td>
            <td>${productList[i].pDesc}</td>
            <td><button  class="btn btn-warning"><i class="fas fa-edit "></i></button></td>
            <td><button onclick="deleteProduct()" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
        </tr> `
    }
    tbody.innerHTML=(str);

}
}
productSearch.addEventListener('keyup' , searchProduct);

//Updata Product
function updateProduct(index){
    productList[index].pName = productName.value;
    productList[index].pCategory =productCategory.value ;
    productList[index].pPrice=productPrice.value;
    productList[index].pDesc=productDesc.value;
    localStorage.setItem('All data' , JSON.stringify(productList));
    displayProduct();
    addBtn.innerHTML =('Add Product');
    clearProduct();
}
// Validate Product Name
function validateProductName(){
    var pnameRegex = /^[A-Z][a-z0-9]{1,15}$/;
    var productNameInput = productName.value;
    if(pnameRegex.test(productNameInput)){
        alertName1.style.display='none' 
        return true;   
}else{
    alertName1.style.display='block';
    return false;
}
}
productName.addEventListener('blur' , validateProductName);
// Validate Product Category
function validateProductCategory(){
    var pnameRegex = /^[A-Z][a-z0-9]{3,15}$/;
    var productCategoryInput = productCategory.value;
    if(pnameRegex.test(productCategoryInput)){
        alertName2.style.display='none' 
        return true;   
}else{
    alertName2.style.display='block';
    return false;
}
}
productCategory.addEventListener('blur' , validateProductCategory);
// Validata Product Price
function validateProductPrice(){
    var pnameRegex =/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/;
    var productPriceInput = productPrice.value;
    if(pnameRegex.test(productPriceInput)){
        alertName3.style.display='none'
        return true;
    }else{
        alertName3.style.display='block'
        return false;
    }
}
productPrice.addEventListener('blur' , validateProductPrice);
// Validata Product Description
function validateProductDesc(){
    var pnameRegex =/^[A-Za-z]/;
    var productDescInput = productDesc.value;
    if(pnameRegex.test(productDescInput)){
        alertName4.style.display='none'
        return true;
    }else{
        alertName4.style.display='block'
        return false;
    }
}
productDesc.addEventListener('blur' , validateProductDesc);
