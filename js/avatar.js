// Globalne

var parsovanAvatar = JSON.parse(localStorage.getItem('avatar'));

$(document).ready(function(){

    if(localStorage.getItem('imeCorvus')){

        $('#avatarName').html(localStorage.getItem('imeCorvus'));

    }

    $('.avatarCustomizeDiv').hide();
    
    $('.errorPar').hide();

    $('.successPar').hide();

    $('.errorAvatarPar').hide();

    $('#makeMyAvatar').on('click',praviAvatara);

    $('.imgRadio').click(function(){

        console.log(this.value);

    })

    $('#avatarButton').click(function(){

        $('.avatarCardHolder').css('display','block');

        $('.avatarCustomizeDiv').css('display','none');

    })

    $('#avatarCustomize').click(function(){

        $('.avatarCardHolder').css('display','none');

        $('.avatarCustomizeDiv').css('display','block');

    })

})

if(localStorage.getItem('avatar')) {

    console.log(parsovanAvatar)

    document.querySelector('.avatarPuppet').innerHTML = `<div class="avatarHead">

            <img src="images/${parsovanAvatar.head}.png" class="img-fluid avatarHeadPic" alt="Your Avatar head"/>

        </div>

        <div class="avatarBody">

            <img src="images/${parsovanAvatar.armor}.png" class="img-fluid avatarArmorPic" alt="Your Avatar armor"/>

        </div>


        <div class="leftArm avatarArm"></div>

        <div class="rightArm avatarArm"></div>

        <div class="leftLeg avatarLeg"></div>

        <div class="rightLeg avatarLeg"></div>

        <div class="avatarWeapon">

            <img src="images/${parsovanAvatar.weapon}.png" class="img-fluid avatarWeaponPic" alt="Your Avatar weapon"/>
            
        </div>

        <div class="avatarShield">

            <img src="images/${parsovanAvatar.shield}.png" class="img-fluid avatarShieldPic" alt="Your Avatar shield"/>

        </div>`;

}

else {

    document.querySelector('.avatarPuppet').innerHTML = `<div class="avatarHead">

    <img src="images/avatar2.png" class="img-fluid avatarHeadPic" alt="Your Avatar head"/>

</div>

<div class="avatarBody">

    <img src="images/armor1.png" class="img-fluid avatarArmorPic" alt="Your Avatar armor"/>

</div>


<div class="leftArm avatarArm"></div>

<div class="rightArm avatarArm"></div>

<div class="leftLeg avatarLeg"></div>

<div class="rightLeg avatarLeg"></div>

<div class="avatarWeapon">

    <img src="images/weapon1.png" class="img-fluid avatarWeaponPic" alt="Your Avatar weapon"/>
    
</div>

<div class="avatarShield">

    <img src="images/shield1.png" class="img-fluid avatarShieldPic" alt="Your Avatar shield"/>

</div>`;

}

var arms = document.getElementsByClassName('avatarArm');

var legs = document.getElementsByClassName('avatarLeg');

for(let i = 0 ; i < arms.length ; i++) {

    arms[i].style.backgroundColor = localStorage.getItem('bojaRuku');

}

for(let i = 0 ; i < legs.length ; i++) {

    legs[i].style.backgroundColor = localStorage.getItem('bojaNogu');

}


function praviAvatara(e){

    e.preventDefault();

    // $('.avatarCustomPic').css('background-color','transparent');

    // Niz gresaka

    var greske = [];

    // Provere radio buttona

    var checkHead = false;

    var checkArmor = false;

    var checkWeapon = false;

    var checkShield = false;

    // Node list svih grupa radio buttona

    var radioHeads = document.getElementsByName('headAvatar');

    var radioArmor = document.getElementsByName('armorAvatar');

    var radioWeapon = document.getElementsByName('weaponAvatar');

    var radioShield = document.getElementsByName('shieldAvatar');

    // Svi delovi tela

    var head, armor, weapon, shield;


    var bojaRuku = document.getElementById('armsColor').value;

    var bojaNogu = document.getElementById('legsColor').value;

    console.log(bojaRuku, bojaNogu);

    console.log(radioHeads);

    function provera(niz, idGreske, boolZaMenjanje, sacuvaj) {

        for(let i = 0 ; i < niz.length ; i++) {

            if(niz[i].checked) {
    
                boolZaMenjanje = true;

                console.log(niz[i].value)

                sacuvaj = niz[i].value;
    
            }
    
        }
    
        if(boolZaMenjanje){
    
            document.getElementById(idGreske).style.display = 'none';
    
        }

        else{

            document.getElementById(idGreske).style.display = 'block';

            greske.push('Greska');

        }

        return sacuvaj;

    }

    var proveraHeads = provera(radioHeads, 'headError', checkHead, head);

    var proveraArmor = provera(radioArmor, 'armorError', checkArmor, armor);

    var proveraWeapon = provera(radioWeapon, 'weaponError', checkWeapon, weapon);

    var proveraShield = provera(radioShield, 'shieldError', checkShield, shield);

    console.log(proveraHeads,proveraArmor,proveraWeapon, proveraShield)

    console.log(greske);

    if(greske.length == '0') {

        $('.successPar').show();

        $('.errorAvatarPar').hide();

        if(localStorage){

            var objAvatar = {

                'head' : proveraHeads,
            
                'armor' : proveraArmor,

                'weapon' : proveraWeapon,

                'shield' : proveraShield

            }

            localStorage.setItem('avatar',JSON.stringify(objAvatar));

            var parsovanAvatar = JSON.parse(localStorage.getItem('avatar'));

            document.querySelector('.avatarPuppet').innerHTML = `<div class="avatarHead">

            <img src="images/${parsovanAvatar.head}.png" class="img-fluid avatarHeadPic" alt="Your Avatar head"/>

        </div>

        <div class="avatarBody">

            <img src="images/${parsovanAvatar.armor}.png" class="img-fluid avatarArmorPic" alt="Your Avatar armor"/>

        </div>


        <div class="leftArm avatarArm"></div>

        <div class="rightArm avatarArm"></div>

        <div class="leftLeg avatarLeg"></div>

        <div class="rightLeg avatarLeg"></div>

        <div class="avatarWeapon">

            <img src="images/${parsovanAvatar.weapon}.png" class="img-fluid avatarWeaponPic" alt="Your Avatar weapon"/>
            
        </div>

        <div class="avatarShield">

            <img src="images/${parsovanAvatar.shield}.png" class="img-fluid avatarShieldPic" alt="Your Avatar shield"/>

        </div>`;

        localStorage.setItem('bojaRuku',bojaRuku);

        localStorage.setItem('bojaNogu',bojaNogu);

        for(let i = 0 ; i < arms.length ; i++) {

            arms[i].style.backgroundColor = localStorage.getItem('bojaRuku');
        
        }

        for(let i = 0 ; i < legs.length ; i++) {

            legs[i].style.backgroundColor = localStorage.getItem('bojaNogu');
        
        }

            console.log(parsovanAvatar)

            console.log(objAvatar)

        }

        else{

            alert('Local Storage is not supported in this version of your browser !');

        }

    }

    else{

        $('.successPar').hide();

        $('.errorAvatarPar').show();

    }

}