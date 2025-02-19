
//<!----------------------------START JS SEARCHBOX ------------------------------>
////////<!----- JS  GENERAL ---->////////
if ($(window).width() <= 750) {
    if ($("#flight_form").attr('action') == '/Tem1_Roundtrip_Search.bc') {
        $("#flight_form").attr('action', '/M_Roundtrip_Search.bc')
    }
    if ($("#flight_form").attr('action') == '/Tem1_Oneway_Search.bc') {
        $("#flight_form").attr('action', '/M_Oneway_Search.bc')
    }
    $("#hotel_form").attr('action', '/M_Hotel_Search.bc')
    $("#flightHotel_form").attr('action', '/M_FlightHotel_Search.bc')
    $("#insurance_form").attr('action', '/M_Insurance_Search.bc')
    $("#tour_form").attr('action', '/M_Tour_Search.bc')
}
function openNextCal(e) {
   let activeBtn = $('.reservation-item > div > li:not(.inactive)').attr('data-id');
       if (activeBtn == 'r-flighthotel'){
           if($('.Wrapper-ExteraHoteldate').is(':visible')){
               let returnDate = $('.Wrapper-ExteraHoteldate').find('.nextCalOpeningex').val();
               if (returnDate == '') {
                   $('.Wrapper-ExteraHoteldate').find('.nextCalOpeningex').trigger("onclick");
               }
           }else {
               let returnDate = $('#' + activeBtn).find('.nextCalOpening').val();
               if (returnDate == '') {
                   $('#' + activeBtn).find('.nextCalOpening').trigger("onclick");
                   }
           }
       }
      else {
           let returnDate = $('#' + activeBtn).find('.nextCalOpening').val();
           if (returnDate == '') {
               $('#' + activeBtn).find('.nextCalOpening').trigger("onclick");
      }
           
       }

 };

$(".form_search").submit(function (event) {
    $(this).find("input[name=fdate],input[name=tdate]").each(function () {
        if($(this).val() == '' && !$(this).is(':disabled')){
           event.preventDefault(); 
           $(this).css('border','1px solid red') 
       }
    })
    if($(this).find(".Hotel-Date").val() == 1){
       $(this).find("input[name=checkin],input[name=checkout]").each(function () {
       if($(this).val() == ''){
           event.preventDefault(); 
           $(this).css('border','1px solid red') 
       }
    })
    }
})
$('.Wrapper-CountPassenger').click(function (e) {
 $(this).closest('form').find('.CountPassenger').slideDown();
});
$(".confirm").click(function (e) {
$(this).closest(".CountPassenger").slideUp()
})
////////<!----- JS  FLIGHT ---->////////
function sharing(element) {
 var val = $(element).prop("checked")
 if (val == true) {
     $(element).val(1)
 } else if (val == false) {
     $(element).val(0)
 }
}
var chagencyuser = $(".chagencyuser").val()
if (chagencyuser == '2') {
 $(".share").show()
}
$("#r-flight,.row-research").find(".form_search").submit(function (event) {
var select_age = "";
$(this).find(".section-select-age select").each(function (index, element) {
    select_age = select_age + $(this).val() + ',' ;
});
console.log(select_age)
if(select_age !== ''){
    $(this).find(".select-age-value").val(select_age)
    var val_1 = $(this).find(".select-age-value").val()
    var val_2 = val_1.replace(/,(?=[^,]*$)/, '')
    $(this).find(".select-age-value").val(val_2)
}else{
    $(this).find(".select-age-value").val(0)
}
 var ad = parseInt($(this).find(".adult").val());
 var inf = 0
 var valueAdded = 1;
 var ch = 0;
 var sum = 0;
 $(this).find(".section-select-age select").each(function () {
     var age = parseInt($(this).val())
     ch += valueAdded;
     if (age < 2) {
         inf += valueAdded;
     }
 });
 sum = parseInt(ad + ch)
 if (inf > ad || sum > 10) {
     event.preventDefault();
     $(".warning").show()

 }
})
function empty_value(element) {
 $(element).val('')
 $(element).closest(".city").find(".co-id").val('')
 $(element).closest(".city").find(".searchList").slideDown()
 $(element).closest(".city").siblings(".city").find(".searchList").slideUp()
}

$('.country').each(function () {
 $(this).on('keyup', function (e) {
     $(this).closest(".city").find(".searchList").slideUp()
 });
 $(this).on('blur', function () {
     if ($(this).closest(".city").find(".countryFlight").text().length > 0) {
         if (hoverelse == 0) {
             var defresult = $(this).closest(".city").find(".countryFlight")
                 .children(".selectCountry:first").find(".txtcountry")
                 .text();
             var spl = defresult.split(" ");
             var defresultid = $(this).closest(".city").find(".countryFlight").children(".selectCountry:first").find(".countryid").val();
             $(this).closest(".city").find(".country").val(defresult);
             $(this).closest(".city").find(".co-id").val(defresultid);
             $(this).closest(".city").find(".countryFlight").empty();
         }
     } else {
         $(this).closest(".city").find(".mini-loading").css("display", "none")
         $(this).closest(".city").find(".country").val('');
         $(this).closest(".city").find(".co-id").val('');
     }
 });

});
function city_search(a) {
 if (a.which !== 0 && !a.ctrlKey && !a.metaKey && !a.altKey) {
     upper_case = $(a).val().substr(0, 1).toUpperCase() + $(a).val().substr(1).toLowerCase();
     $(a).val(upper_case)
     if ($(a).val().length > 2) {
         $(a).closest(".city").find(".mini-loading").show();
         $.ajax({
             url: '/Client_City_Search.bc',
             type: 'get',
             data: {
                 term: $(a).val(),
                 type: $(a).attr('data-type')
             },
             success: function (result) {
                 $(a).closest(".city").find(".mini-loading").hide();
                 $(a).closest(".city").find(".countryFlight").empty().html(result)
             }
         });
     }
     else
         $(a).closest(".city").find(".countryFlight").empty()
 }
}
function SelectPlace(element) {
 var idSelected = $(element).attr("data-id")
 var textSelected = $(element).find("span").text()
 $(element).closest(".city").find(".country").val(textSelected)
 $(element).closest(".city").find(".co-id").val(idSelected)
 $(element).closest(".city").find(".searchList").slideUp()
 $(element).closest(".city").next(".city").find('.country').trigger("onclick")
}
$(document).on('click', function (event) {
 if (!$(event.target).closest('.searchList,.country,.selectCountry').length) {
     $(".searchList").slideUp();
 }
 if (!$(event.target).closest('#ui-datepicker-div,.FlightClass,.Wrapper-CountPassenger,.plus-minus,.plus-minus-ch,.createChildDropdown select,.add-room,.plus-minus-ins,.BithdatePassenger,.delete-room,.nice-select .option').length) {
     $(".CountPassenger").slideUp();
 }
})
$(".plus-minus").on("click", function () {
 var button = $(this);
 var oldVal = parseInt(button.closest(".item-CountPassenger").find('input').val());
 var newVal = (button.text() == "+") ? oldVal + 1 : (oldVal > 0) ? oldVal - 1 : 0;
 if (newVal >= 10) return;
 if (newVal < 1) return;
 button.closest(".item-CountPassenger").find('input').val(newVal);
 button.closest("form").find('.count-adult .count').text(newVal)
});
$(".plus-minus-ch").on("click", function () {
 var button = $(this);
 var oldVal = parseInt(button.closest(".item-CountPassenger").find('input').val());
 var newVal = (button.text() == "+") ? oldVal + 1 : (oldVal > 0) ? oldVal - 1 : 0;
 if (newVal >= 5) return;
 button.closest(".item-CountPassenger").find('input').val(newVal);
 if(newVal == 0){
    button.closest(".item-CountPassenger").find('.child').val(newVal);
 }else{
    button.closest(".item-CountPassenger").find('.child').val(newVal + ',');
 }

 button.closest("form").find('.count-child .count').text(newVal)
 if (oldVal < newVal) {
     if(button.attr('data-type') == 0){
        button.closest(".item-CountPassenger").find('.section-select-age').append(createChildDropdown(newVal));
     }else{
        button.closest(".item-CountPassenger").find('.section-select-age').append(createChildDropdown_2(newVal));
     }
     
 } else if (oldVal > newVal) {
     destroyChildDropdown(button.closest(".item-CountPassenger").find('.section-select-age'), newVal);
 }
});
var createChildDropdown = function (i) {
 var $childDropdown = $('<div />', {
     'class': 'createChildDropdown select-arrow p-relative'
 });
 $childDropdown.append($('<label />', {
     'for': 'childDropdown-' + i
 }).text('سن کودک ' + i));
 $childDropdown.append($('<select />'));
 var options = ['تا 1 سال', '1 تا 2  ', '2 تا 3 ', '3 تا 4  ', '4 تا 5 ',
     '5 تا 6 ', '6 تا 7 ', '7 تا 8 ', '8 تا 9 ', '9 تا 10 ',
     '10 تا 11 ', '11 تا 12 '
 ];
 options.forEach(function (option, index) {
     $childDropdown.find('select').append($('<option />').text(option).attr(
         'value', index + 1));
 });
 return $childDropdown;
};
var createChildDropdown_2 = function (i) {
    var $childDropdown = $('<div />', {
        'class': 'createChildDropdown select-arrow p-relative'
    });
    $childDropdown.append($('<label />', {
        'for': 'childDropdown-' + i
    }).text('سن کودک ' + i));
    $childDropdown.append($('<select />'));
    var options = ['تا 1 سال', '1 تا 2  ', '2 تا 3 ', '3 تا 4  ', '4 تا 5 ',
        '5 تا 6 ', '6 تا 7 ', '7 تا 8 ', '8 تا 9 ', '9 تا 10 ',
        '10 تا 11 ', '11 تا 12 '
    ];
    options.forEach(function (option, index) {
        $childDropdown.find('select').append($('<option />').text(option).attr(
            'value', index + 1));
    });
    return $childDropdown;
   };
var destroyChildDropdown = function ($el, i) {
 $el.find('div.createChildDropdown').get(i).remove();
};
$(".fa-exchange-alt").click(function () {
 i = $(this).attr("data-index")
 if (i == 0) {
     $(this).attr("data-index", "1")
     var dep = $(this).closest("form").find(".FCD1").val()
     var des = $(this).closest("form").find(".FCD2").val()
     var depid = $(this).closest("form").find(".FCDid1").val()
     var desid = $(this).closest("form").find(".FCDid2").val()
     $(this).closest("form").find(".FCD1").val(des)
     $(this).closest("form").find(".FCD2").val(dep)
     $(this).closest("form").find(".FCDid1").val(desid)
     $(this).closest("form").find(".FCDid2").val(depid)

 } else {
     $(this).attr("data-index", "0")
     var dep = $(this).closest("form").find(".FCD1").val()
     var des = $(this).closest("form").find(".FCD2").val()
     var depid = $(this).closest("form").find(".FCDid1").val()
     var desid = $(this).closest("form").find(".FCDid2").val()
     $(this).closest("form").find(".FCD1").val(des)
     $(this).closest("form").find(".FCD2").val(dep)
     $(this).closest("form").find(".FCDid1").val(desid)
     $(this).closest("form").find(".FCDid2").val(depid)
 }
})


////////<!----- JS  RESEARCH ---->////////
$(".row-research .form_search").find("select").each(function(){
   var selected =  $(this).find('option:selected').val()
   $(this).find('option:selected').remove()
   $(this).find('option:not(:selected)').each(function() {
   var Notselected  = $(this).val();
   if(Notselected == selected){
      $(this).attr('selected',true) 
   }
   });
})
$(document).ready(function () {
   var ValShare = $(".CheckboxShare").val()
       if (ValShare == '0') {
           $(".CheckboxShare").prop("checked", false)
           $(".share").hide()
       } else if (ValShare == '1') {
           $(".CheckboxShare").prop("checked", true)
           $(".share").show()
       }
       if($("#section-flight").find(".child_count").val() != undefined){
     
           if($("#section-flight").find(".child_count").val() == 0){
               $("#section-flight").find(".split_num_2").val(0)
               $("#section-flight").find(".split_num_1").text(0)
           }else{
               $("#section-flight").find(".split_num_1").text($("#section-flight").find(".child_count").val().slice(0,-1))
               $("#section-flight").find(".split_num_2").val($("#section-flight").find(".child_count").val().slice(0,-1))
           }
       }

       if ($(".start_date").val() == $(".persiancurrent").val()) {
           $(".before-btn").hide()
           $('.after-btn').click(NextDate);
       } else {
           $('.before-btn').click(PrevDate);
           $('.after-btn').click(NextDate);
       }
});
$("#section-flight").each(function () {
   var age = $(this).find(".select-age-value").val()
   if (age != 0) {
       var splage = age.split(",")
       for (var i = 0; i < splage.length; i++) {
       var j = i + 1
        if((splage[i] - 1) == 0 ){
           $(this).find(".section-select-age").append(
          '<div class="createChildDropdown select-arrow p-relative"><div>سن کودک ' + j +'</div><select><option value="' +splage[i] + '"> تا ' +splage[i] + ' سال</option><option value="1">تا 1 سال</option><option value="2">1 تا 2</option><option value="3">2 تا 3</option><option value="4">3 تا 4</option><option value="5">4 تا 5</option><option value="6">5 تا 6</option><option value="7">6 تا7</option><option value="8">7 تا 8</option><option value="9">8 تا 9</option><option value="10">9 تا 10</option><option value="11">10 تا 11</option><option value="12">11 تا 12</option></select></div>'
         )    
        }else{
           $(this).find(".section-select-age").append(
       '<div class="createChildDropdown select-arrow p-relative"><div>سن کودک ' + j +'</div><select><option value="' +splage[i] + '">' +(splage[i] - 1)+ ' تا ' +splage[i] + '</option><option value="1">تا 1 سال</option><option value="2">1 تا 2</option><option value="3">2 تا 3</option><option value="4">3 تا 4</option><option value="5">4 تا 5</option><option value="6">5 تا 6</option><option value="7">6 تا7</option><option value="8">7 تا 8</option><option value="9">8 تا 9</option><option value="10">9 تا 10</option><option value="11">10 تا 11</option><option value="12">11 تا 12</option></select></div>'
        )
        }
       }
   }
   $(this).find(".createChildDropdown select").each(function(){
       var selected =  $(this).find('option:selected').val()
       $(this).find('option:selected').remove()
       $(this).find('option:not(:selected)').each(function() {
       var Notselected  = $(this).val();
       if(Notselected == selected){
           $(this).attr('selected',true) 
       }
   });
   })
});
////////<!----- JS  HOTEL/TOUR ---->////////
$(".submitForm").click(function () {
   var childcountandage = $(this).closest("form").find(".childcountandage").val();
    if (childcountandage == "0,") {
        $(this).closest("form").find(".childcountandage").val(0)
    }
   $(this).closest("form").find(".contentRoom").each(function () {
       var childCount = $(this).find(".child_1").val();
       var childAge = "";
       $(this).find(".createChildDropdown select").each(function () {
           childAge = childAge + ',' + $(this).val();
       });
       $(this).find(".childcountandage").val(childCount + childAge);
       console.log( $(this).find(".childcountandage").val())
   });
});
function AddRoom(element) {
    $(element).closest("form").find('.count-child .count').text('0')
    var sumAdult = 0;
    var ad = 0;
    var oldVal = $(element).closest("form").find('.count-room .count').text();
    var newVal = parseInt(oldVal) + 1
    if (newVal >= 5) return;
    $(element).closest("form").find('.count-room .count').text(newVal)
    $(element).closest("form").find(".ShowRow").empty()
    for (i = 1; i <= newVal; i++) {
        if (i == newVal) {
            $(element).closest("form").find(".ShowRow").append(
                '<div class="contentRoom"><div class="RoomRow">اتاق ' + i +
                ' <span class="delete-room" onclick="DeleteRoom(this,' + i + ')">حذف</span></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">بزرگسال (+12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  name="_root.rooms__' + i + '.adultcount" class="adult" maxlength="4000" readonly="" value="1"></div><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><div class="clr"></div></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">کودک (-12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  class="child_1" maxlength="4000" readonly="" value="0"></div><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><input type="hidden" value="0" class="childcountandage" name="_root.rooms__' + i + '.childcountandage"><div class="clr"></div><div class="section-select-age"></div><div class="clr"></div></div></div>')
        } else {
            $(element).closest("form").find(".ShowRow").append(
                '<div class="contentRoom"><div class="RoomRow">اتاق ' + i +
                ' </div><div class="item-CountPassenger"><div class="first-part-CountPassenger">بزرگسال (+12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  name="_root.rooms__' + i + '.adultcount" class="adult" maxlength="4000" readonly="" value="1"></div><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><div class="clr"></div></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">کودک (-12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  class="child_1" maxlength="4000" readonly="" value="0"></div><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><input type="hidden" value="0" class="childcountandage" name="_root.rooms__' + i + '.childcountandage"><div class="clr"></div><div class="section-select-age"></div><div class="clr"></div></div></div>')
        }

    }
    $(element).closest("form").find(".contentRoom").each(function () {
        var adult = parseInt($(this).find(".adult").val())
        ad += adult;
        $(this).find(".plus-minus").on("click", function () {
            var button = $(this);
            var oldVal = parseInt(button.closest(".item-CountPassenger").find('input').val());
            var newVal = (button.text() == "+") ? oldVal + 1 : (oldVal > 0) ? oldVal - 1 : 0;
            if (newVal >= 10) return;
            if (newVal < 1) return;
            button.closest(".item-CountPassenger").find('input').val(newVal);
            var adNew = 0;
            var sumAdultNew = 0;
            button.closest(".CountPassenger").find(".contentRoom").each(function () {
                var adultNew = parseInt($(this).find(".adult").val())
                adNew += adultNew;
            })
            sumAdultNew = parseInt(adNew)
            button.closest("form").find(".count-adult .count").text(sumAdultNew)
        });
        $(this).find(".plus-minus-ch").on("click", function () {
            var button = $(this);
            var oldVal = parseInt(button.closest(".item-CountPassenger").find('input').val());
            var newVal = (button.text() == "+") ? oldVal + 1 : (oldVal > 0) ? oldVal - 1 : 0;
            if (newVal >= 5) return;
            button.closest(".item-CountPassenger").find('input').val(newVal);
            var sumChild = 0
            var ch = 0;
            button.closest(".CountPassenger").find(".contentRoom").each(function () {
                var child = parseInt($(this).find(".child_1").val())
                ch += child;
            })
            sumChild = parseInt(ch)
            button.closest("form").find('.count-child .count').text(sumChild)
            if (oldVal < newVal) {
                if (button.attr('data-type') == 0) {
                    button.closest(".item-CountPassenger").find('.section-select-age').append(createChildDropdown(newVal));
                }else{
                    button.closest(".item-CountPassenger").find('.section-select-age').append(createChildDropdown_2(newVal));
                }
            } else if (oldVal > newVal) {
                destroyChildDropdown(button.closest(".item-CountPassenger").find('.section-select-age'), newVal);
            }
        });
    })
    sumAdult = parseInt(ad)
    $(element).closest("form").find('.count-adult .count').text(sumAdult)
}
function DeleteRoom(element, i) {
    var j = i - 1;
    var x = i - 1;
    if (j == 0) {
        $(element).closest("form").find('.count-room .count').text('1')
    } else {
        $(element).closest("form").find('.count-room .count').text(j)
    }
    if (x == 1) {
    } else {
        $(element).closest(".contentRoom").prev(".contentRoom").find('.RoomRow').append('<span class="delete-room" onclick="DeleteRoom(this,' + j + ')">حذف</span>')
    }
    if (i !== 1) {
        var NewvalAdult = parseInt($(element).closest("form").find('.count-adult .count').text()) - parseInt($(element).closest(".contentRoom").find(".adult").val())
        $(element).closest("form").find('.count-adult .count').text(NewvalAdult)
        var NewvalChild = parseInt($(element).closest("form").find('.count-child .count').text()) - parseInt($(element).closest(".contentRoom").find(".child_1").val())
        $(element).closest("form").find('.count-child .count').text(NewvalChild)
        $(element).closest(".contentRoom").remove()
    }
}
////////<!----- JS  RESEARCH ---->////////
$(".section-searchWRoom").each(function () {
   var json =  JSON.parse($(this).find(".json").val())
   var room_json = json.rooms.length
   var adult_json = ""
   var child_json = ""
   for (var i = 0; i < room_json; i++) {
       adult_json = adult_json + json.rooms[i].adultcount + ','
       child_json = child_json + json.rooms[i].childcountandage + '*'

   }
   adult_json = adult_json.slice(0, -1)
   child_json = child_json.slice(0, -1)
   var sp = adult_json.split(",");
   var sp2 = child_json.split("*")
   var ad = 0;
   var sum = 0;
   for (var y = 0; y < sp.length; y++) {
      var adultcount = parseInt(sp[y])
      ad += adultcount;
   }
   sum = parseInt(ad)
   $(this).find(".count-room .count").text(room_json)
   $(this).find(".count-adult .count").text(sum)
   var ch = 0;
   var sum2 = 0;
   for (var z = 0; z < sp2.length; z++) {
      var q = sp2[z]
      var p = q.split(",")
      var childcount = parseInt(p[0])
      ch += childcount;
   }
   sum2 = parseInt(ch)
   $(this).find(".count-child .count").text(sum2)
   $(this).find(".ShowRow").empty()
   for (i = 1; i <= room_json; i++) {
      var childage = ""
      var q = sp2[i - 1]
      var p = q.split(",")
      var s = p.length
      if (p[0] > 0) {
         var age = ""
         var chage = ""
         for (var j = 1; j < s; j++) {
            if((p[j] - 1) == 0 ){
            age = age +'<div class="createChildDropdown select-arrow p-relative"><div>سن کودک ' + j +'</div><select><option value="' +p[j] + '"> تا ' +p[j] + ' سال</option><option value="1">تا 1 سال</option><option value="2">1 تا 2</option><option value="3">2 تا 3</option><option value="4">3 تا 4</option><option value="5">4 تا 5</option><option value="6">5 تا 6</option><option value="7">6 تا7</option><option value="8">7 تا 8</option><option value="9">8 تا 9</option><option value="10">9 تا 10</option><option value="11">10 تا 11</option><option value="12">11 تا 12</option></select></div>'
           }else{
            age = age +'<div class="createChildDropdown select-arrow p-relative"><div>سن کودک ' + j +'</div><select><option value="' +p[j] + '">' +(p[j] - 1)+ ' تا ' +p[j] + '</option><option value="1">تا 1 سال</option><option value="2">1 تا 2</option><option value="3">2 تا 3</option><option value="4">3 تا 4</option><option value="5">4 تا 5</option><option value="6">5 تا 6</option><option value="7">6 تا7</option><option value="8">7 تا 8</option><option value="9">8 تا 9</option><option value="10">9 تا 10</option><option value="11">10 تا 11</option><option value="12">11 تا 12</option></select></div>'
            }
            chage = chage + p[j] + ','
         }
         chage = chage.slice(0, -1);
         childage = childage + p[0] + ',' + chage
         if (i == room_json) {
            $(this).find(".ShowRow").append(
            '<div class="contentRoom"><div class="RoomRow">اتاق ' + i +
            ' <span class="delete-room" onclick="DeleteRoom(this,' + i + ')">حذف</span></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">بزرگسال (+12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  name="_root.rooms__' + i + '.adultcount" class="adult" maxlength="4000" readonly="" value="' + sp[i - 1] +'"></div><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><div class="clr"></div></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">کودک (-12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text" class="child_1" maxlength="4000" readonly="" value="' + p[0] + '"></div><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><input type="hidden" value="' + childage +
            '" class="childcountandage" name="_root.rooms__' + i + '.childcountandage"><div class="clr"></div><div class="section-select-age">' + age + '</div><div class="clr"></div></div></div>')
         } else {
            $(this).find(".ShowRow").append(
            '<div class="contentRoom"><div class="RoomRow">اتاق ' + i +
            ' </div><div class="item-CountPassenger"><div class="first-part-CountPassenger">بزرگسال (+12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  name="_root.rooms__' + i + '.adultcount" class="adult" maxlength="4000" readonly="" value="' + sp[i - 1] +'"></div><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><div class="clr"></div></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">کودک (-12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text" class="child_1"  maxlength="4000" readonly="" value="' + p[0] + '"></div><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><input type="hidden" value="' + childage +
            '" class="childcountandage" name="_root.rooms__' + i + '.childcountandage"><div class="clr"></div><div class="section-select-age">' + age + '</div><div class="clr"></div></div></div>')
         }
         } else {
            if (i == room_json) {
            $(this).find(".ShowRow").append(
            '<div class="contentRoom"><div class="RoomRow">اتاق ' + i +
            ' <span class="delete-room" onclick="DeleteRoom(this,' + i + ')">حذف</span></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">بزرگسال (+12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  name="_root.rooms__' + i + '.adultcount" class="adult" maxlength="4000" readonly="" value="' + sp[i - 1] +'"></div><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><div class="clr"></div></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">کودک (-12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text" class="child_1"  maxlength="4000" readonly="" value="' + p[0] + '"></div><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><input type="hidden" value="0" class="childcountandage" name="_root.rooms__' + i + '.childcountandage"><div class="clr"></div><div class="section-select-age"></div><div class="clr"></div></div></div>')
         } else {
            $(this).find(".ShowRow").append(
            '<div class="contentRoom"><div class="RoomRow">اتاق ' + i +
            ' </div><div class="item-CountPassenger"><div class="first-part-CountPassenger">بزرگسال (+12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text"  name="_root.rooms__' + i + '.adultcount" class="adult" maxlength="4000" readonly="" value="' + sp[i - 1] +'"></div><div class="passenger-button plus-minus"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><div class="clr"></div></div><div class="item-CountPassenger"><div class="first-part-CountPassenger">کودک (-12)</div><div class="second-part-CountPassenger"><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal plus-btn">+</span></div><div class="passenger-button"><input type="text" class="child_1"  maxlength="4000" readonly="" value="' + p[0] + '"></div><div class="passenger-button plus-minus-ch" data-type="1"><span class="background-color_2 hvr-horizontal minus-btn">-</span></div></div><input type="hidden" value="0" class="childcountandage" name="_root.rooms__' + i + '.childcountandage"><div class="clr"></div><div class="section-select-age"></div><div class="clr"></div></div></div>')
         }
         }
      }
$(this).find(".contentRoom").each(function () {
    var adult = parseInt($(this).find(".adult").val())
    ad += adult;
    $(this).find(".plus-minus").on("click", function () {
        var button = $(this);
        var oldVal = parseInt(button.closest(".item-CountPassenger").find('input').val());
        var newVal = (button.text() == "+") ? oldVal + 1 : (oldVal > 0) ? oldVal - 1 : 0;
        if (newVal >= 10) return;
        if (newVal < 1) return;
        button.closest(".item-CountPassenger").find('input').val(newVal);
        var adNew = 0;
        var sumAdultNew = 0;
        button.closest(".CountPassenger").find(".contentRoom").each(function () {
            var adultNew = parseInt($(this).find(".adult").val())
            adNew += adultNew;
        })
        sumAdultNew = parseInt(adNew)
        button.closest("form").find(".count-adult .count").text(sumAdultNew)
    });
    $(this).find(".plus-minus-ch").on("click", function () {
        var button = $(this);
        var oldVal = parseInt(button.closest(".item-CountPassenger").find('input').val());
        var newVal = (button.text() == "+") ? oldVal + 1 : (oldVal > 0) ? oldVal - 1 : 0;
        if (newVal >= 5) return;
        button.closest(".item-CountPassenger").find('input').val(newVal);
        var sumChild = 0
        var ch = 0;
        button.closest(".CountPassenger").find(".contentRoom").each(function () {
            var child = parseInt($(this).find(".child").val())
            ch += child;
        })
        sumChild = parseInt(ch)
        button.closest("form").find('.count-child .count').text(sumChild)
        if (oldVal < newVal) {
            button.closest(".item-CountPassenger").find('.section-select-age').append(createChildDropdown(newVal));
        } else if (oldVal > newVal) {
            destroyChildDropdown(button.closest(".item-CountPassenger").find('.section-select-age'), newVal);
        }
    });
}) 
$(this).find(".createChildDropdown select").each(function(){
        var selected =  $(this).find('option:selected').val()
        $(this).find('option:selected').remove()
        $(this).find('option:not(:selected)').each(function() {
        var Notselected  = $(this).val();
        if(Notselected == selected){
            $(this).attr('selected',true) 
        }
    });
    })     
});
////////<!----- JS  INSURANCE ---->////////
$(".plus-minus-ins").on("click", function () {
   var button = $(this);
   var oldVal = parseInt(button.closest(".item-CountPassenger").find('input').val());
   var newVal = (button.text() == "+") ? oldVal + 1 : (oldVal > 0) ? oldVal - 1 : 0;
   if (newVal >= 9) return;
   if (newVal < 1) return;
   button.closest(".item-CountPassenger").find('.passengercount').val(newVal);
   button.closest("form").find('.count-adult .count').text(newVal)
   if (oldVal < newVal) {
       button.closest(".item-CountPassenger").find('.Wrapper-BirthdatePassenger').empty()
       for (var i = 1; i <= newVal; i++) {
           button.closest(".item-CountPassenger").find('.Wrapper-BirthdatePassenger').append('<div class="BirthdatePassenger"><label class="label">تاریخ تولد مسافر ' +
               i +
               '</label><input class="datepicker BithdatePassenger" placeholder="تاریخ میلادی" type="text" autocomplete="off" readonly="true" required><div class="clr"></div></div>'
           );
       }
   } else if (oldVal > newVal) {
       destroyInsurancePassenger(button.closest(".item-CountPassenger").find('.Wrapper-BirthdatePassenger'), newVal);
   }
   $('.datepicker').focus(function (e) {
       FDatepicker(this, {
           single: true,
           isJalali: isJalali,
           changeMonth: true,
           changeYear: true,
           minDate: "-100y",
           maxDate: $("#AdaultMaxDate").val(),
           yearRangeJalali: "1250:1500",
           yearRangeGregorian: "1900:2030",
           numberOfMonths: 1,
       });
       var innerContent = $('.nice-select > ul');
       var option_height = $('.nice-select .option').height();
       var option_count = $('.nice-select .option').length;
       var Ul_height = parseInt(option_height) * parseInt(option_count)
       innerContent.scrollTop(Ul_height / 2);
   });
});
var destroyInsurancePassenger = function ($el, i) {
   $el.find('div.BirthdatePassenger').get(i).remove();
};
$("#insurance_form").submit(function (event) {
   $(this).find(".datepicker").each(function () {
       var birthval = $(this).val().length;
       if (birthval < 1) {
           $(this).css("border-color", "red")
           $(".NotEnteringBirthadate").show()
           $(this).closest("form").find(".CountPassenger").slideDown()
           event.preventDefault();
       }
   })
   var passenger_birthday = "";
   $(this).find(".BirthdatePassenger").each(function (index, element) {
       passenger_birthday = passenger_birthday +  '"' + $(this).find(".datepicker").val() + '"' + ',' ;
   });
   $(this).find(".birthday").val(passenger_birthday)
   var val_1 = $(this).find(".birthday").val()
   var val_2 = val_1.replace(/,(?=[^,]*$)/, '')
   $(this).find(".birthday").val(val_2)

})
////////<!----- JS  RESEARCH ---->////////
$(document).ready(function () {
   if($("#insurance_form").find(".birthday").val() != undefined) {
       $("#insurance_form").find(".birthday").val($("#insurance_form").find(".birthday").val().replace(/"/g, ''))
       var birthdate = $("#insurance_form").find(".birthday").val()
       var splitBirthdate = birthdate.split(",")
       $("#insurance_form").find(".Wrapper-BirthdatePassenger").empty();
       for (var i = 0; i < splitBirthdate.length; i++) {
          var x = i + 1
       $("#insurance_form").find(".Wrapper-BirthdatePassenger").append('<div class="BirthdatePassenger"><label class="label">تاریخ تولد مسافر ' + x +'</label><input class="datepicker BithdatePassenger" value="' + splitBirthdate[i] + '" placeholder="تاریخ میلادی" type="text" autocomplete="off" readonly="true" required/><div class="clr"></div></div>')
       $('.datepicker').focus(function (e) {
            FDatepicker(this, {
                single: true,
                isJalali: isJalali,
                changeMonth: true,
                changeYear: true,
                minDate: "-100y",
                maxDate: $("#AdaultMaxDate").val(),
                yearRangeJalali: "1250:1500",
                yearRangeGregorian: "1900:2030",
                numberOfMonths: 1,
            });
            var innerContent = $('.nice-select > ul');
            var option_height = $('.nice-select .option').height();
            var option_count = $('.nice-select .option').length;
            var Ul_height = parseInt(option_height) * parseInt(option_count)
            innerContent.scrollTop(Ul_height / 2);
        });
       }
   }
})

////////<!----- JS  DATEPICKER ---->////////
function getPassportExpiryDate() {
   return new Date();
}
var regional = "",
   isJalali = false;
if (regional == "fa") {
   isJalali = true;
}
$('.datepicker').focus(function (e) {
   FDatepicker(this, {
       single: true,
       isJalali: isJalali,
       changeMonth: true,
       changeYear: true,
       minDate: "-100y",
       maxDate: $("#AdaultMaxDate").val(),
       yearRangeJalali: "1250:1500",
       yearRangeGregorian: "1900:2030",
       numberOfMonths: 1,
   });
   var innerContent = $('.nice-select > ul');
   var option_height = $('.nice-select .option').height();
   var option_count = $('.nice-select .option').length;
   var Ul_height = parseInt(option_height) * parseInt(option_count)
   innerContent.scrollTop(Ul_height / 2);
});
PersianDate = {
   g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
   j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};
PersianDate.PersianToGregorian = function (j_y, j_m, j_d) {
   j_y = parseInt(j_y);
   j_m = parseInt(j_m);
   j_d = parseInt(j_d);
   var jy = j_y - 979;
   var jm = j_m - 1;
   var jd = j_d - 1;

   var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
   for (var i = 0; i < jm; ++i) j_day_no += PersianDate.j_days_in_month[i];
   j_day_no += jd;
   var g_day_no = j_day_no + 79;
   var gy = 1600 + 400 * parseInt(g_day_no /
       146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
   g_day_no = g_day_no % 146097;
   var leap = true;
   if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
       g_day_no--;
       gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
       g_day_no = g_day_no % 36524;

       if (g_day_no >= 365) g_day_no++;
       else leap = false;
   }

   gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
   g_day_no %= 1461;
   if (g_day_no >= 366) {
       leap = false;
       g_day_no--;
       gy += parseInt(g_day_no / 365);
       g_day_no = g_day_no % 365;
   }
   for (var i = 0; g_day_no >= PersianDate.g_days_in_month[i] + (i == 1 && leap); i++)
       g_day_no -= PersianDate.g_days_in_month[i] + (i == 1 && leap);
   var gm = i + 1;
   var gd = g_day_no + 1;
   gm = gm < 10 ? "0" + gm : gm;
   gd = gd < 10 ? "0" + gd : gd;
   return [gy, gm, gd];
}
//<!----------------------------END JS SEARCHBOX ------------------------------>
//<!----------------------------START JS CHANGE DATE ------------------------------>
function PrevDate() {

   if($(".checkinMdate").val() !== undefined && $(".checkinMdate").val() !== ""){
       var checkinMdate = $(".checkinMdate").val().split("-");
       var checkoutMdate = $(".checkoutMdate").val().split("-");

       if( checkinMdate[2] == 1 ) {
           var lessDepMonth = parseInt(checkinMdate[1])-1 
           if(checkinMdate[1] == 1 ) {
               var lessDepYear = parseInt(checkinMdate[0])-1
               $(".checkinMdate").val(lessDepYear+'-'+'12'+'-'+'31')
           }
           else if(lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
               if(lessDepMonth < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'0'+lessDepMonth+'-'+'31')
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+lessDepMonth+'-'+'31')
               }
           }
           else if(lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11 ) {
               if(lessDepMonth < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'0'+lessDepMonth+'-'+'30')
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+lessDepMonth+'-'+'30')
               }
           }
           else if(lessDepMonth == 2 ) {
               if ((checkinMdate[0] % 4 == 0) && ((checkinMdate[0] % 100 != 0) || (checkinMdate[0] % 400 == 0))) {
               if(lessDepMonth < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'0'+lessDepMonth+'-'+'29')
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+lessDepMonth+'-'+'29')
               }
           } else {
               if(lessDepMonth < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'0'+lessDepMonth+'-'+'28')
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+lessDepMonth+'-'+'28')
               }
           }
   
           }
       } else if(checkinMdate[2] > 1) {
           var lessDepDay = parseInt(checkinMdate[2])-1 
           $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+lessDepDay)
       }

// prev checkout date

       if( checkoutMdate[2] == 1 ) {
           var lessDepMonth = parseInt(checkoutMdate[1])-1 
           if(checkoutMdate[1] == 1 ) {
               var lessDepYear = parseInt(checkoutMdate[0])-1
               $(".checkoutMdate").val(lessDepYear+'-'+'12'+'-'+'31')
           }
           else if(lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
               if(lessDepMonth < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'0'+lessDepMonth+'-'+'31')
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+lessDepMonth+'-'+'31')
               }
           }
           else if(lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11 ) {
               if(lessDepMonth < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'0'+lessDepMonth+'-'+'30')
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+lessDepMonth+'-'+'30')
               }
           }
           else if(lessDepMonth == 2 ) {
               if ((checkoutMdate[0] % 4 == 0) && ((checkoutMdate[0] % 100 != 0) || (checkoutMdate[0] % 400 == 0))) {
               if(lessDepMonth < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'0'+lessDepMonth+'-'+'29')
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+lessDepMonth+'-'+'29')
               }
           } else {
               if(lessDepMonth < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'0'+lessDepMonth+'-'+'28')
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+lessDepMonth+'-'+'28')
               }
           }
   
           }
       } else if(checkoutMdate[2] > 1) {
           var lessDepDay = parseInt(checkoutMdate[2])-1 
           $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+lessDepDay)
       }
   }

   if($(".checkindate").val() !== undefined && $(".checkindate").val() !== ""){
       var checkindate = $(".checkindate").val().split("-");
       var checkoutdate = $(".checkoutdate").val().split("-");

       if(checkindate[1] <= 7 && checkindate[1] != 1){
           if(checkindate[2] == 1){
               var lessDepMonth = parseInt(checkindate[1])-1
               $(".checkindate").val(checkindate[0]+'-'+'0'+lessDepMonth+'-'+'31')
               }else {
                   var lessDepDay = parseInt(checkindate[2])-1   
                   if(lessDepDay < 10){
                       $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+'0'+lessDepDay)
                   }else {
                       $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+lessDepDay)
                   }
               }  
       }else if (checkindate[1] >= 8 ){
           if(checkindate[2] == 1){
               var lessDepMonth = parseInt(checkindate[1])-1
               if(lessDepMonth < 10){
                   $(".checkindate").val(checkindate[0]+'-'+'0'+lessDepMonth+'-'+'30')
               }else {
                   $(".checkindate").val(checkindate[0]+'-'+lessDepMonth+'-'+'30')
               }
               }else {
                   var lessDepDay = parseInt(checkindate[2])-1   
                   if(lessDepDay < 10){
                       $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+'0'+lessDepDay)
                   }else {
                       $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+lessDepDay)
                   }  
               }
       }else if (checkindate[1] == 1){
           if(checkindate[2] == 1){
           var lessDepYear = parseInt(checkindate[0])-1
           var yearcheck = parseInt(lessDepYear)%parseInt(33)
           if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
               $(".checkindate").val(lessDepYear+'-'+'12'+'-'+'30')
           }else {
               $(".checkindate").val(lessDepYear+'-'+'12'+'-'+'29')
           }
         } else {
           var lessDepDay = parseInt(checkindate[2])-1   
           if(lessDepDay < 10){
               $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+'0'+lessDepDay)
           }else {
               $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+lessDepDay)
           }   
         }
       }
   
       // prev date for return date
   
       if(checkoutdate[1] <= 7 && checkoutdate[1] != 1){
           if(checkoutdate[2] == 1){
               var lessRMonth = parseInt(checkoutdate[1])-1
               $(".checkoutdate").val(checkoutdate[0]+'-'+'0'+lessRMonth+'-'+'31')
               }else {
                   var lessRDay = parseInt(checkoutdate[2])-1   
                   if(lessRDay < 10){
                       $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+'0'+lessRDay)
                   }else {
                       $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+lessRDay)
                   }
               }  
       }else if (checkoutdate[1] >= 8 ){
           if(checkoutdate[2] == 1){
               var lessRMonth = parseInt(checkoutdate[1])-1
               if(lessRMonth < 10){
                   $(".checkoutdate").val(checkoutdate[0]+'-'+'0'+lessRMonth+'-'+'30')
               }else {
                   $(".checkoutdate").val(checkoutdate[0]+'-'+lessRMonth+'-'+'30')
               }
               }else {
                   var lessRDay = parseInt(checkoutdate[2])-1   
                   if(lessRDay < 10){
                       $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+'0'+lessRDay)
                   }else {
                       $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+lessRDay)
                   }  
               }
       }else if (checkoutdate[1] == 1){
           if(checkoutdate[2] == 1){
           var lessRYear = parseInt(checkoutdate[0])-1
           var yearcheck = parseInt(lessRYear)%parseInt(33)
           if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
               $(".checkoutdate").val(lessRYear+'-'+'12'+'-'+'30')
           }else {
               $(".checkoutdate").val(lessRYear+'-'+'12'+'-'+'29')
           }
         } else {
           var lessRDay = parseInt(checkoutdate[2])-1   
           if(lessRDay < 10){
               $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+'0'+lessRDay)
           }else {
               $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+lessRDay)
           }   
         }
       }

   }


   var departdate = $(".start_date").val().split("-");
   var returndate = $(".end_date").val().split("-");
   var PcurrentD = $(".persiancurrent").val().split("-")[2];
   var PcurrentM = $(".persiancurrent").val().split("-")[1];
   var PcurrentY = $(".persiancurrent").val().split("-")[0];
   var departMdate = $(".mstring_fdate").val().split("-");
   var returnMdate = $(".mstring_tdate").val().split("-");


   if( departMdate[2] == 1 ) {
       var lessDepMonth = parseInt(departMdate[1])-1 
       if(departMdate[1] == 1 ) {
           var lessDepYear = parseInt(departMdate[0])-1
           $(".mstring_fdate").val(lessDepYear+'-'+'12'+'-'+'31')
       }
       else if(lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
           if(lessDepMonth < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+'0'+lessDepMonth+'-'+'31')
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+lessDepMonth+'-'+'31')
           }
       }
       else if(lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11 ) {
           if(lessDepMonth < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+'0'+lessDepMonth+'-'+'30')
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+lessDepMonth+'-'+'30')
           }
       }
       else if(lessDepMonth == 2 ) {
           if ((departMdate[0] % 4 == 0) && ((departMdate[0] % 100 != 0) || (departMdate[0] % 400 == 0))) {
           if(lessDepMonth < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+'0'+lessDepMonth+'-'+'29')
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+lessDepMonth+'-'+'29')
           }
       } else {
           if(lessDepMonth < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+'0'+lessDepMonth+'-'+'28')
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+lessDepMonth+'-'+'28')
           }
       }

       }
   } else if(departMdate[2] > 1) {
       var lessDepDay = parseInt(departMdate[2])-1 
       $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+lessDepDay)
   }

   if(departdate[1] <= 7 && departdate[1] != 1){
       if(departdate[2] == 1){
           var lessDepMonth = parseInt(departdate[1])-1
           $(".start_date").val(departdate[0]+'-'+'0'+lessDepMonth+'-'+'31')
           }else {
               var lessDepDay = parseInt(departdate[2])-1   
               if(lessDepDay < 10){
                   $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+'0'+lessDepDay)
               }else {
                   $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+lessDepDay)
               }
           }  
   }else if (departdate[1] >= 8 ){
       if(departdate[2] == 1){
           var lessDepMonth = parseInt(departdate[1])-1
           if(lessDepMonth < 10){
               $(".start_date").val(departdate[0]+'-'+'0'+lessDepMonth+'-'+'30')
           }else {
               $(".start_date").val(departdate[0]+'-'+lessDepMonth+'-'+'30')
           }
           }else {
               var lessDepDay = parseInt(departdate[2])-1   
               if(lessDepDay < 10){
                   $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+'0'+lessDepDay)
               }else {
                   $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+lessDepDay)
               }  
           }
   }else if (departdate[1] == 1){
       if(departdate[2] == 1){
       var lessDepYear = parseInt(departdate[0])-1
       var yearcheck = parseInt(lessDepYear)%parseInt(33)
       if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
           $(".start_date").val(lessDepYear+'-'+'12'+'-'+'30')
       }else {
           $(".start_date").val(lessDepYear+'-'+'12'+'-'+'29')
       }
     } else {
       var lessDepDay = parseInt(departdate[2])-1   
       if(lessDepDay < 10){
           $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+'0'+lessDepDay)
       }else {
           $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+lessDepDay)
       }   
     }
   }

   // prev date for return date

   if( returnMdate[2] == 1 ) {
       var lessDepMonth = parseInt(returnMdate[1])-1 
       if(returnMdate[1] == 1 ) {
           var lessDepYear = parseInt(returnMdate[0])-1
           $(".mstring_tdate").val(lessDepYear+'-'+'12'+'-'+'31')
       }
       else if(lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
           if(lessDepMonth < 10){
               $(".mstring_tdate").val(returnMdate[0]+'-'+'0'+lessDepMonth+'-'+'31')
           }else {
               $(".mstring_tdate").val(returnMdate[0]+'-'+lessDepMonth+'-'+'31')
           }
       }
       else if(lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11 ) {
           if(lessDepMonth < 10){
               $(".mstring_tdate").val(returnMdate[0]+'-'+'0'+lessDepMonth+'-'+'30')
           }else {
               $(".mstring_tdate").val(returnMdate[0]+'-'+lessDepMonth+'-'+'30')
           }
       }
       else if(lessDepMonth == 2 ) {
           if ((returnMdate[0] % 4 == 0) && ((returnMdate[0] % 100 != 0) || (returnMdate[0] % 400 == 0))) {
           if(lessDepMonth < 10){
               $(".mstring_tdate").val(returnMdate[0]+'-'+'0'+lessDepMonth+'-'+'29')
           }else {
               $(".mstring_tdate").val(returnMdate[0]+'-'+lessDepMonth+'-'+'29')
           }
       } else {
           if(lessDepMonth < 10){
               $(".mstring_tdate").val(returnMdate[0]+'-'+'0'+lessDepMonth+'-'+'28')
           }else {
               $(".mstring_tdate").val(returnMdate[0]+'-'+lessDepMonth+'-'+'28')
           }
       }

       }
   } else if(returnMdate[2] > 1) {
       var lessDepDay = parseInt(returnMdate[2])-1 
       $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+lessDepDay)
   }

   if(returndate[1] <= 7 && returndate[1] != 1){
       if(returndate[2] == 1){
           var lessRMonth = parseInt(returndate[1])-1
           $(".end_date").val(returndate[0]+'-'+'0'+lessRMonth+'-'+'31')
           }else {
               var lessRDay = parseInt(returndate[2])-1   
               if(lessRDay < 10){
                   $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+'0'+lessRDay)
               }else {
                   $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+lessRDay)
               }
           }  
   }else if (returndate[1] >= 8 ){
       if(returndate[2] == 1){
           var lessRMonth = parseInt(returndate[1])-1
           if(lessRMonth < 10){
               $(".end_date").val(returndate[0]+'-'+'0'+lessRMonth+'-'+'30')
           }else {
               $(".end_date").val(returndate[0]+'-'+lessRMonth+'-'+'30')
           }
           }else {
               var lessRDay = parseInt(returndate[2])-1   
               if(lessRDay < 10){
                   $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+'0'+lessRDay)
               }else {
                   $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+lessRDay)
               }  
           }
   }else if (returndate[1] == 1){
       if(returndate[2] == 1){
       var lessRYear = parseInt(returndate[0])-1
       var yearcheck = parseInt(lessRYear)%parseInt(33)
       if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
           $(".end_date").val(lessRYear+'-'+'12'+'-'+'30')
       }else {
           $(".end_date").val(lessRYear+'-'+'12'+'-'+'29')
       }
     } else {
       var lessRDay = parseInt(returndate[2])-1   
       if(lessRDay < 10){
           $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+'0'+lessRDay)
       }else {
           $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+lessRDay)
       }   
     }
   }
   var newdepartY = $(".start_date").val().split("-")[0];
   var newdepartM = $(".start_date").val().split("-")[1];
   var newdepartD = $(".start_date").val().split("-")[2];
   if(PcurrentY < newdepartY){
     $(".form_search").submit();
   }
   else if(PcurrentY == newdepartY){
       if(PcurrentM < newdepartM){
           $(".form_search").submit();
        } else if(PcurrentM == newdepartM){
           if(PcurrentD <= newdepartD){
              $(".form_search").submit();
           }
       }
    }
 }
function NextDate() {

   if($(".checkinMdate").val() !== undefined && $(".checkinMdate").val() !== ""){
       var checkinMdate = $(".checkinMdate").val().split("-");
       var checkoutMdate = $(".checkoutMdate").val().split("-");

       if(checkinMdate[1] == 1 || checkinMdate[1] == 3 || checkinMdate[1] == 5 || checkinMdate[1] == 7 || checkinMdate[1] == 8 || checkinMdate[1] == 10 ) {
           if(checkinMdate[2] < 31){
               var sumDepday = parseInt(checkinMdate[2])+1
               if(sumDepday < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+'0'+sumDepday)
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+sumDepday)
               }
            }else if(checkinMdate[2] = 31) {
               var sumDepMonth = parseInt(checkinMdate[1])+1
               if(sumDepMonth < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+sumDepMonth+'-'+'01')
               }
            }
       }
       else if(checkinMdate[1] == 12 ) {
           var sumDepyear = parseInt(checkinMdate[0])+1
           $(".checkinMdate").val(sumDepyear+'-'+'01'+'-'+'01')
       }
       else if(checkinMdate[1] == 4 || checkinMdate[1] == 6 || checkinMdate[1] == 9 || checkinMdate[1] == 11) {
           if(checkinMdate[2] < 30){
               var sumDepday = parseInt(checkinMdate[2])+1
               if(sumDepday < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+'0'+sumDepday)
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+sumDepday)
               }
            }else if(checkinMdate[2] = 30) {
               var sumDepMonth = parseInt(checkinMdate[1])+1
               if(sumDepMonth < 10){
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
               }else {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+sumDepMonth+'-'+'01')
               }
            }
       }
       else if(checkinMdate[1] == 2 ) {
           if ((checkinMdate[0] % 4 == 0) && ((checkinMdate[0] % 100 != 0) || (checkinMdate[0] % 400 == 0))) {
               if(checkinMdate[2] < 29){
                   var sumDepday = parseInt(checkinMdate[2])+1
                   if(sumDepday < 10){
                       $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+'0'+sumDepday)
                   }else {
                       $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+sumDepday)
                   }
                }else if(checkinMdate[2] = 29) {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'03'+'-'+'01')
                }
           } else {
               if(checkinMdate[2] < 28){
                   var sumDepday = parseInt(checkinMdate[2])+1
                   if(sumDepday < 10){
                       $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+'0'+sumDepday)
                   }else {
                       $(".checkinMdate").val(checkinMdate[0]+'-'+checkinMdate[1]+'-'+sumDepday)
                   }
                }else if(checkinMdate[2] = 28) {
                   $(".checkinMdate").val(checkinMdate[0]+'-'+'03'+'-'+'01')
                }
           }
       }
       if(checkoutMdate[1] == 1 || checkoutMdate[1] == 3 || checkoutMdate[1] == 5 || checkoutMdate[1] == 7 || checkoutMdate[1] == 8 || checkoutMdate[1] == 10 ) {
           if(checkoutMdate[2] < 31){
               var sumDepday = parseInt(checkoutMdate[2])+1
               if(sumDepday < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+'0'+sumDepday)
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+sumDepday)
               }
            }else if(checkoutMdate[2] = 31) {
               var sumDepMonth = parseInt(checkoutMdate[1])+1
               if(sumDepMonth < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+sumDepMonth+'-'+'01')
               }
            }
       }
       else if(checkoutMdate[1] == 12 ) {
           var sumDepyear = parseInt(checkoutMdate[0])+1
           $(".checkoutMdate").val(sumDepyear+'-'+'01'+'-'+'01')
       }
       else if(checkoutMdate[1] == 4 || checkoutMdate[1] == 6 || checkoutMdate[1] == 9 || checkoutMdate[1] == 11) {
           if(checkoutMdate[2] < 30){
               var sumDepday = parseInt(checkoutMdate[2])+1
               if(sumDepday < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+'0'+sumDepday)
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+sumDepday)
               }
            }else if(checkoutMdate[2] = 30) {
               var sumDepMonth = parseInt(checkoutMdate[1])+1
               if(sumDepMonth < 10){
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
               }else {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+sumDepMonth+'-'+'01')
               }
            }
       }
       else if(checkoutMdate[1] == 2 ) {
           if ((checkoutMdate[0] % 4 == 0) && ((checkoutMdate[0] % 100 != 0) || (checkoutMdate[0] % 400 == 0))) {
               if(checkoutMdate[2] < 29){
                   var sumDepday = parseInt(checkoutMdate[2])+1
                   if(sumDepday < 10){
                       $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+'0'+sumDepday)
                   }else {
                       $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+sumDepday)
                   }
                }else if(checkoutMdate[2] = 29) {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'03'+'-'+'01')
                }
           } else {
               if(checkoutMdate[2] < 28){
                   var sumDepday = parseInt(checkoutMdate[2])+1
                   if(sumDepday < 10){
                       $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+'0'+sumDepday)
                   }else {
                       $(".checkoutMdate").val(checkoutMdate[0]+'-'+checkoutMdate[1]+'-'+sumDepday)
                   }
                }else if(checkoutMdate[2] = 28) {
                   $(".checkoutMdate").val(checkoutMdate[0]+'-'+'03'+'-'+'01')
                }
           }
       }

   }

   if($(".checkindate").val() !== undefined && $(".checkindate").val() !== ""){
       var checkindate = $(".checkindate").val().split("-");
       var checkoutdate = $(".checkoutdate").val().split("-");
       if(checkindate[1] < 7 ){
           if(checkindate[2] < 31){
              var sumDepday = parseInt(checkindate[2])+1
              if(sumDepday < 10){
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+'0'+sumDepday)
              }else {
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+sumDepday)
              }
           }else if(checkindate[2] = 31) {
              var sumDepMonth = parseInt(checkindate[1])+1
              if(sumDepMonth < 10){
                  $(".checkindate").val(checkindate[0]+'-'+'0'+sumDepMonth+'-'+'01')
              }else {
                  $(".checkindate").val(checkindate[0]+'-'+sumDepMonth+'-'+'01')
              }
           }
         }else if(checkindate[1] >= 7 && checkindate[1] != 12){
          if(checkindate[2] < 30){
              var sumDepday = parseInt(checkindate[2])+1
              if(sumDepday < 10){
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+'0'+sumDepday)
              }else {
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+sumDepday)
              }
           }else if(checkindate[2] = 30) {
              var sumDepMonth = parseInt(checkindate[1])+1
              if(sumDepMonth < 10){
                  $(".checkindate").val(checkindate[0]+'-'+'0'+sumDepMonth+'-'+'01')
              }else {
                  $(".checkindate").val(checkindate[0]+'-'+sumDepMonth+'-'+'01')
              }
           }
         }else if (checkindate[1] == 12){
           var yearcheck = parseInt(checkindate[0])%parseInt(33)
             if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
                 if(checkindate[2] < 30){
              var sumDepday = parseInt(checkindate[2])+1
              if(sumDepday < 10){
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+'0'+sumDepday)
              }else {
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+sumDepday)
              }
           }else if(checkindate[2] = 30) {
              var sumDepyear = parseInt(checkindate[0])+1
              $(".checkindate").val(sumDepyear+'-'+'01'+'-'+'01')
           }
             }else {
              if(checkindate[2] < 29){
              var sumDepday = parseInt(checkindate[2])+1
              if(sumDepday < 10){
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+'0'+sumDepday)
              }else {
                  $(".checkindate").val(checkindate[0]+'-'+checkindate[1]+'-'+sumDepday)
              }
           }else if(checkindate[2] = 29) {
              var sumDepyear = parseInt(checkindate[0])+1
              $(".checkindate").val(sumDepyear+'-'+'01'+'-'+'01')
           }
     
             }
          }
     // next date for return date
     
     if(checkoutdate[1] < 7 ){
           if(checkoutdate[2] < 31){
              var sumRday = parseInt(checkoutdate[2])+1
              if(sumRday < 10){
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+'0'+sumRday)
              }else {
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+sumRday)
              }
           }else if(checkoutdate[2] = 31) {
              var sumRMonth = parseInt(checkoutdate[1])+1
              if(sumRMonth < 10){
                  $(".checkoutdate").val(checkoutdate[0]+'-'+'0'+sumRMonth+'-'+'01')
              }else {
                  $(".checkoutdate").val(checkoutdate[0]+'-'+sumRMonth+'-'+'01')
              }
           }
         }else if(checkoutdate[1] >= 7 && checkoutdate[1] != 12){
          if(checkoutdate[2] < 30){
              var sumRday = parseInt(checkoutdate[2])+1
              if(sumRday < 10){
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+'0'+sumRday)
              }else {
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+sumRday)
              }
           }else if(checkoutdate[2] = 30) {
              var sumRMonth = parseInt(checkoutdate[1])+1
              if(sumRMonth < 10){
                  $(".checkoutdate").val(checkoutdate[0]+'-'+'0'+sumRMonth+'-'+'01')
              }else {
                  $(".checkoutdate").val(checkoutdate[0]+'-'+sumRMonth+'-'+'01')
              }
           }
         }else if (checkoutdate[1] == 12){
           var yearcheck = parseInt(checkoutdate[0])%parseInt(33)
             if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
                 if(checkoutdate[2] < 30){
              var sumRday = parseInt(checkoutdate[2])+1
              if(sumRday < 10){
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+'0'+sumRday)
              }else {
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+sumRday)
              }
           }else if(checkoutdate[2] = 30) {
              var sumRyear = parseInt(checkoutdate[0])+1
              $(".checkoutdate").val(sumRyear+'-'+'01'+'-'+'01')
           }
             }else {
              if(checkoutdate[2] < 29){
              var sumRday = parseInt(checkoutdate[2])+1
              if(sumRday < 10){
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+'0'+sumRday)
              }else {
                  $(".checkoutdate").val(checkoutdate[0]+'-'+checkoutdate[1]+'-'+sumRday)
              }
           }else if(checkoutdate[2] = 29) {
              var sumRyear = parseInt(checkoutdate[0])+1
              $(".checkoutdate").val(sumRyear+'-'+'01'+'-'+'01')
           }
     
             }
          }
   }

   var departdate = $(".start_date").val().split("-");
   var returndate = $(".end_date").val().split("-");

   var departMdate = $(".mstring_fdate").val().split("-");
   var returnMdate = $(".mstring_tdate").val().split("-");

   if(departMdate[1] == 1 || departMdate[1] == 3 || departMdate[1] == 5 || departMdate[1] == 7 || departMdate[1] == 8 || departMdate[1] == 10 ) {
       if(departMdate[2] < 31){
           var sumDepday = parseInt(departMdate[2])+1
           if(sumDepday < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+'0'+sumDepday)
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+sumDepday)
           }
        }else if(departMdate[2] = 31) {
           var sumDepMonth = parseInt(departMdate[1])+1
           if(sumDepMonth < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+sumDepMonth+'-'+'01')
           }
        }
   }
   else if(departMdate[1] == 12 ) {
       var sumDepyear = parseInt(departMdate[0])+1
       $(".mstring_fdate").val(sumDepyear+'-'+'01'+'-'+'01')
   }
   else if(departMdate[1] == 4 || departMdate[1] == 6 || departMdate[1] == 9 || departMdate[1] == 11) {
       if(departMdate[2] < 30){
           var sumDepday = parseInt(departMdate[2])+1
           if(sumDepday < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+'0'+sumDepday)
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+sumDepday)
           }
        }else if(departMdate[2] = 30) {
           var sumDepMonth = parseInt(departMdate[1])+1
           if(sumDepMonth < 10){
               $(".mstring_fdate").val(departMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
           }else {
               $(".mstring_fdate").val(departMdate[0]+'-'+sumDepMonth+'-'+'01')
           }
        }
   }
   else if(departMdate[1] == 2 ) {
       if ((departMdate[0] % 4 == 0) && ((departMdate[0] % 100 != 0) || (departMdate[0] % 400 == 0))) {
           if(departMdate[2] < 29){
               var sumDepday = parseInt(departMdate[2])+1
               if(sumDepday < 10){
                   $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+'0'+sumDepday)
               }else {
                   $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+sumDepday)
               }
            }else if(departMdate[2] = 29) {
               $(".mstring_fdate").val(departMdate[0]+'-'+'03'+'-'+'01')
            }
       } else {
           if(departMdate[2] < 28){
               var sumDepday = parseInt(departMdate[2])+1
               if(sumDepday < 10){
                   $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+'0'+sumDepday)
               }else {
                   $(".mstring_fdate").val(departMdate[0]+'-'+departMdate[1]+'-'+sumDepday)
               }
            }else if(departMdate[2] = 28) {
               $(".mstring_fdate").val(departMdate[0]+'-'+'03'+'-'+'01')
            }
       }
   }

   if(departdate[1] < 7 ){
     if(departdate[2] < 31){
        var sumDepday = parseInt(departdate[2])+1
        if(sumDepday < 10){
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+'0'+sumDepday)
        }else {
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+sumDepday)
        }
     }else if(departdate[2] = 31) {
        var sumDepMonth = parseInt(departdate[1])+1
        if(sumDepMonth < 10){
            $(".start_date").val(departdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
        }else {
            $(".start_date").val(departdate[0]+'-'+sumDepMonth+'-'+'01')
        }
     }
   }else if(departdate[1] >= 7 && departdate[1] != 12){
    if(departdate[2] < 30){
        var sumDepday = parseInt(departdate[2])+1
        if(sumDepday < 10){
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+'0'+sumDepday)
        }else {
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+sumDepday)
        }
     }else if(departdate[2] = 30) {
        var sumDepMonth = parseInt(departdate[1])+1
        if(sumDepMonth < 10){
            $(".start_date").val(departdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
        }else {
            $(".start_date").val(departdate[0]+'-'+sumDepMonth+'-'+'01')
        }
     }
   }else if (departdate[1] == 12){
     var yearcheck = parseInt(departdate[0])%parseInt(33)
       if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
           if(departdate[2] < 30){
        var sumDepday = parseInt(departdate[2])+1
        if(sumDepday < 10){
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+'0'+sumDepday)
        }else {
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+sumDepday)
        }
     }else if(departdate[2] = 30) {
        var sumDepyear = parseInt(departdate[0])+1
        $(".start_date").val(sumDepyear+'-'+'01'+'-'+'01')
     }
       }else {
        if(departdate[2] < 29){
        var sumDepday = parseInt(departdate[2])+1
        if(sumDepday < 10){
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+'0'+sumDepday)
        }else {
            $(".start_date").val(departdate[0]+'-'+departdate[1]+'-'+sumDepday)
        }
     }else if(departdate[2] = 29) {
        var sumDepyear = parseInt(departdate[0])+1
        $(".start_date").val(sumDepyear+'-'+'01'+'-'+'01')
     }

       }
    }
// next date for return date

if(returnMdate[1] == 1 || returnMdate[1] == 3 || returnMdate[1] == 5 || returnMdate[1] == 7 || returnMdate[1] == 8 || returnMdate[1] == 10 ) {
   if(returnMdate[2] < 31){
       var sumDepday = parseInt(returnMdate[2])+1
       if(sumDepday < 10){
           $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+'0'+sumDepday)
       }else {
           $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+sumDepday)
       }
    }else if(returnMdate[2] = 31) {
       var sumDepMonth = parseInt(returnMdate[1])+1
       if(sumDepMonth < 10){
           $(".mstring_tdate").val(returnMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
       }else {
           $(".mstring_tdate").val(returnMdate[0]+'-'+sumDepMonth+'-'+'01')
       }
    }
}
else if(returnMdate[1] == 12 ) {
   var sumDepyear = parseInt(returnMdate[0])+1
   $(".mstring_tdate").val(sumDepyear+'-'+'01'+'-'+'01')
}
else if(returnMdate[1] == 4 || returnMdate[1] == 6 || returnMdate[1] == 9 || returnMdate[1] == 11) {
   if(returnMdate[2] < 30){
       var sumDepday = parseInt(returnMdate[2])+1
       if(sumDepday < 10){
           $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+'0'+sumDepday)
       }else {
           $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+sumDepday)
       }
    }else if(returnMdate[2] = 30) {
       var sumDepMonth = parseInt(returnMdate[1])+1
       if(sumDepMonth < 10){
           $(".mstring_tdate").val(returnMdate[0]+'-'+'0'+sumDepMonth+'-'+'01')
       }else {
           $(".mstring_tdate").val(returnMdate[0]+'-'+sumDepMonth+'-'+'01')
       }
    }
}
else if(returnMdate[1] == 2 ) {
   if ((returnMdate[0] % 4 == 0) && ((returnMdate[0] % 100 != 0) || (returnMdate[0] % 400 == 0))) {
       if(returnMdate[2] < 29){
           var sumDepday = parseInt(returnMdate[2])+1
           if(sumDepday < 10){
               $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+'0'+sumDepday)
           }else {
               $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+sumDepday)
           }
        }else if(returnMdate[2] = 29) {
           $(".mstring_tdate").val(returnMdate[0]+'-'+'03'+'-'+'01')
        }
   } else {
       if(returnMdate[2] < 28){
           var sumDepday = parseInt(returnMdate[2])+1
           if(sumDepday < 10){
               $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+'0'+sumDepday)
           }else {
               $(".mstring_tdate").val(returnMdate[0]+'-'+returnMdate[1]+'-'+sumDepday)
           }
        }else if(returnMdate[2] = 28) {
           $(".mstring_tdate").val(returnMdate[0]+'-'+'03'+'-'+'01')
        }
   }
}

if(returndate[1] < 7 ){
     if(returndate[2] < 31){
        var sumRday = parseInt(returndate[2])+1
        if(sumRday < 10){
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+'0'+sumRday)
        }else {
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+sumRday)
        }
     }else if(returndate[2] = 31) {
        var sumRMonth = parseInt(returndate[1])+1
        if(sumRMonth < 10){
            $(".end_date").val(returndate[0]+'-'+'0'+sumRMonth+'-'+'01')
        }else {
            $(".end_date").val(returndate[0]+'-'+sumRMonth+'-'+'01')
        }
     }
   }else if(returndate[1] >= 7 && returndate[1] != 12){
    if(returndate[2] < 30){
        var sumRday = parseInt(returndate[2])+1
        if(sumRday < 10){
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+'0'+sumRday)
        }else {
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+sumRday)
        }
     }else if(returndate[2] = 30) {
        var sumRMonth = parseInt(returndate[1])+1
        if(sumRMonth < 10){
            $(".end_date").val(returndate[0]+'-'+'0'+sumRMonth+'-'+'01')
        }else {
            $(".end_date").val(returndate[0]+'-'+sumRMonth+'-'+'01')
        }
     }
   }else if (returndate[1] == 12){
     var yearcheck = parseInt(returndate[0])%parseInt(33)
       if(yearcheck == 13 || yearcheck == 17 ||  yearcheck == 22 || yearcheck == 26 || yearcheck == 30){
           if(returndate[2] < 30){
        var sumRday = parseInt(returndate[2])+1
        if(sumRday < 10){
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+'0'+sumRday)
        }else {
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+sumRday)
        }
     }else if(returndate[2] = 30) {
        var sumRyear = parseInt(returndate[0])+1
        $(".end_date").val(sumRyear+'-'+'01'+'-'+'01')
     }
       }else {
        if(returndate[2] < 29){
        var sumRday = parseInt(returndate[2])+1
        if(sumRday < 10){
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+'0'+sumRday)
        }else {
            $(".end_date").val(returndate[0]+'-'+returndate[1]+'-'+sumRday)
        }
     }else if(returndate[2] = 29) {
        var sumRyear = parseInt(returndate[0])+1
        $(".end_date").val(sumRyear+'-'+'01'+'-'+'01')
     }

       }
    }
    $(".form_search").submit();
 }
 //<!----------------------------END JS CHANGE DATE ------------------------------>