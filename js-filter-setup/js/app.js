window.onload = function () {
    const filterBtn = document.querySelectorAll('.filter-btn');
    // console.log(filterBtn);

    filterBtn.forEach(function (btn) {
        btn.addEventListener('click', function (ev) {
            ev.preventDefault();
            // 獲取對應的 data-filter屬性值
            const value = ev.target.dataset.filter;
            console.log(value);

            const items = document.querySelectorAll('.store-item');
            console.log(items);
            items.forEach(function (item) {
                //   所有種類  all為特例: 需輸出所有的圖片
                if (value == 'all') {
                    item.style.display = 'block';
                } else {
                    // 針對單一種類處理               
                    if (item.classList.contains(value)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            })
        })
    })
    const search = document.getElementById('search-item')
    search.addEventListener("keyup", function () {
        // 監聽鍵盤事件
        let value = search.value.toLowerCase().trim();
        // trim()作為刪除空格之用
        console.log(value);
        const search_items = document.querySelectorAll('.store-item');
        search_items.forEach(function (item) {
            let type = item.dataset.item;
            //console.log(type);
           // console.log(typeof type);  // string


           // 此法有問題  只要出現相關字的(不管字首或字尾)都會被讀取到
           /* if (type.includes(value)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }*/
            
            // solution 
            let length = value.length;
            console.log(length);
            let match = type.slice(0 , length);
            console.log(match);
            if (value === match) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        })
    })
}
