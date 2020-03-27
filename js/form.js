$(document).ready(function(){

    $('.errorForm').hide();

    $('.uspehPar').hide();

    $('#posaljiPodatke').click(proveriFormu);

    $('#tema').change(drop);

})

function drop(){

    var topic = this.value;

    if(topic != '0'){

        document.getElementById('topicError').style.display = 'none';

    }

    else{

        document.querySelector('.uspehPar').style.display = 'none';

        document.getElementById('topicError').style.display = 'block';

        return false;
    
    }

}

function proveriFormu(e){

    e.preventDefault();

    var greske = [];
    
    var imePrezime = document.getElementById('imeIprezime');

    var mail = document.getElementById('mail');

    var topic = document.getElementById('tema').value;

    var message = document.getElementById('area');

    var regexImePrezime = /^[A-zŠĐŽĆČ][a-zšđžćč]+\s[A-zŠĐŽĆČ][a-zšđžćč]+(\s[A-zŠĐŽĆČ][a-zšđžćč]+){0,2}$/;

    var regexMail = /^[a-z\/\.\-\_\d]+\@[a-z]+(\.[a-z]+){1,2}$/;

    var regexMessage = /^[A-zšđžćčŠĐŽĆČ\d\.\,\s\!\?\d\n]+$/;

    function regexTester(reg, polje, idGreske){

        if(reg.test(polje.value) || reg.test(polje.value.toLowerCase())){

            document.getElementById(idGreske).style.display = 'none';

        }

        else{

            greske.push('Lose ime');

            document.getElementById(idGreske).style.display = 'block';

        }

    }


    regexTester(regexImePrezime, imePrezime, 'fullNameError');

    regexTester(regexMail, mail, 'emailError');

    regexTester(regexMessage, message, 'messageError');

    if(topic == '0'){

        greske.push('Niste izabrali topic');

        document.getElementById('topicError').style.display = 'block';

    }

    else{

        document.getElementById('topicError').style.display = 'none';

    }

    console.log(greske)

    if(greske.length == 0){

        document.querySelector('.uspehPar').style.display = 'block';

        return true;

    }
    
    else{

        document.querySelector('.uspehPar').style.display = 'none';

        return false;

    }

}