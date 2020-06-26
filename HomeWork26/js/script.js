
(_=> {

    window.addEventListener('load', _=> {
    const authInfo = {
        login: 'admin',
        password: 'nimda'
    };

    function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
    
    const auth = function() {
        let form = this.closest ('.form'),
        inputLogin = form.querySelector('input[name="login"]').value,
        inputPass = form.querySelector('input[name="password"]').value;
        console.log(inputLogin, inputPass);

       if(inputLogin===authInfo.login && 
          inputPass===authInfo.password) { 
            document.cookie = 'auth= true';
            document.cookie = 'authLogin=' + inputLogin;
            window.location = '/app.html';
       }  else {
           alert('Пароль (логин) введен неверно');
    }
    };

    const logout = function() {
        if (!getCookie('auth') || !getCookie('authLogin')) return;

        document.cookie = 'auth=; max-age = -1';
        document.cookie = 'authLogin=; max-age = -1';
        
        if (!getCookie('auth')) window.location.reload(); 

    };

    if (window.location.pathname =='/app.html' && !getCookie('auth'))
     window.location = '/index.html';

    
    if (window.location.pathname =='/index.html' && getCookie('auth') === 'true') window.location = '/app.html';


    let buttonSignin =  document.querySelector('.form .signin');
        buttonLogout =  document.querySelector('.contacts .logout');

    if (buttonSignin) buttonSignin.addEventListener('click', auth);
    if (buttonLogout) buttonLogout.addEventListener('click', logout);


    let contactsData = [];

    const contactsUpdate = function() {
        let localContactsData = localStorage.getItem('contactsData');
              
        if (localContactsData) contactsData = JSON.parse(localContactsData);
                
        let contactsList = document.querySelector('.contacts_list ul');
        contactsList.innerHTML = '';
        contactsData.forEach(function(contact, id) { 
            
            let elemContact = document.createElement('li');

            elemContact.innerHTML = `
               <div class="id">${id + 1}</div>
               <div class="name">${contact.name}</div>
               <div class="phone">${contact.phone}</div>
               <button class="remove_btn">Remove</button>  
            `;

            contactsList.appendChild(elemContact);  
        });

    }; 
    
    const contactAdd = function() {
        let form = this.closest('.form_add'),
            inputName = form.querySelector('input[name="name"]'). value,
            inputPhone = form.querySelector('input[name="phone"]'). value;
       
            if (inputName.length == 0 || inputName.length == ' ' || inputPhone.length == 0 || inputPhone.length == ' ') return;

            let contact = {
                name: inputName,
                phone: inputPhone
            };
          
            contactsData.push(contact)
            localStorage.setItem('contactsData', JSON.stringify(contactsData));

            contactsUpdate();
            window.location.replace('http://127.0.0.1:5500/app.html');
            sessionStorage.removeItem('contactInputName');
            sessionStorage.removeItem('contactInputPhone');
    };

    const contactSave = function() {
        let form = this.closest('.form_add'),
            inputName = form.querySelector('input[name="name"]'). value,
            inputPhone = form.querySelector('input[name="phone"]'). value;
       
            if (inputName.length == 0 || inputName.length == ' ' || inputPhone.length == 0 || inputPhone.length == ' ') return;
        
        sessionStorage.setItem('contactInputName', inputName);
        sessionStorage.setItem('contactinputPhone', inputPhone);
 
    };

    let buttonAdd = document.querySelector('.form_add .add');
        buttonSave = document.querySelector('.form_add .save');
    
        if (buttonAdd) buttonAdd.addEventListener('click', contactAdd);
        if (buttonSave) buttonSave.addEventListener('click', contactSave);

        if (window.location.pathname =='/app.html') {
            contactsUpdate();

        let contactInputName = sessionStorage.getItem('contactInputName'),
            contactInputPhone = sessionStorage.getItem('contactInputPhone');

        if (contactInputName &&
            contactInputName.length > 0 &&
            contactInputPhone && contactInputPhone.length > 0) {
            let form = document.querySelector('.form_add'),
                inputName = form.querySelector('input[name="name"]'),
                inputPhone = form.querySelector('input[name="phone"]');

            inputName.value = contactInputName ;
            inputPhone.value = contactInputPhone;
        };
    };

        let buttonClear = document.querySelector('.clear');
            buttonClear.addEventListener('click', function () {
                localStorage.clear();
                window.location.replace('http://127.0.0.1:5500/app.html');    
                
        });
    
        let buttonRemove = document.querySelectorAll('.remove_btn');
            
            buttonRemove.forEach(function(element,i,){
                buttonRemove[i].addEventListener('click', function () {
                                
                    contactsData.splice(i,1);
                    localStorage.setItem('contactsData', JSON.stringify(contactsData));
                    window.location.replace('http://127.0.0.1:5500/app.html');                
                });
        });

    















        /*sessionStorage && localStorage */

        /*
            setItem()
            getItem()
            removeItem()
            clear()
            length
        */

        //window.sessionStorage.setItem('user','Bob');
        //window.localStorage.setItem('user', 'Alex');

    //window.sessionStorage.setItem('user2','PETER');
        //window.localStorage.setItem('user2', 'Bill');

        //console.log(window.localStorage.getItem('user'), window.localStorage.getItem('user2'));
        //console.log( window.sessionStorage.getItem('user2'));


    // window.localStorage.removeItem('user2');
        //window.sessionStorage.removeItem('user2');

    // window.localStorage.clear();
    // window.sessionStorage.clear();
        

    // window.sessionStorage.setItem('test','1');
    // window.sessionStorage.setItem('test2','2');
    
    
    // window.localStorage.setItem('test','1');
    // window.localStorage.setItem('test2','2');
    // window.localStorage.setItem('test3','3');

    // console.log(window.sessionStorage.length);
    // console.log(window.localStorage.length);


    // let keys = Object.keys(localStorage);
    // for(let key of keys) {
        //    console.log('${key}: ${localStorage.getItem(key)}');
    // }
    // console.log(sessionStorage);
        //
    // console.log(localStorage);
        


       //document.cookie = 'user=Alex';
       //document.cookie = 'login = user-Alex';

       //document.cookie = 'user=Bob';
       //document.cookie = 'login = user-Bob';

       //document.cookie = 'info=' + encodeURIComponent('Далеко-далеко за //словестными горами в стране');
        //console.log(decodeURIComponent//('%D0%94%D0%B0%D0%BB%D0%B5%D0%BA%D0%BE-%D0%B4%D0%B0%D0%BB%D0%B5%D0%BA%D0%B//E%20%D0%B7%D0%B0%20%D1%81%D0%BB%D0%BE%D0%B2%D0%B5%D1%81%D1%82%D0%BD%D1%8B%//D0%BC%D0%B8%20%D0%B3%D0%BE%D1%80%D0%B0%D0%BC%D0%B8%20%D0%B2%20%D1%81%D1%82//%//D1%80%D0%B0%D0%BD%D0%B5'));

        //document.cookie = 'user2=Peter; path=/news/post/post1';

        //document.cookie = 'user3=Mike; domain = .localhost';
        
        //let date = new Date(Date.now() + 20000);
        //date = date.toUTCString();


        //document.cookie = 'user4 = Bill; expires' + date;
        

        //document.cookie = 'user5 = Max; max-age=20';

        

        //document.cookie = 'user6 = Alex; secure';

        //console.log(document.cookie);



    });
 
}) ();