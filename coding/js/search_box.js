$(document).ready(function () {
    $("#backtoback").click(function () {
        $(this).addClass("active-flight-type");
        $(this).closest("#item-Flight").find(".second").addClass("nextCalOpening")
        $(this).find("input").prop('checked', true)
        $(this).siblings("li").find("input").prop('checked', false)
        $("#oneway").removeClass("active-flight-type");
        $("#flight-form #inp2").prop("disabled", false);
        $("#flight-form #inp2").closest("div").removeClass("Noactive-date");
        $("#flight-form #inp2").addClass("nextCalOpening");
        if ($(window).width() <= 750) {
            $("#flight-form").attr('action', '/M_Roundtrip_Search.bc')
        }
    });
    $("#oneway").click(function () {
        $(this).addClass("active-flight-type");
        $(this).closest("#item-Flight").find(".second").removeClass("nextCalOpening")
        $(this).find("input").prop('checked', true)
        $(this).siblings("li").find("input").prop('checked', false)
        $("#backtoback").removeClass("active-flight-type");
        $("#flight-form #inp2").prop("disabled", true);
        $("#flight-form #inp2").closest("div").addClass("Noactive-date");
        $("#flight-form #inp2").removeClass("nextCalOpening");
        if ($(window).width() <= 750) {
            $("#flight-form").attr('action', '/M_Oneway_Search.bc')
        }
    });
});
if ($(window).width() <= 750) {
    if ($("#flight-form").attr('action') == '/roundtrip_search.bc') {
        $("#flight-form").attr('action', '/M_Roundtrip_Search.bc')
    }
    if ($("#flight-form").attr('action') == '/oneway_search.bc') {
        $("#flight-form").attr('action', '/M_Oneway_Search.bc')
    }
}

function openNextCal(e) {
    let returnDate = $("#flight-form").find('.nextCalOpening').val();
    if (returnDate == '') {
        $("#flight-form").find('.nextCalOpening').trigger("onclick");
    }
};
$(".form-search").submit(function (event) {
    $(this).find(
        "input[name=fdate],input[name=tdate],input[type=text].FCD1 ,input[type=text].FCD2,input[type=text].FCD"
    ).each(function () {
        if ($(this).val() == '' && !$(this).is(':disabled')) {
            event.preventDefault();
            $(this).after('<span class="notification p-absolute">*</span>')
        } else {
            $(this).closest("div").find(".notification").remove()
        }
    })

})

function sharing(element) {
    var val = $(element).prop("checked")
    if (val == true) {
        $(element).val(1)
    } else if (val == false) {
        $(element).val(0)
    }
}

if ($(".chagencyuser").val() == '2') {
    $(".share").show()
}
$("#flight-form").submit(function (event) {
    var select_age = "";
    $(this).find(".section-select-age select").each(function () {
        select_age = select_age + $(this).val() + ',';
    });
    if (select_age !== '') {
        $(this).find(".select-age-value").val(select_age)
        var val_1 = $(this).find(".select-age-value").val()
        var val_2 = val_1.replace(/,(?=[^,]*$)/, '')
        $(this).find(".select-age-value").val(val_2)
    } else {
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
        if (age < 3) {
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
    // $(element).val('')
    //$(element).closest(".city").find(".co-id").val('')
    $(element).closest(".city").find(".country").val('')
    $(element).closest(".city").find(".searchList").fadeIn()
    $(element).closest(".city").find(".country").focus();
    $(element).closest(".city").find(".ul-list").show()
    $(element).closest(".city").siblings(".city").find(".searchList").fadeOut()
}

$('.country').each(function () {
    $(this).on('blur', function () {
        if ($(this).closest(".city").find(".countryFlight").text().length > 0) {
            if (hoverelse == 0) {
                var defresult = $(this).closest(".city").find(".countryFlight")
                    .children(".selectCountry:first").find(".txtcountry")
                    .text();

                var defresultid = $(this).closest(".city").find(".countryFlight").children(
                    ".selectCountry:first").find(".countryid").val();
                var defresult_Split = defresult.split("(")
                $(this).closest(".city").find(".split-text").text(defresult_Split[0])
                $(this).closest(".city").find(".text-value").val(defresult);
                $(this).closest(".city").find(".co-id").val(defresultid);
                $(this).closest(".city").find(".countryFlight").empty();
                $(this).closest(".city").find(".searchList").hide();
            }
        } else {
            $(this).closest(".city").find(".mini-loading").hide()
            //$(this).closest(".city").find(".text-value").val('');
            //$(this).closest(".city").find(".co-id").val('');
        }
    });

});

function city_search(element) {
    if (element.which !== 0 && !element.ctrlKey && !element.metaKey && !element.altKey) {
        upper_case = $(element).val().substr(0, 1).toUpperCase() + $(element).val().substr(1).toLowerCase();
        $(element).val(upper_case)
        if ($(element).val().length > 2) {
            $(element).closest(".city").find(".mini-loading").show();
            $(element).closest(".city").find(".ul-list").hide()
            $.ajax({
                url: '/Client_City_Search.bc',
                type: 'get',
                data: {
                    term: $(element).val(),
                    type: $(element).attr('data-type'),
                    select_value: 0
                },
                success: function (result) {
                    $(element).closest(".city").find(".mini-loading").hide();
                    $(element).closest(".city").find(".countryFlight").empty().html(result)
                }
            });
        } else {
            $(element).closest(".city").find(".countryFlight").empty()
            $(element).closest(".city").find(".ul-list").show()
        }

    }
}

function SelectPlace(element) {
    var idSelected = $(element).attr("data-id")
    var textSelected = $(element).find("span").text()
    var textSelected_split = textSelected.split("-")
    $(element).closest(".city").find(".text-value").val(textSelected)
    $(element).closest(".city").find(".co-id").val(idSelected)
    $(element).closest(".city").find(".split-text").text(textSelected_split[0])
    $(element).closest(".city").find(".searchList").fadeOut()
    $(element).closest(".city").next(".city").find(".click-content").trigger("onclick")
}


$(".fa-exchange-alt").click(function () {
    var dep = $(this).closest("form").find(".FCD1").val()
    var des = $(this).closest("form").find(".FCD2").val()
    var depid = $(this).closest("form").find(".FCDid1").val()
    var desid = $(this).closest("form").find(".FCDid2").val()
    var depTxt = $(this).closest("form").find(".dep-txt").text()
    var desTxt = $(this).closest("form").find(".des-txt").text()
    $(this).closest("form").find(".FCD1").val(des)
    $(this).closest("form").find(".FCD2").val(dep)
    $(this).closest("form").find(".FCDid1").val(desid)
    $(this).closest("form").find(".FCDid2").val(depid)
    $(this).closest("form").find(".dep-txt").text(desTxt)
    $(this).closest("form").find(".des-txt").text(depTxt)
})

function confirm_search(element) {
    $(element).closest("form").find(".CountPassenger").fadeOut()
}

function show_passengers(element) {
    $(element).closest("form").find(".CountPassenger").fadeIn()
}

$(document).on('click', function (event) {
    if (!$(event.target).closest('.searchList,.city ,.selectCountry').length) {
        $(".searchList").fadeOut();
    }
    if (!$(event.target).closest('.item-CountPassenger, .passenger_section,.section-select-age').length) {
        $(".CountPassenger").fadeOut();
    }
})

function select_adult(element) {
    $(element).closest("form").find(".adult-count").text($(element).attr("data-cy"))
    $(element).addClass("selected")
    $(element).siblings("li").removeClass("selected")
    $(element).closest("form").find(".adult").val($(element).attr("data-cy"))
}

function select_child(element) {
    $(element).closest("form").find(".section-select-age").empty()
    if ($(element).attr("data-cy") != 0) {
        $(element).closest("form").find(".count-passenger-child").removeClass("unvisible")
        for (var i = 1; i <= $(element).attr("data-cy"); i++) {
            $(element).closest("form").find(".section-select-age").append('<div class="select-arrow p-relative float-right"><label>سن کودک ' + i + '</label><_select class="select-search-input border-radius"><_option value="1">تا 1 سال</option_><_option value="2">1 تا 2  </option_><_option value="3">2 تا 3 </option_><_option value="4">3 تا 4  </option_><_option value="5">4 تا 5 </option_><_option value="6">5 تا 6 </option_><_option value="7">6 تا 7 </option_><_option value="8">7 تا 8 </option_><_option value="9">8 تا 9 </option_><_option value="10">9 تا 10 </option_><_option value="11">10 تا 11 </option_><_option value="12">11 تا 12 </option_></select_></div>')
        }
    } else {
        $(element).closest("form").find(".count-passenger-child").addClass("unvisible")
    }
    $(element).closest("form").find(".child-count").text($(element).attr("data-cy"))
    $(element).addClass("selected")
    $(element).siblings("li").removeClass("selected")
    $(element).closest("form").find(".child").val($(element).attr("data-cy"))
}

function select_class(element) {
    $(element).closest("form").find(".class-select").text($(element).attr("data-cy"))
    $(element).addClass("selected")
    $(element).siblings("li").removeClass("selected")
    $(element).closest("form").find(".FlightClass").val($(element).attr("data-val"))
}