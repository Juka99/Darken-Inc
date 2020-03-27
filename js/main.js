window.onload = function(){

    // Modal

    $('#zatvoriModal').click(function(){

        $('.cart').removeClass('cart1');

    })

    $('.proceedButton').click(function(){

        $('.cart').removeClass('cart1');

    })

    // Navigacija

    $('#burgerActivate').click(function(){

        $('.sideNav').toggleClass('sideNav1');

    })

    // Prikazi cart ikonicu

    if(localStorage.getItem('igraCart')){

        $('#prikaziCart').addClass('prikazanCart');

    }

    else{

        $('#prikaziCart').removeClass('prikazanCart');

    }

    $('#noProductsPar').hide();

    $('.drzacPopupa').hide();

    $('.alreadyThereBlock').hide();

    $('.addedBlock').hide();

    $('.addedNameBlock').hide();

    $('.nameNotCorrect').hide();

    // Remove sortValue

    localStorage.removeItem('sortValue');

    localStorage.setItem('checksValues','start');

    // Ispisi odmah igre u cart ako ih ima u local storage-u

    if(JSON.parse(localStorage.getItem('igraCart'))){

        var ispis = '';

        var postojeceIgre = JSON.parse(localStorage.getItem('igraCart'));

        for(let el of postojeceIgre){

            ispis += `<tr>

            <td><img src="${el.slika.putanja}" class='img-fluid slikaCart' alt="${el.slika.alt}"/></td>
            <td>${el.naziv}</td>
            <td>$${el.novaCena}</td>
            <td class='quant'>${el.quantity}</td>
            <td><button class='addMeMore' data-addMore='${el.id}'>Add more</button></td>
            <td><button class='deleteMeMore' data-delMore='${el.id}'>Delete</button></td>

            </tr>`;

            /*if(vrednostIgre == el.id){

                return;

            }*/

        }

        document.querySelector('.puniIgricama').innerHTML = ispis;

    }

    // Prvi put koristim event delegation

    $(document).on('click','.addMeMore',dodajIgru);

    $(document).on('click','.deleteMeMore',brisiIgru);

    $(document).on('click','.orderGame',cart);

    // Ajax za meni

    $.ajax({

        url : "assets/menu.json",

        method : "GET",

        type : "json",

        success : function(data) {

            ispisiMeni(data);

            // console.log(data);

        },

        error : function(xhr, error, status) {

            console.log(status);

        }

    })

    // Ajax za 3 slike

    $.ajax({

        url : "assets/threePics.json",

        method : "GET",

        type : "json",

        success : function(data) {

            ispisiSlike(data);

            //console.log(data);

        },

        error : function(xhr, error, status) {

            console.log(status);

        }

    })

    // Ajax za shop

    $.ajax({

        url : "assets/products.json",

        method : "GET",

        type : "json",

        success : function(data) {

            ispisiProizvode(data);

            console.log(data);

        },

        error : function(xhr, error, status) {

            console.log(status);

        }

    })

    // Ajax za checkboxove

    $.ajax({

        url : "assets/check.json",

        method : "GET",

        type : "json",

        success : function(data) {

            ispisiChecks(data);

            console.log(data);

        },

        error : function(xhr, error, status) {

            console.log(status);

        }

    })

    // Search

    $('#trazi').keyup(filtrirajPostove);

    // Dinamicki h2 tag

    ispisiH2Tag();

    // Iks oks

    papirKamenMakazeBlokovi();

    papirKamenMakaze();

    // Go top aktivacija

    $('.goTop').on('click',function() {

        $('html').animate({scrollTop: 0}, 250);

    });

    // Animacije tokom skrolovanja

    $(window).scroll(function(){

        const scroll = $(this).scrollTop();

        if(scroll > 50) {

            $('#navigacija').css('background','#141414');
            $('.logo').css({width: '120px'})

        } else {
            
            $('#navigacija').css('background','transparent');
            $('.logo').css({width: '150px'})

        }

        if(scroll > 150) {

            $('.goTop').addClass('goTop1');

        } else $('.goTop').removeClass('goTop1');

        // console.log(scroll)

    })

}

// Funkcija za ispis menija

function ispisiMeni(nizObjekata) {

    let lista = `<ul>`;

    for(let el of nizObjekata) {

        lista += `<li><a href="${el.href}" class='closeSideNav'>${el.text}</a></li>`;

    }

    lista += '</ul>';

    let meniji = document.getElementsByClassName('right');

    for(let i = 0 ; i < meniji.length ; i++) {

        meniji[i].innerHTML += lista;

    }

    $('.closeSideNav').click(function(e){

        $('.sideNav').removeClass('sideNav1');

    })

}

// Funckija za ispis slika

function ispisiSlike(nizObjekata) {

    for(let el of nizObjekata) {

        document.querySelector('.transpSlike').innerHTML += 
        `<div class='col-lg-4 col-md-6 brainBlokovi'>
            <div class='blokSlikeHolder'><img src='${el.slika.putanja}' class='img-fluid' alt='${el.slika.alt}'/></div>
            <h3 class='blokoviNaslov'>${el.naslov}</h3>
        </div>`;

    }

}

// Iks oks funkcije

function papirKamenMakazeBlokovi() {

    var iksOksNiz = [['<i class="fas fa-hand-rock rock"></i>', 'kamen'], ['<i class="fas fa-hand-paper paper"></i>','papir'], ['<i class="fas fa-hand-scissors scissors"></i>','makaze']];

    for(var i = 0 ; i < iksOksNiz.length ; i++) {

        document.querySelector('.signs').innerHTML += `<div class='col-lg-4 col-md-4 col-sm-4 col-xs-4 holdSign'><a href="#!" class="${iksOksNiz[i][1]}">${iksOksNiz[i][0]}</a></div>`;

    }

}

function papirKamenMakaze(){

    var nizZnakova = ['p','k','m'];

    var status = document.querySelector('.status');

    var kamen = document.querySelector('.kamen');

    var papir = document.querySelector('.papir');

    var makaze = document.querySelector('.makaze');

    var mojZnak = document.getElementById('youSign');

    var aiZnak = document.getElementById('aiSign');

    let mojScore = document.getElementById('player');

    let aiScore = document.getElementById('ai');

    let scoreMe = 0;

    let scoreAi = 0;

    mojScore.innerHTML = 0;

    aiScore.innerHTML = 0;

    function provera() {

        if(scoreMe == 10) {

            status.classList.add('winnerYou');

            status.classList.remove('winnerAI');

            status.innerHTML = 'You win !';

            scoreMe = 0;

            scoreAi = 0;

            mojScore.innerHTML = '0';

            aiScore.innerHTML = '0';

        }

        if(scoreAi == 10) {

            status.classList.add('winnerAI');

            status.classList.remove('winnerYou');

            status.innerHTML = 'Computer wins !';

            scoreMe = 0;

            scoreAi = 0;

            mojScore.innerHTML = '0';

            aiScore.innerHTML = '0';

        }

    }

    // Kamen

    kamen.addEventListener('click', function() {

        var randZnak = Math.floor(Math.random() * nizZnakova.length);
        
        mojZnak.innerHTML = 'Rock';

        if(nizZnakova[randZnak] == 'p') {

            scoreAi++;

            aiScore.innerHTML = scoreAi;

            aiZnak.innerHTML = 'Paper';

            status.innerHTML = ``;

        }

        if(nizZnakova[randZnak] == 'k') {

            status.innerHTML = `It's a draw !`

            aiZnak.innerHTML = 'Rock';

        }

        if(nizZnakova[randZnak] == 'm') {

            scoreMe++;

            mojScore.innerHTML = scoreMe;

            aiZnak.innerHTML = 'Scissors'

            status.innerHTML = ``;

        }

        provera();

    });

    // Papir

    papir.addEventListener('click', function() {

        var randZnak = Math.floor(Math.random() * nizZnakova.length);
        
        mojZnak.innerHTML = 'Paper';

        if(nizZnakova[randZnak] == 'p') {

            status.innerHTML = `It's a draw !`

            aiZnak.innerHTML = 'Paper';

        }

        if(nizZnakova[randZnak] == 'k') {

            scoreMe++;

            mojScore.innerHTML = scoreMe;

            aiZnak.innerHTML = 'Rock'

            status.innerHTML = ``;

        }

        if(nizZnakova[randZnak] == 'm') {

            scoreAi++;

            aiScore.innerHTML = scoreAi;

            aiZnak.innerHTML = 'Scissors';

            status.innerHTML = ``;

        }

        provera();

    });

    // Makaze

    makaze.addEventListener('click', function() {

        var randZnak = Math.floor(Math.random() * nizZnakova.length);

        console.log(randZnak);

        console.log(scoreMe)
        
        mojZnak.innerHTML = 'Scissors';

        if(nizZnakova[randZnak] == 'p') {

            scoreMe++;

            mojScore.innerHTML = scoreMe;

            aiZnak.innerHTML = 'Paper'

            status.innerHTML = ``;

        }

        if(nizZnakova[randZnak] == 'k') {

            scoreAi++;

            aiScore.innerHTML = scoreAi;

            aiZnak.innerHTML = 'Rock';

            status.innerHTML = ``;

        }

        if(nizZnakova[randZnak] == 'm') {

            status.innerHTML = `It's a draw !`

            aiZnak.innerHTML = 'Scissors';

        }

        provera();

    });


}

// Dinamicki h2 tag

function ispisiH2Tag(){

    let nizNaslova = ['Life is a game.','The games you always wanted.','Ready ? Start. Go !'];

    let randNaslov = Math.floor(Math.random() * nizNaslova.length);

    document.getElementById('fillMe').innerHTML = nizNaslova[randNaslov];

}

// Prikazi Logo

let logo = document.getElementsByClassName('left');

for(let i = 0 ; i < logo.length ; i++) {

    logo[i].innerHTML = `<a href="#pocetak" class='zatvoriSideNavLogo'><img src="images/logo.png" class="img-fluid logo" alt="Darken Inc. Logo"/></a>`;

}

$('.zatvoriSideNavLogo').click(function(){

    $('.sideNav').removeClass('sideNav1');

})

// Prikazivanje menija samo kad se skroluje ka gore

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {

  var currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {

    document.getElementById("navigacija").style.top = "0";

  } else {

    document.getElementById("navigacija").style.top = "-350px";

  }

  prevScrollpos = currentScrollPos;

}

function ispisiProizvode(data){

    var ispis = '';

    for(let el of data){

            ispis += `<div class="col-lg-4 col-md-6 colShop">

            <div class="product">

                <div class="productPicture">

                    <img src="${el.slika.putanja}" alt="${el.slika.alt}" class='img-fluid productPictureImg'/>

                    <h3 class='nameOfTheGame'>${el.naziv}</h3>

                    <div class="cenaIgre">
                    
                        <p class='novaCena'>Price : $${el.novaCena}</p>`;

                        if(el.imaStaruCenu){

                            ispis += `<p class='staraCena'><del>$${el.staraCena}</del></p>`;

                        }
                   

                    ispis += `</div>

                    <p class='categoryShop'>Category : <span class='kateg'>${el.category.katNaziv}</span></p>

                    <a href="#!" class='orderGame' data-order='${el.id}'>Order now !</a>

                </div>

            </div>

        </div>`;

    }

    document.querySelector('.rowShop').innerHTML = ispis;

}


function cart(){

    var nizIgara;

    if(!localStorage.getItem('igraCart')){

        nizIgara = [];

    }

    else{

        nizIgara = JSON.parse(localStorage.getItem('igraCart')) || localStorage.getItem('igraCart');

    }

    console.log(nizIgara);

    var vrednostIgre = this.dataset.order;

    var i = 1;

    $.ajax({

        url : "assets/products.json",

        method : "GET",

        type : "json",

        success : function(data) {

            if(localStorage.getItem('igraCart')){

            for(let el of nizIgara){

                if(vrednostIgre == el.id){

                    $('.drzacPopupa').show();

                    $('.alreadyThereBlock').fadeIn();

                    $('.alreadyThereBlock').delay(1700).fadeOut();

                    setTimeout(function(){

                        $('.drzacPopupa').fadeOut();

                    }, 2500);

                    return;

                }

            }   

            }

            var ispis = '';

            for(let el of data) {

                if(vrednostIgre == el.id){

                    nizIgara.push(el);

                    localStorage.setItem('igraCart',JSON.stringify(nizIgara));

                    nizIgara = JSON.parse(localStorage.getItem('igraCart'));

                    $('#prikaziCart').addClass('prikazanCart');

                    $('.drzacPopupa').show();

                    $('.addedBlock').fadeIn();

                    $('.addedBlock').delay(1700).fadeOut();

                    setTimeout(function(){

                        $('.drzacPopupa').hide();

                    }, 2500);

                }

            }

            for(let el of nizIgara){

                ispis += `<tr>

                <td><img src="${el.slika.putanja}" class='img-fluid slikaCart' alt="${el.slika.alt}"/></td>
                <td>${el.naziv}</td>
                <td>$${el.novaCena}</td>
                <td class='quant'>${el.quantity}</td>
                <td><button class='addMeMore' data-addMore='${el.id}'>Add more</button></td>
                <td><button class='deleteMeMore' data-delMore='${el.id}'>Delete</button></td>

                </tr>`;

                /*if(vrednostIgre == el.id){

                    return;

                }*/

            }

            document.querySelector('.puniIgricama').innerHTML = ispis;

            //$('.addMeMore').on('click', dodajIgru);

        },

        error : function(xhr, error, status) {

            console.log(status);

        }

    })

}


// Brisem local storage za cart

$('.resetLocalGames').click(function(){

    $('.cart').removeClass('cart1');

    localStorage.removeItem('igraCart');

    $('#prikaziCart').removeClass('prikazanCart');

    //document.querySelector('.modalBody table').innerHTML = '';

})

function dodajIgru(){

    var vrednost = this.dataset.addmore;

    var ispis = '';

    var parsiranNizObjekataIgre = JSON.parse(localStorage.getItem('igraCart'));

    console.log(parsiranNizObjekataIgre);

    for(let el of parsiranNizObjekataIgre){

        if(vrednost == el.id){

            el.quantity++;

            localStorage.setItem('igraCart', JSON.stringify(parsiranNizObjekataIgre));

            console.log(JSON.parse(localStorage.getItem('igraCart')));

        }

    }

    for(let elem of JSON.parse(localStorage.getItem('igraCart'))){

                ispis += `<tr>

                <td><img src="${elem.slika.putanja}" class='img-fluid slikaCart' alt="${elem.slika.alt}"/></td>
                <td>${elem.naziv}</td>
                <td>$${elem.novaCena * elem.quantity}</td>
                <td class='quant'>${elem.quantity}</td>
                <td><button class='addMeMore' data-addMore='${elem.id}'>Add more</button></td>
                <td><button class='deleteMeMore' data-delMore='${elem.id}'>Delete</button></td>
    
                </tr>`;

            } 

         document.querySelector('.puniIgricama').innerHTML = ispis;

        console.log(parsiranNizObjekataIgre);

        console.log(localStorage.getItem('igraCart'))

}

function brisiIgru(){

    var vrednost = this.dataset.delmore;

    var nizIgrica = JSON.parse(localStorage.getItem('igraCart'));

    var ispis = '';

    for(let el of nizIgrica){

        if(vrednost == el.id){

            if(el.quantity > 1){

                el.quantity--;

                localStorage.setItem('igraCart', JSON.stringify(nizIgrica));

                console.log(JSON.parse(localStorage.getItem('igraCart')))

                for(let elem of nizIgrica){

                    ispis += `<tr>

                    <td><img src="${elem.slika.putanja}" class='img-fluid slikaCart' alt="${elem.slika.alt}"/></td>
                    <td>${elem.naziv}</td>
                    <td>$${elem.novaCena * elem.quantity}</td>
                    <td class='quant'>${elem.quantity}</td>
                    <td><button class='addMeMore' data-addMore='${elem.id}'>Add more</button></td>
                    <td><button class='deleteMeMore' data-delMore='${elem.id}'>Delete</button></td>
        
                    </tr>`;

                }

                document.querySelector('.puniIgricama').innerHTML = ispis;

            }

            else{

                const indexIgre = nizIgrica.indexOf(el);

                console.log(indexIgre);

                var brisi = nizIgrica.splice(indexIgre,1);

                console.log(brisi)

                console.log(nizIgrica);

                localStorage.setItem('igraCart',JSON.stringify(nizIgrica));

                if(nizIgrica.length == 0){

                    $('#prikaziCart').removeClass('prikazanCart');

                    $('.cart').removeClass('cart1');

                    localStorage.removeItem('igraCart');

                    $('#noProductsPar').show();
            
                }

                console.log(nizIgrica);

                $(this).parent().parent().remove();

                if(JSON.parse(localStorage.getItem('igraCart')).length == 0){

                    document.querySelector('.modalBody table thead').innerHTML = '';

                    $('#noProductsPar').show();

                }

            }

        }

    }

}

function ispisiChecks(data){

    var ispis = '';

    for(let el of data){

        ispis += `<li><input type="checkbox" data-idKat='${el.idKat}' class='checkShop' id="${el.idCheck}" value="${el.value}"><label for="${el.idCheck}">${el.labelNaziv}</label></li>`

    }

    document.querySelector('.checksHolder').innerHTML = ispis;

    $('.checkShop').change(function(){

        $('#trazi').val('');

        var nizCheckovaValues = [];

        $(this).toggleClass("check");

        var checksNumber = document.getElementsByClassName('checkShop');

        console.log(checksNumber)

        for(let i = 0 ; i < checksNumber.length ; i++) {

            if(checksNumber[i].checked){

                nizCheckovaValues.push(checksNumber[i].dataset.idkat);

            }

        }

        if(localStorage){

            localStorage.setItem('checksValues',JSON.stringify(nizCheckovaValues));

        }

        console.log(nizCheckovaValues)
    
        proveriChecksLocal();
    
        console.log($(this).val())
    
    })


}

// Sortiranje resavanje

$('#birajDarkenDrop').change(function(){

    localStorage.setItem('sortValue',$(this).val());

    proveriChecksLocal();

})

function filtrirajPostove(){

    const unosKorisnika = this.value;

    console.log(unosKorisnika);

    $('.checkShop').prop('checked',false);

    $("#birajDarkenDrop").val($("#birajDarkenDrop option:first").val());

    localStorage.setItem('checksValues','start');

    $.ajax({
        url: 'assets/products.json',
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          const filtriraniPostovi = data.filter(el => {
            if (el.naziv.toLowerCase().indexOf(unosKorisnika.toLowerCase()) !== -1) {
              return true;
            }
          });
          ispisiProizvode(filtriraniPostovi);
        },
        error: function (err) {
          console.error(err);
        }
      });

}

function proveriChecksLocal(){

    if(localStorage.getItem('checksValues') != 'start'){

        var nizValues = JSON.parse(localStorage.getItem('checksValues'));

    }

    else{

        nizValues = localStorage.getItem('checksValues');

    }

    console.log(localStorage.getItem('checksValues'))

    var sortValue = localStorage.getItem('sortValue');

    //console.log(sortValue);

    var puniNizKateg = [];

    $.ajax({

        url : "assets/products.json",

        method : "GET",

        type : "json",

        success : function(data) {

            if(localStorage){

                if(nizValues != 'start'){

                    console.log('leroy')
        
                    for(let el of nizValues){

                        console.log(el);

                        for(let element of data){

                            console.log(element.category.idKat)

                            if(el == element.category.idKat){

                                puniNizKateg.push(element);

                            }

                        }
                        

                        console.log(puniNizKateg);
        
                    }

                    if(sortValue == 'opada'){

                        puniNizKateg.sort((a,b) => {

                            if(a.novaCena > b.novaCena){

                                return -1;

                            }

                            else if(a.novaCena < b.novaCena){

                                return 1;

                            }

                            else return 0;

                        })

                    }

                    if(sortValue == 'raste'){

                        puniNizKateg.sort((a,b) => {

                            if(a.novaCena > b.novaCena){

                                return 1;

                            }

                            else if(a.novaCena < b.novaCena){

                                return -1;

                            }

                            else return 0;

                        })

                    }

                    if(sortValue == 'a_z'){

                        puniNizKateg.sort((a,b) => {

                            if(a.naziv > b.naziv){

                                return 1;

                            }

                            else if(a.naziv < b.naziv){

                                return -1;

                            }

                            else return 0;

                        })

                    }

                    if(sortValue == 'z_a'){

                        puniNizKateg.sort((a,b) => {

                            if(a.naziv > b.naziv){

                                return -1;

                            }

                            else if(a.naziv < b.naziv){

                                return 1;

                            }

                            else return 0;

                        })

                    }

                    if($('#trazi').val() == ''){

                        ispisiProizvode(puniNizKateg);
                    
                    }

                    console.log(puniNizKateg);

                }

                else{

                    if(sortValue == '0'){

                        ispisiProizvode(data);

                    }

                    if(sortValue == 'opada'){

                        data.sort((a,b) => {

                            if(a.novaCena > b.novaCena){

                                return -1;

                            }

                            else if(a.novaCena < b.novaCena){

                                return 1;

                            }

                            else return 0;

                        })

                    }

                    if(sortValue == 'raste'){

                        data.sort((a,b) => {

                            if(a.novaCena > b.novaCena){

                                return 1;

                            }

                            else if(a.novaCena < b.novaCena){

                                return -1;

                            }

                            else return 0;

                        })

                    }

                    if(sortValue == 'a_z'){

                        data.sort((a,b) => {

                            if(a.naziv > b.naziv){

                                return 1;

                            }

                            else if(a.naziv < b.naziv){

                                return -1;

                            }

                            else return 0;

                        })

                    }

                    if(sortValue == 'z_a'){

                        data.sort((a,b) => {

                            if(a.naziv > b.naziv){

                                return -1;

                            }

                            else if(a.naziv < b.naziv){

                                return 1;

                            }

                            else return 0;

                        })

                    }

                    ispisiProizvode(data);

                }
        
            }

            if(nizValues.length == 0){

                if(sortValue == '0'){

                    ispisiProizvode(data);

                }

                if(sortValue == 'opada'){

                    data.sort((a,b) => {

                        if(a.novaCena > b.novaCena){

                            return -1;

                        }

                        else if(a.novaCena < b.novaCena){

                            return 1;

                        }

                        else return 0;

                    })

                }

                if(sortValue == 'raste'){

                    data.sort((a,b) => {

                        if(a.novaCena > b.novaCena){

                            return 1;

                        }

                        else if(a.novaCena < b.novaCena){

                            return -1;

                        }

                        else return 0;

                    })

                }

                if(sortValue == 'a_z'){

                    data.sort((a,b) => {

                        if(a.naziv > b.naziv){

                            return 1;

                        }

                        else if(a.naziv < b.naziv){

                            return -1;

                        }

                        else return 0;

                    })

                }

                if(sortValue == 'z_a'){

                    data.sort((a,b) => {

                        if(a.naziv > b.naziv){

                            return -1;

                        }

                        else if(a.naziv < b.naziv){

                            return 1;

                        }

                        else return 0;

                    })

                }

                ispisiProizvode(data);

                return;

            }

        },

        error : function(xhr, error, status) {

            console.log(status);

        }

    })

}



// Prikazi u cartu iteme iz trenutnog niza local storage-a

$('#prikaziCart').click(function(){

    $('.cart').addClass('cart1');

    if(!localStorage.getItem('igraCart')){

        document.querySelector('.modalBody table tbody').innerHTML = '';

    }

    if(JSON.parse(localStorage.getItem('igraCart'))){

        var trenutni = JSON.parse(localStorage.getItem('igraCart'));

        console.log(trenutni);

        var ispis = '';
        
        for(let el of trenutni){

            ispis += `<tr>

            <td><img src="${el.slika.putanja}" class='img-fluid slikaCart' alt="${el.slika.alt}"/></td>
            <td>${el.naziv}</td>
            <td>$${el.novaCena}</td>
            <td class='quant'>${el.quantity}</td>
            <td><button class='addMeMore' data-addMore='${el.id}'>Add more</button></td>
            <td><button class='deleteMeMore' data-delMore='${el.id}'>Delete</button></td>

            </tr>`;

            /*if(vrednostIgre == el.id){

                return;

            }*/

        }

        document.querySelector('.puniIgricama').innerHTML = ispis;

        $('#noProductsPar').hide();

    }

    if(!JSON.parse(localStorage.getItem('igraCart')) || JSON.parse(localStorage.getItem('igraCart')).length == 0){

        document.querySelector('.modalBody table thead').innerHTML = '';

        $('#noProductsPar').show();

    }

})
