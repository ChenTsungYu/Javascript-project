(function () {
    const searchForm = document.getElementById('searchForm');
    const searchUser = document.getElementById('searchUser');
    const userList = document.getElementById('userList');
    const client_id = '4939dfcabd9dce260330';
    const client_secret = 'e1666adbed7542c3cb6b579df5c682c4ce01a81e';
    const url = 'https://api.github.com/users/';


    searchForm.addEventListener('submit', event => {
        event.preventDefault();

        const textValue = searchUser.value;

        if (textValue === "") {
            //console.log('empty');
            showFeedback('Plz enter the user name');
        } else {
            ajaxUser(textValue);
        }

    });

    function ajaxUser(userValue) {
        // userURL
        const userURL = `${url}${userValue}?client_id=${client_id}&client_secret=${client_secret}`;
        //  repo url

        fetch(userURL)
            .then(data => data.json()) // JSON解析
            .then(data =>  getUser(data))   // getUser(data.user) 
           // .then(data =>  console.log(data))   // getUser(data.user)
            .catch(e => console.log(e));
          
    }

    function showFeedback(text) {
        const feedback = document.querySelector('.feedback');
        feedback.classList.add('showItem');
        feedback.innerHTML = `<p>${text}</p>`;

        setTimeout(() => {
            feedback.classList.remove('showItem');
        }, 2000)

    }

    function getUser(user) {
        const {
            avatar_url: image,
            html_url: link,
            public_repos: repos,
            name,
            login,
            message
          } = user;
        if (message === "Not Found") {
            showFeedback(" No such user exists, plz enter anther one. ")
        } else {
            displayUser(image, link, repos, login);
            const searchUser = document.getElementById('searchUser');
            searchUser.value = "";

        }
    }

    function displayUser(image, link, repos, login) { 
       // console.log(image, link, repos, login);
       const userList = document.getElementById('github-users'); 
       const div = document.createElement('div');
       div.classList.add('row', 'single-user', 'my-3');
        div.innerHTML = `<div class=" col-sm-6 col-md-4 user-photo my-2">
        <img src="${image}" class="img-fluid" alt="">
       </div>
       <div class="col-sm-6 col-md-4 user-info text-capitalize my-2">
        <h6>name : <span>${name}</span></h6>
        <h6>blog : <a href="${link}" class="badge badge-primary">blog</a> </h6>
        <h6>github : <a href="#" class="badge badge-primary">link</a> </h6>
        <h6>public repos : <span class="badge badge-success">${repos}</span> </h6>
       </div>
       <div class=" col-sm-6 col-md-4 user-repos my-2">
        <button type="button" data-id=${login} id="getRepos" class="btn reposBtn text-capitalize mt-3">
         get repos
        </button>`;

        userList.appendChild(div);


     }

})()