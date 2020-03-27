/*
<i class="far fa-circle"></i>
<i class="fas fa-times"></i>
*/


$(document).ready(function(){

    var pobeda = true;

    $('.moveMe').hide();


    var nizId = ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9'];

    function init() {

        $('.box').html('');
        $('#statusPoraz').css('display','none');
        $('#statusPobeda').css('display','none');
        nizId = ['box1', 'box2', 'box3', 'box4', 'box5', 'box6', 'box7', 'box8', 'box9'];
        pobeda = true;
        $boxoviInit = $('.box');
        $('#statusTie').css('display','none');

        for(let i = 0 ; i < $boxoviInit.length ; i++) {

            $($boxoviInit[i]).removeClass('iks');
            $($boxoviInit[i]).removeClass('oks');

        }

    }

    $('.box').on('click',function(){

        if(pobeda == true) {

        var box1 = $('#box1');

        var box2 = $('#box2');

        var box3 = $('#box3');

        var box4 = $('#box4');

        var box5 = $('#box5');

        var box6 = $('#box6');

        var box7 = $('#box7');

        var box8 = $('#box8');

        var box9 = $('#box9');


        /* Deo za igraca */

        if($(this).hasClass('oks')){

            return;

        }

        $(this).html('<i class="fas fa-times"></i>');

        $(this).addClass('iks');

        var id = $(this).attr('id');

        function nadjiMe(box) {

            return box === id;

        }

        var index1 = nizId.findIndex(nadjiMe);

        var noviNiz1 = nizId.slice(0,index1).concat(nizId.slice(index1 + 1, nizId.length));

        if(index1 == -1) {

            return;

        }

        nizId = noviNiz1;

        console.log(nizId)
        
        console.log(noviNiz1)

        console.log(index1)

        console.log(id)


        /* Deo za komp */


        var oks = Math.floor(Math.random() * nizId.length);

        var poljeOks = nizId[oks];

        console.log(poljeOks)

        var $boxovi = $('.box');

        function nadjiMe1(box) {

            return box === poljeOks;

        }

        var index2 = nizId.findIndex(nadjiMe1);

        var noviNiz2 = nizId.slice(0,index2).concat(nizId.slice(index2 + 1, nizId.length));

        nizId = noviNiz2;

        console.log(nizId)

        console.log(noviNiz2)

        var brojac = 0;

        for(let i = 0; i < $boxovi.length; i++) {


            if($boxovi[i].getAttribute('id') == poljeOks){

                $($boxovi[i]).html('<i class="far fa-circle"></i>');
                $($boxovi[i]).addClass('oks');

            }

            if($($boxovi[i]).hasClass('iks') || $($boxovi[i]).hasClass('oks')) {

                brojac++;

            }

        }


        console.log(oks)


        function win() {

            $('#statusPobeda').css('display','block');
            $('#statusPoraz').css('display','none');
            
        }


        function lose() {

            $('#statusPoraz').css('display','block');
            $('#statusPobeda').css('display','none');

        }



        /* Provere za pobedu */

        /* Box 1 kombinacije */


        if(box1.hasClass('iks') && box2.hasClass('iks') && box3.hasClass('iks')){

            pobeda = false;
            
            win();

        }

        if(box1.hasClass('iks') && box4.hasClass('iks') && box7.hasClass('iks')){

            pobeda = false;

            win();

        }

        if(box1.hasClass('iks') && box5.hasClass('iks') && box9.hasClass('iks')){

            pobeda = false;

            win();

        }



        if(box1.hasClass('oks') && box2.hasClass('oks') && box3.hasClass('oks')){

            pobeda = false;

            lose();

        }

        if(box1.hasClass('oks') && box4.hasClass('oks') && box7.hasClass('oks')){

            pobeda = false;

            lose();

        }

        if(box1.hasClass('oks') && box5.hasClass('oks') && box9.hasClass('oks')){

            pobeda = false;

            lose();

        }



        /* Box 2 kombinacije */

        
        if(box2.hasClass('iks') && box5.hasClass('iks') && box8.hasClass('iks')){

            pobeda = false;

            win();

        }

        if(box2.hasClass('oks') && box5.hasClass('oks') && box8.hasClass('oks')){

            pobeda = false;

            lose();

        }


        /* Box 3 kombinacije */

        
        if(box3.hasClass('iks') && box5.hasClass('iks') && box7.hasClass('iks')){

            pobeda = false;

            win();

        }

        if(box3.hasClass('iks') && box6.hasClass('iks') && box9.hasClass('iks')){

            pobeda = false;

            win();

        }



        if(box3.hasClass('oks') && box5.hasClass('oks') && box7.hasClass('oks')){

            pobeda = false;

            lose();

        }

        if(box3.hasClass('oks') && box6.hasClass('oks') && box9.hasClass('oks')){

            pobeda = false;

            lose();

        }



        /* Box 4 kombinacije */


        if(box4.hasClass('iks') && box5.hasClass('iks') && box6.hasClass('iks')){

            pobeda = false;

            win();

        }

        if(box4.hasClass('oks') && box5.hasClass('oks') && box6.hasClass('oks')){

            pobeda = false;

            lose();

        }



        /* Box 7 kombinacije */

        
        if(box7.hasClass('iks') && box8.hasClass('iks') && box9.hasClass('iks')){

            pobeda = false;

            win();

        }

        if(box7.hasClass('oks') && box8.hasClass('oks') && box9.hasClass('oks')){

            pobeda = false;

            lose();

        }


        }

        console.log()
        

        if(pobeda == true) {

            if(brojac == 9) {


                $('#statusTie').css('display','block');
    
    
            pobeda = false;
    
        }

        }

        
        
        

    })



    $('#playAgain').on('click',function(){

        init();

    })


    /* Note za mene kad se vratim sa slikanja : U for petlji kad komp igra isto treba da sklonis taj elements iz niza koji je izabran da ne bi mogao komp da stane dva puta na isto polje ! */


})
