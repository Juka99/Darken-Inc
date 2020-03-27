const btn = document.querySelector(`.talk`);
const content = document.querySelector(`.content`);

$('.addedNameBlock').hide();

$('.nameNotCorrect').hide();

let greetings,exuse,wow,joke,another,strong = [];

var imee;

$(`#sacuvajImeCorvus`).on(`click`,function(){

    let regIme = /^[A-zŠĐŽĆČšđžćč][a-zšđžćč]{2,20}$/;

    let imeZaCorvusa = document.getElementById(`imeCorvus`).value;

    document.getElementById(`imeCorvus`).value = '';

    if(regIme.test(imeZaCorvusa)){

        if(localStorage){

            localStorage.setItem(`imeCorvus`,imeZaCorvusa);

        }

        $('.drzacPopupa').show();

                    $('.addedNameBlock').fadeIn();

                    $('.addedNameBlock').delay(1700).fadeOut();

                    setTimeout(function(){

                        $('.drzacPopupa').hide();

                    }, 2500);

        imee = localStorage.getItem(`imeCorvus`);

        $('#avatarName').html(localStorage.getItem('imeCorvus'));

        console.log(imee)

    }

    else{

        $('.drzacPopupa').show();

                    $('.nameNotCorrect').fadeIn();

                    $('.nameNotCorrect').delay(1700).fadeOut();

                    setTimeout(function(){

                        $('.drzacPopupa').hide();

                    }, 2500);

    }

})

console.log(imee);


const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function(){
    console.log(`Corvus je spreman !`);
};

recognition.onresult = function(event){
    const current = event.resultIndex;

    const transcript = event.results[current][0].transcript;
    content.textContent = transcript;

    readOutLoud(transcript);
};

btn.addEventListener(`click`,() => {
    recognition.start();

    if(localStorage.getItem(`imeCorvus`)){

        greetings = [
            `Hello ${localStorage.getItem(`imeCorvus`)}, hope you are doing good today, how can I help you ?`
        ];
        
        exuse = [
            `No ${localStorage.getItem(`imeCorvus`)}, today will be quite sunny day, how about you go and do some exercise`,
            `No ${localStorage.getItem(`imeCorvus`)}, today will be a great day, you could go out with your friends`,
            `No ${localStorage.getItem(`imeCorvus`)}, today will be an amazing day, go and be awesome`
        ];
        
        wow = [
            `${localStorage.getItem(`imeCorvus`)}, Every saint has a past, and every sinner has a future`,
            `${localStorage.getItem(`imeCorvus`)}, Life without love is like a tree without blossoms or fruit`,
            `Be yourself ${localStorage.getItem(`imeCorvus`)}, everyone else is already taken`,
            `${localStorage.getItem(`imeCorvus`)}, Your pain is the breaking of the shell that encloses your understanding`,
            `Time is a created thing ${localStorage.getItem(`imeCorvus`)}. To say I dont have time, is like saying I dont want to`
        
        ];
        
        joke = [
            `Angular is the best Java Script framework`,
            `Why dont cannibals eat clowns ? Because they taste funny`,
            `Why did the farmer win an award ? He was out standing in his field`,
            `What did the ocean say to the shore ? Nothing, it just waved`,
        ];
        
        another = [
            `On this website, obviously`
        ];
        
        strong = [
            `Milena, of course.`
        ]
    
    }
    
    else{
    
        greetings = [
            `Hello Alex, hope you are doing good today, how can I help you ?`
        ];
        
        exuse = [
            `No, today will be quite sunny day, how about you go and do some exercise`,
            `No, today will be a great day, you could go out with your friends`,
            `No, today will be an amazing day, go and be awesome`
        ];
        
        wow = [
            `Every saint has a past, and every sinner has a future`,
            `Life without love is like a tree without blossoms or fruit`,
            `Be yourself; everyone else is already taken`,
            `Your pain is the breaking of the shell that encloses your understanding`,
            `Time is a created thing. To say I dont have time, is like saying I dont want to`
        
        ];
        
        joke = [
            `Angular is the best Java Script framework`,
            `Why dont cannibals eat clowns ? Because they taste funny`,
            `Why did the farmer win an award ? He was out standing in his field`,
            `What did the ocean say to the shore ? Nothing, it just waved`,
        ];
        
        another = [
            `On this website, obviously`
        ];
        
        strong = [
            `Milena, of course.`
        ]
    
    }

});

function readOutLoud(message){
    const speech = new SpeechSynthesisUtterance();

    speech.text = `I didnt understand what you said, please repeat`;

    if(message.includes(`hej`) || message.includes(`hello`)){
        const finalText = greetings[Math.floor(Math.random() * greetings.length)]
        speech.text = finalText;
    }

    if(message.includes(`rain today`)){
        const finalText1 = exuse[Math.floor(Math.random() * exuse.length)]
        speech.text = finalText1;
    }

    if(message.includes("deep quote") || message.includes(`sentence`)){
        const finalText2 = wow[Math.floor(Math.random() * wow.length)]
        speech.text = finalText2;
    }

    if(message.includes(`tell me a joke`) || message.includes(`neku foru`)){
        const finalText3 = joke[Math.floor(Math.random() * joke.length)]
        speech.text = finalText3;
    }

    if(message.includes(`best games`)){
        const finalText4 = another[Math.floor(Math.random() * another.length)]
        speech.text = finalText4;
    }

    if(message.includes(`best professor`)){
        const finalText5 = strong[Math.floor(Math.random() * strong.length)]
        speech.text = finalText5;
    }

    speech.volume = 1;
    speech.rate = 0.4;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}