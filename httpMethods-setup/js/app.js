//get elements
const itemList = document.querySelector(".items");
const httpForm = document.getElementById("httpForm");
const itemInput = document.getElementById("itemInput");
const imageInput = document.getElementById("imageInput");
const feedback = document.querySelector(".feedback");
// const items = document.querySelector(".items");
const submtiBtn = document.getElementById("submitBtn");
let editedItemID = 0;

let submitItem = event => { //  let 要放置在事件操作的前面
    event.preventDefault();
    const itemValue = itemInput.value;
    const imageValue = imageInput.value;

    // 務必要取得itemValue 的length，非 itemValue
    if (itemValue.length === 0 || imageValue.length === 0) { 
        // 使用者未輸入值
        showFeedback("please enter vaild values");
    } else {
        postItemAPI(imageValue, itemValue);
        imageValue.value = "";
        itemValue.value = "";
    }
}

httpForm.addEventListener("submit", submitItem);

// load items
document.addEventListener('DOMContentLoaded', () => {
    getItemsAPI(showItems)
})

// show feedback (alert)
let showFeedback = text => {
    feedback.classList.add('showItem');
    feedback.innerHTML = `<p>${text}</p/>`;

    setTimeout(() => {
        feedback.classList.remove('showItem')
    }, 2000);
}


// get items
let getItemsAPI = cb => {
    const url = "https://5ce120518ad3c700145b7ae2.mockapi.io/items/blog";
    const ajax = new XMLHttpRequest();

    ajax.open('GET', url, true);

    ajax.onload = () => {
        if (ajax.status === 200) {
            cb(ajax.responseText);
        } else {
            console.log("something went wrong");
        }
    }

    ajax.onerror = () => console.log('there is an error');
    ajax.send();
}

// show item

let showItems = data => {
    // console.log(data);
    const items = JSON.parse(data);
    // console.log(items);

    let info = "";
    items.forEach(item => {

        info +=
            `<li class="list-group-item d-flex align-items-center justify-content-between flex-wrap item my-2">
         <img src="${item.avatar}" id='itemImage' class='itemImage img-thumbnail' alt="">
         <h6 id="itemName" class="text-capitalize itemName">${item.name}</h6>
         <div class="icons">
  
          <a href='#' class="itemIcon mx-2 edit-icon" data-id='${item.id}'>
           <i class="fas fa-edit"></i>
          </a>
          <a href='#' class="itemIcon mx-2 delete-icon" data-id='${item.id}'>
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </li>`
    });
    itemList.innerHTML = info;
    // get Icons
    getIcons();

}

// post Item  // 點擊之後傳送到 MOCK API 所建立的JSON檔
let postItemAPI = (img, itemName) => {
    const avatar = `img/${img}.jpeg`;
    const name = itemName;

    const url = "https://5ce120518ad3c700145b7ae2.mockapi.io/items/blog";
    const ajax = new XMLHttpRequest();

    ajax.open('POST', url, true);

    // 設定內容類型，POST要發送的資料會放在請求的本體中，告知發送的資料類型
    // 發送表單類型資料
    ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    //  預檢請求

    // 使用 非同步，需監聽 load 事件(監聽事件)
    // 讓 回應完成時 能執行相對應的函式 — 回調函式 (callback):
    ajax.onload = () => { // 非同步取得回應
       // Server 回應的是 XML 或 XHTML，使用 responseXML 屬性
        console.log(ajax.responseText);
        getItemsAPI(showItems);
    }
 // 回傳錯誤訊息
    ajax.onerror = () => console.log('there is an error');

    // 發送請求
    ajax.send(`avatar=${avatar}&name=${name}`);
}
// getIcons
let getIcons = () => {
    const editIcon = document.querySelectorAll('.edit-icon');
    const deleteIcon = document.querySelectorAll('.delete-icon');
    //console.log(editIcon);

    deleteIcon.forEach(icon => {
        // 獲取 各項的 data-id
        const itemID = icon.dataset.id;
        icon.addEventListener('click', event => {
            event.preventDefault();
            //  console.log(itemID);
            deleteItemAPI(itemID);
        });
    });

    editIcon.forEach(icon => {
        const itemID = icon.dataset.id;
        icon.addEventListener('click', event => {
            event.preventDefault();
            // console.log(event.target);  // 獲得<i></i>
            // 從父節點取得  <li> </li>
            // console.log(event.target.parentElement.parentElement.parentElement); 
            const parent = event.target.parentElement.parentElement.parentElement;
            const itemImg = parent.querySelector('.itemImage').src;
            const name = parent.querySelector('.itemName').textContent;
            //console.log(parent, img, name, itemID);
            editedItemUI(parent, itemImg, name, itemID)


        })
    })


}

// deleteItemAPI

let deleteItemAPI = id => {
    const url = `https://5ce120518ad3c700145b7ae2.mockapi.io/items/blog/${id}`;
    const ajax = new XMLHttpRequest();
    //console.log(id);

    ajax.open('DELETE', url, true);

    ajax.onload = () => {
        if (ajax.status === 200) {
            //  console.log(ajax.responseText);
            getItemsAPI(showItems);
        } else {
            console.log("something went wrong");
        }
    }
    ajax.onerror = () => console.log('there is an error');
    ajax.send();
}

// editedItemUI
let editedItemUI = (parent, itemImg, name, itemID) => {
    event.preventDefault();

    itemList.removeChild(parent);

    const imgIndex = itemImg.indexOf('img/');
    const jpegIndex = itemImg.indexOf('.jpeg');
    console.log(imgIndex, jpegIndex);

    // 提取 位置在 imgIndex + 4 之後的字串
    const img = itemImg.slice(imgIndex + 4, jpegIndex);
    //console.log(img);

    // 點擊編輯後，上方輸入框變更成編輯的項目，按鈕文字也變更
    itemInput.value = name.trim();  // 消除空格
    imageInput.value = img;
    editedItemID = itemID;
    submtiBtn.textContent = "Edit Item";

    httpForm.removeEventListener('submit', submitItem);
    httpForm.addEventListener('submit', editItemAPI);

}

// editItemAPI
let editItemAPI = (event) => {
    event.preventDefault();
    const id = editedItemID;

    const itemValue = itemInput.value;
    const imageValue = imageInput.value;

    // 務必要取得itemValue 的length，非 itemValue
    if (itemValue.length === 0 || imageValue.length === 0) {
        showFeedback("please enter vaild values");
    } else {
        const img = `img/${imageValue}.jpeg`;
        const name = itemValue;

        const url = `https://5ce120518ad3c700145b7ae2.mockapi.io/items/blog${id}`;
        const ajax = new XMLHttpRequest();

        ajax.open('PUT', url, true);

        ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded')

        ajax.onload = () => {
            //console.log(ajax.responseText);
            reverseForm();
        }
        
        ajax.onerror = () => console.log('there is an error');

        ajax.send(`avatar=${img}&name=${name}`);
    }
}

function reverseForm() {
    itemInput.value = "";
    imageInput.value = "";
    submtiBtn.innerHTML = "Add Item";
    httpForm.removeEventListener("submit", editItemAPI);
    httpForm.addEventListener("submit", submitItem);
  
    getItemsAPI(showItems);
  }