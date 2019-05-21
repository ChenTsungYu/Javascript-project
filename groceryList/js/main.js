     // variables
       const addItemsAction = document.querySelector('.addItems-action');
       const input = document.querySelector('.addItems-input');
       const submit = document.querySelector('.addItems-submit');
   
       const list = document.querySelector('.grocery-list');
       const displayItemsAction = document.querySelector('.displayItems-action');
       const clear = document.querySelector('.displayItems-clear');
   
       // event listeners
   
       // add item
       submit.addEventListener('click', addItem);
       // remove item
       list.addEventListener('click', removeSingleItem);
       // display local storage
       document.addEventListener('DOMContentLoaded', displayStorage)
       // remove all items
       clear.addEventListener('click', removeItems);
   
       // functions

       // add item
       function addItem(event) {
           event.preventDefault();
           let value = input.value;
           if (value === '') {
               showAction(addItemsAction, 'Please add grocery item', false)
           }
           else {
               showAction(addItemsAction, `${value} added to the list`, true);
               createItem(value);
               updateStorage(value);
           }
       }
      
       // success or alert 
       function showAction(element, text, value) {
           if (value) {
               element.classList.add('success');
               element.textContent = text;
               input.value = '';
               setTimeout(function () {
                   element.classList.remove('success')
               }, 2000)
           }
           else {
               element.classList.add('alert');
               element.textContent = text;
               input.value = '';
               setTimeout(function () {
                   element.classList.remove('alert')
               }, 2000)
           }
       }
   
       // create item
       function createItem(value) {
           let parent = document.createElement('div');
           parent.classList.add('grocery-item');
   
           parent.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
       <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
       </a>`;
   
           // append to list 
           list.appendChild(parent)
       }
   
       // remove single item
       function removeSingleItem(event) {
           event.preventDefault();
           // console.log(event.target);
   
           let link = event.target.parentElement;
           // console.log(link);
           if (link.classList.contains('grocery-item__link')) {
               let text = link.previousElementSibling.innerHTML;
            //   console.log(text);
               let groceryItem = event.target.parentElement.parentElement;
              // console.log(groceryItem);
   
               // remove from list
               list.removeChild(groceryItem);
               showAction(displayItemsAction, `${text} remove from the list`, true)
   
               // remove from local storage
               editStorage(text);
           }
       }
       // update local storage
       function updateStorage(value) {
           // localStorage.clear()
           let groceryList;
           let exists = localStorage.getItem('groceryList');
           // console.log(exists);
           groceryList = exists ? JSON.parse(exists) : []
           groceryList.push(value);
           localStorage.setItem('groceryList', JSON.stringify(groceryList))
       }
       // display local storage
       function displayStorage() {
           let exists = localStorage.getItem('groceryList');
           if (exists) {
               let storageItems = JSON.parse(localStorage.getItem('groceryList'));
               storageItems.forEach(function (element) {
                  createItem(element)
               })
            }
       }
       // remove items
       function removeItems() {
           // delete from localstorage
           localStorage.removeItem('groceryList');
           let items = document.querySelectorAll('.grocery-item');

           if (items.length > 0) {
               showAction(displayItemsAction, `All items deleted`, false)
               items.forEach(function (element) {
                   list.removeChild(element);
               })
           } else {
               showAction(displayItemsAction, `No more items to delete`, true)
           }
       }
       // edit storage
       function editStorage(item) {
           let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
           let index = groceryItems.indexOf(item);
           
           groceryItems.splice(index, 1);
           localStorage.removeItem('groceryList');
           localStorage.setItem('groceryList', JSON.stringify(groceryItems));
       }
