
$(document).ready(function(){

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 0){
            $(".koniec").css("background", "white");
        }
        else {
            $(".koniec").removeAttr("style");
        }
       
    })
})

$(document).ready(function() {
        function daneFormularz(dane, czyPoprawny, komunikat)
        {
            if (czyPoprawny) {
                dane.removeClass("invalid").addClass("valid"); 
                dane.next('.komunikat').text(komunikat).removeClass("blad").addClass("ok");
            }
            else {
                dane.removeClass("valid").addClass("invalid");  
                dane.next('.komunikat').text(komunikat).removeClass("ok").addClass("blad");
             } 
        }
       //Walidacja nazwy
       $('.firstname').on('blur', function() {
           var input = $(this);
           var name_length = input.val().length;
           if(name_length >= 5 && name_length <= 10){
               daneFormularz( input, true, "Wprowadzono poprawną nazwę");// przed optymalizacja input.removeClass("invalid").addClass("valid"); 
                                                                         // przed optymalizacja input.next('.komunikat').text("Wprowadzono poprawną nazwę.").removeClass("blad").addClass("ok");
           }
           else{
                                                                                               // przed optymalizacja input.removeClass("valid").addClass("invalid");
                daneFormularz(input, false, "Nazwa musi mieć więcej niż 4 i mniej niż 11 znaków!");//input.next('.komunikat').text("Nazwa musi mieć więcej niż 4 i mniej niż 11 znaków!").removeClass("ok").addClass("blad");
               
           }
       });
           
       //Walidacja email
       $('.enter').on('blur', function() {
           var input = $(this);
           var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
           var is_email = pattern.test(input.val());
           if(is_email){
               daneFormularz( input, true, "Wprowadzono poprawny email"); // przed optymalizacja input.removeClass("invalid").addClass("valid"); 
                                                                         // przed ptymalizacja input.next('.komunikat').text("Wprowadzono poprawny email.").removeClass("blad").addClass("ok");
           }
           else{
               daneFormularz( input, false, "Wprowadż poprawny email"); // przed optymalizacja input.removeClass("valid").addClass("invalid");
                                                                        // przed optymalizacja input.next('.komunikat').text("Wprowadź poprawny email!").removeClass("ok").addClass("blad");
           }
       });	
       
       //Walidacja wiadomości
       $('.tekst').on('blur', function() {
           var input = $(this);
           var message = $(this).val();
           if(message){
               daneFormularz( input, true, "Wprowadzono poprawną wiadomość"); // przed optymalizacja input.removeClass("invalid").addClass("valid"); 
                                                                              // przed optymalizacja input.next('.komunikat1').text("Wprowadzono poprawną wiadomość.").removeClass("blad").addClass("ok");
           }
           else{
               daneFormularz( input, false, "Wiadomość nie może być pusta!"); // przed optymalizacja input.removeClass("valid").addClass("invalid");
                                                                             // przed optymalizacją input.next('.komunikat').text("Wiadomość nie może być pusta!").removeClass("ok").addClass("blad");
           }   
       });
       
       //Po próbie wysłania formularza
           $('form.logowanie').submit(function(event) { //form - formularz ze strony. submit(....)-przyciśk na stronie
            event.preventDefault();
            console.log( $(this).serializeArray(), $(this).serializeArray()[0].value ); //serializeArray - funkcja jq sciagajaca wpisane dane w formularzu
               var name = $('.firstname'); // .firstname - z formularza HTML
               var email = $('.enter');
               var message = $('.tekst');
               name.trigger('blur');
               email.trigger('blur');
               message.trigger('blur');

               
               
               var serializeArray = $(this).serializeArray(); // Również zwraca tablicę
               
               if(name.hasClass('valid') && email.hasClass('valid') && message.hasClass('valid')){
                 
                   var wyswietlanie = '';
                   for (var i=0; i<serializeArray.length; i++) {
                       var elementTablicy = serializeArray[i];
                       wyswietlanie += elementTablicy.name + ': ' + elementTablicy.value + '<br>';
                   }
                   $.alert({
                    title: '',
                    content: 'Dane wprowadzone prawidłowo.<br/>Twoje dane:<br>' + wyswietlanie
                });	  
                    
               }
               else {
                   
                    var wyswietlanie = '';
                   serializeArray.forEach(function(obiekt, index, array) {
                       var element = $('[name="'+ obiekt.name +'"]');
                       if(element.hasClass('invalid')) {
                        wyswietlanie = wyswietlanie + element.prev().text() + '<br/>'; //  wyswietlanie += obiekt.name + (mozna zmieniać wyswietlanie obiekt na inne, np element)
                       }
                   }); //foreach

                    $.alert({
                        title: '',
                        content: 'Uzupełnij: <br/>' + wyswietlanie,
                    });	  	
               }
            });
        });

      