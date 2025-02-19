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
        if ($("#flight-form #inp2").val() == '') {
            $("#flight-form .start_date").trigger("onclick");
        }
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
    // let returnDate = $("#flight-form").find('.nextCalOpening').val();
    //if (returnDate == '') {
    $("#flight-form").find('.nextCalOpening').trigger("onclick");
    //}
};

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
    $(this).find(
        "input[name=fdate],input[name=tdate],input[type=text].FCD1 ,input[type=text].FCD2,input[type=text].FCD"
    ).each(function () {
        if ($(this).val() == '' && !$(this).is(':disabled')) {
            event.preventDefault();
            $(this).after('<span class="notification p-absolute">*</span>')
            $(this).closest(".result-for").find(".selected-day").empty()
            $(this).closest(".result-for").find(".selected-month").empty()
            $(this).closest(".result-for").addClass("input-alarm")
        } else {
            $(this).closest("div").find(".notification").remove()
            $(this).closest(".result-for").removeClass("input-alarm")
        }
    })
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
            $(element).closest("form").find(".section-select-age").append('<div class="select-arrow p-relative float-right"><label>سن کودک ' + i + '</label><select class="select-search-input border-radius"><option value="1">تا 1 سال</option><option value="2">1 تا 2  </option><option value="3">2 تا 3 </option><option value="4">3 تا 4  </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>')
        }
    } else {
        $(element).closest("form").find(".count-passenger-child").addClass("unvisible")
    }
    $(element).closest("form").find(".child").val($(element).attr("data-val"))
    $(element).closest("form").find(".child-count").text($(element).attr("data-cy"))
    $(element).addClass("selected")
    $(element).siblings("li").removeClass("selected")

}

function select_class(element) {
    $(element).closest("form").find(".class-select").text($(element).attr("data-cy"))
    $(element).addClass("selected")
    $(element).siblings("li").removeClass("selected")
    $(element).closest("form").find(".FlightClass").val($(element).attr("data-val"))
}

//<!----------------------------START JS RESEARCH ------------------------------>
$(document).ready(function () {
    var age = $(".research").find(".select-age-value").val()
    if (age !== undefined) {
        if (age != 0) {
            var splage = age.split(",")
            for (var i = 0; i < splage.length; i++) {
                var j = i + 1
                if ((splage[i] - 1) == 0) {
                    $(".research").find(".section-select-age").append(
                        '<div class="select-arrow p-relative float-right"><label>سن کودک ' + j +
                        '</label><select class="select-search-input border-radius"><option value="' +
                        splage[i] + '"> تا ' + splage[i] +
                        ' سال</option><option value="1">تا 1 سال</option><option value="2">1 تا 2  </option><option value="3">2 تا 3 </option><option value="4">3 تا 4  </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>'
                    )

                } else {
                    $(".research").find(".section-select-age").append(
                        '<div class="select-arrow p-relative float-right"><label>سن کودک ' + j +
                        '</label><select class="select-search-input border-radius"><option value="' +
                        splage[i] + '">' + (splage[i] - 1) + ' تا ' + splage[i] +
                        '</option><option value="1">تا 1 سال</option><option value="2">1 تا 2  </option><option value="3">2 تا 3 </option><option value="4">3 تا 4  </option><option value="5">4 تا 5 </option><option value="6">5 تا 6 </option><option value="7">6 تا 7 </option><option value="8">7 تا 8 </option><option value="9">8 تا 9 </option><option value="10">9 تا 10 </option><option value="11">10 تا 11 </option><option value="12">11 تا 12 </option></select></div>'
                    )
                }
            }
        }
    }
    $(".research").find(".select-search-input").each(function () {
        var selected = $(this).find('option:selected').val()
        $(this).find('option:selected').remove()
        $(this).find('option:not(:selected)').each(function () {
            var Notselected = $(this).val();
            if (Notselected == selected) {
                $(this).attr('selected', true)
            }
        });
    })

    $(".research").find(".child-count").text($(".research").find(".child-count").text().replace(/,/, ""))


});
$(".title-searched").each(function () {
    if ($(this).val().indexOf('-') > -1) {
        var element_Split = $(this).val().split("-")
        $(this).closest(".city").find(".split-text").text(element_Split[1])
    } else {
        var element_Split = $(this).val().split("(")
        $(this).closest(".city").find(".split-text").text(element_Split[0])
    }
})
$(".research").find(".select_adult li").each(function () {
    if ($(this).attr("data-cy") == $(".research").find(".adult").val()) {
        $(this).addClass("selected")
        $(this).siblings("li").removeClass("selected")
    }
})
$(".research").find(".select_child li").each(function () {
    if ($(this).attr("data-val") == $(".research").find(".child").val()) {
        $(this).addClass("selected")
        $(this).siblings("li").removeClass("selected")
    }
})
$(".research").find(".flight-class li").each(function () {
    if ($(this).attr("data-val") == $(".research").find(".FlightClass").val()) {
        $(this).addClass("selected")
        $(this).siblings("li").removeClass("selected")
    }
})
//<!----------------------------START JS CHANGE DATE ------------------------------>
function PrevDate() {

    if ($(".checkinMdate").val() !== undefined && $(".checkinMdate").val() !== "") {
        var checkinMdate = $(".checkinMdate").val().split("-");
        var checkoutMdate = $(".checkoutMdate").val().split("-");

        if (checkinMdate[2] == 1) {
            var lessDepMonth = parseInt(checkinMdate[1]) - 1
            if (checkinMdate[1] == 1) {
                var lessDepYear = parseInt(checkinMdate[0]) - 1
                $(".checkinMdate").val(lessDepYear + '-' + '12' + '-' + '31')
            } else if (lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
                if (lessDepMonth < 10) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + '0' + lessDepMonth + '-' + '31')
                } else {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + lessDepMonth + '-' + '31')
                }
            } else if (lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11) {
                if (lessDepMonth < 10) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + '0' + lessDepMonth + '-' + '30')
                } else {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + lessDepMonth + '-' + '30')
                }
            } else if (lessDepMonth == 2) {
                if ((checkinMdate[0] % 4 == 0) && ((checkinMdate[0] % 100 != 0) || (checkinMdate[0] % 400 == 0))) {
                    if (lessDepMonth < 10) {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + '0' + lessDepMonth + '-' + '29')
                    } else {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + lessDepMonth + '-' + '29')
                    }
                } else {
                    if (lessDepMonth < 10) {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + '0' + lessDepMonth + '-' + '28')
                    } else {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + lessDepMonth + '-' + '28')
                    }
                }

            }
        } else if (checkinMdate[2] > 1) {
            var lessDepDay = parseInt(checkinMdate[2]) - 1
            $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + lessDepDay)
        }

        // prev checkout date

        if (checkoutMdate[2] == 1) {
            var lessDepMonth = parseInt(checkoutMdate[1]) - 1
            if (checkoutMdate[1] == 1) {
                var lessDepYear = parseInt(checkoutMdate[0]) - 1
                $(".checkoutMdate").val(lessDepYear + '-' + '12' + '-' + '31')
            } else if (lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
                if (lessDepMonth < 10) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + '0' + lessDepMonth + '-' + '31')
                } else {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + lessDepMonth + '-' + '31')
                }
            } else if (lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11) {
                if (lessDepMonth < 10) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + '0' + lessDepMonth + '-' + '30')
                } else {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + lessDepMonth + '-' + '30')
                }
            } else if (lessDepMonth == 2) {
                if ((checkoutMdate[0] % 4 == 0) && ((checkoutMdate[0] % 100 != 0) || (checkoutMdate[0] % 400 == 0))) {
                    if (lessDepMonth < 10) {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + '0' + lessDepMonth + '-' + '29')
                    } else {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + lessDepMonth + '-' + '29')
                    }
                } else {
                    if (lessDepMonth < 10) {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + '0' + lessDepMonth + '-' + '28')
                    } else {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + lessDepMonth + '-' + '28')
                    }
                }

            }
        } else if (checkoutMdate[2] > 1) {
            var lessDepDay = parseInt(checkoutMdate[2]) - 1
            $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + lessDepDay)
        }
    }

    if ($(".checkindate").val() !== undefined && $(".checkindate").val() !== "") {
        var checkindate = $(".checkindate").val().split("-");
        var checkoutdate = $(".checkoutdate").val().split("-");

        if (checkindate[1] <= 7 && checkindate[1] != 1) {
            if (checkindate[2] == 1) {
                var lessDepMonth = parseInt(checkindate[1]) - 1
                $(".checkindate").val(checkindate[0] + '-' + '0' + lessDepMonth + '-' + '31')
            } else {
                var lessDepDay = parseInt(checkindate[2]) - 1
                if (lessDepDay < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + '0' + lessDepDay)
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + lessDepDay)
                }
            }
        } else if (checkindate[1] >= 8) {
            if (checkindate[2] == 1) {
                var lessDepMonth = parseInt(checkindate[1]) - 1
                if (lessDepMonth < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + '0' + lessDepMonth + '-' + '30')
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + lessDepMonth + '-' + '30')
                }
            } else {
                var lessDepDay = parseInt(checkindate[2]) - 1
                if (lessDepDay < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + '0' + lessDepDay)
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + lessDepDay)
                }
            }
        } else if (checkindate[1] == 1) {
            if (checkindate[2] == 1) {
                var lessDepYear = parseInt(checkindate[0]) - 1
                var yearcheck = parseInt(lessDepYear) % parseInt(33)
                if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
                    $(".checkindate").val(lessDepYear + '-' + '12' + '-' + '30')
                } else {
                    $(".checkindate").val(lessDepYear + '-' + '12' + '-' + '29')
                }
            } else {
                var lessDepDay = parseInt(checkindate[2]) - 1
                if (lessDepDay < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + '0' + lessDepDay)
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + lessDepDay)
                }
            }
        }

        // prev date for return date

        if (checkoutdate[1] <= 7 && checkoutdate[1] != 1) {
            if (checkoutdate[2] == 1) {
                var lessRMonth = parseInt(checkoutdate[1]) - 1
                $(".checkoutdate").val(checkoutdate[0] + '-' + '0' + lessRMonth + '-' + '31')
            } else {
                var lessRDay = parseInt(checkoutdate[2]) - 1
                if (lessRDay < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + '0' + lessRDay)
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + lessRDay)
                }
            }
        } else if (checkoutdate[1] >= 8) {
            if (checkoutdate[2] == 1) {
                var lessRMonth = parseInt(checkoutdate[1]) - 1
                if (lessRMonth < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + '0' + lessRMonth + '-' + '30')
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + lessRMonth + '-' + '30')
                }
            } else {
                var lessRDay = parseInt(checkoutdate[2]) - 1
                if (lessRDay < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + '0' + lessRDay)
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + lessRDay)
                }
            }
        } else if (checkoutdate[1] == 1) {
            if (checkoutdate[2] == 1) {
                var lessRYear = parseInt(checkoutdate[0]) - 1
                var yearcheck = parseInt(lessRYear) % parseInt(33)
                if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
                    $(".checkoutdate").val(lessRYear + '-' + '12' + '-' + '30')
                } else {
                    $(".checkoutdate").val(lessRYear + '-' + '12' + '-' + '29')
                }
            } else {
                var lessRDay = parseInt(checkoutdate[2]) - 1
                if (lessRDay < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + '0' + lessRDay)
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + lessRDay)
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


    if (departMdate[2] == 1) {
        var lessDepMonth = parseInt(departMdate[1]) - 1
        if (departMdate[1] == 1) {
            var lessDepYear = parseInt(departMdate[0]) - 1
            $(".mstring_fdate").val(lessDepYear + '-' + '12' + '-' + '31')
        } else if (lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
            if (lessDepMonth < 10) {
                $(".mstring_fdate").val(departMdate[0] + '-' + '0' + lessDepMonth + '-' + '31')
            } else {
                $(".mstring_fdate").val(departMdate[0] + '-' + lessDepMonth + '-' + '31')
            }
        } else if (lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11) {
            if (lessDepMonth < 10) {
                $(".mstring_fdate").val(departMdate[0] + '-' + '0' + lessDepMonth + '-' + '30')
            } else {
                $(".mstring_fdate").val(departMdate[0] + '-' + lessDepMonth + '-' + '30')
            }
        } else if (lessDepMonth == 2) {
            if ((departMdate[0] % 4 == 0) && ((departMdate[0] % 100 != 0) || (departMdate[0] % 400 == 0))) {
                if (lessDepMonth < 10) {
                    $(".mstring_fdate").val(departMdate[0] + '-' + '0' + lessDepMonth + '-' + '29')
                } else {
                    $(".mstring_fdate").val(departMdate[0] + '-' + lessDepMonth + '-' + '29')
                }
            } else {
                if (lessDepMonth < 10) {
                    $(".mstring_fdate").val(departMdate[0] + '-' + '0' + lessDepMonth + '-' + '28')
                } else {
                    $(".mstring_fdate").val(departMdate[0] + '-' + lessDepMonth + '-' + '28')
                }
            }

        }
    } else if (departMdate[2] > 1) {
        var lessDepDay = parseInt(departMdate[2]) - 1
        $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + lessDepDay)
    }

    if (departdate[1] <= 7 && departdate[1] != 1) {
        if (departdate[2] == 1) {
            var lessDepMonth = parseInt(departdate[1]) - 1
            $(".start_date").val(departdate[0] + '-' + '0' + lessDepMonth + '-' + '31')
        } else {
            var lessDepDay = parseInt(departdate[2]) - 1
            if (lessDepDay < 10) {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + '0' + lessDepDay)
            } else {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + lessDepDay)
            }
        }
    } else if (departdate[1] >= 8) {
        if (departdate[2] == 1) {
            var lessDepMonth = parseInt(departdate[1]) - 1
            if (lessDepMonth < 10) {
                $(".start_date").val(departdate[0] + '-' + '0' + lessDepMonth + '-' + '30')
            } else {
                $(".start_date").val(departdate[0] + '-' + lessDepMonth + '-' + '30')
            }
        } else {
            var lessDepDay = parseInt(departdate[2]) - 1
            if (lessDepDay < 10) {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + '0' + lessDepDay)
            } else {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + lessDepDay)
            }
        }
    } else if (departdate[1] == 1) {
        if (departdate[2] == 1) {
            var lessDepYear = parseInt(departdate[0]) - 1
            var yearcheck = parseInt(lessDepYear) % parseInt(33)
            if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
                $(".start_date").val(lessDepYear + '-' + '12' + '-' + '30')
            } else {
                $(".start_date").val(lessDepYear + '-' + '12' + '-' + '29')
            }
        } else {
            var lessDepDay = parseInt(departdate[2]) - 1
            if (lessDepDay < 10) {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + '0' + lessDepDay)
            } else {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + lessDepDay)
            }
        }
    }

    // prev date for return date

    if (returnMdate[2] == 1) {
        var lessDepMonth = parseInt(returnMdate[1]) - 1
        if (returnMdate[1] == 1) {
            var lessDepYear = parseInt(returnMdate[0]) - 1
            $(".mstring_tdate").val(lessDepYear + '-' + '12' + '-' + '31')
        } else if (lessDepMonth == 1 || lessDepMonth == 3 || lessDepMonth == 5 || lessDepMonth == 7 || lessDepMonth == 8 || lessDepMonth == 10) {
            if (lessDepMonth < 10) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + '0' + lessDepMonth + '-' + '31')
            } else {
                $(".mstring_tdate").val(returnMdate[0] + '-' + lessDepMonth + '-' + '31')
            }
        } else if (lessDepMonth == 4 || lessDepMonth == 6 || lessDepMonth == 9 || lessDepMonth == 11) {
            if (lessDepMonth < 10) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + '0' + lessDepMonth + '-' + '30')
            } else {
                $(".mstring_tdate").val(returnMdate[0] + '-' + lessDepMonth + '-' + '30')
            }
        } else if (lessDepMonth == 2) {
            if ((returnMdate[0] % 4 == 0) && ((returnMdate[0] % 100 != 0) || (returnMdate[0] % 400 == 0))) {
                if (lessDepMonth < 10) {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + '0' + lessDepMonth + '-' + '29')
                } else {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + lessDepMonth + '-' + '29')
                }
            } else {
                if (lessDepMonth < 10) {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + '0' + lessDepMonth + '-' + '28')
                } else {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + lessDepMonth + '-' + '28')
                }
            }

        }
    } else if (returnMdate[2] > 1) {
        var lessDepDay = parseInt(returnMdate[2]) - 1
        $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + lessDepDay)
    }

    if (returndate[1] <= 7 && returndate[1] != 1) {
        if (returndate[2] == 1) {
            var lessRMonth = parseInt(returndate[1]) - 1
            $(".end_date").val(returndate[0] + '-' + '0' + lessRMonth + '-' + '31')
        } else {
            var lessRDay = parseInt(returndate[2]) - 1
            if (lessRDay < 10) {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + '0' + lessRDay)
            } else {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + lessRDay)
            }
        }
    } else if (returndate[1] >= 8) {
        if (returndate[2] == 1) {
            var lessRMonth = parseInt(returndate[1]) - 1
            if (lessRMonth < 10) {
                $(".end_date").val(returndate[0] + '-' + '0' + lessRMonth + '-' + '30')
            } else {
                $(".end_date").val(returndate[0] + '-' + lessRMonth + '-' + '30')
            }
        } else {
            var lessRDay = parseInt(returndate[2]) - 1
            if (lessRDay < 10) {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + '0' + lessRDay)
            } else {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + lessRDay)
            }
        }
    } else if (returndate[1] == 1) {
        if (returndate[2] == 1) {
            var lessRYear = parseInt(returndate[0]) - 1
            var yearcheck = parseInt(lessRYear) % parseInt(33)
            if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
                $(".end_date").val(lessRYear + '-' + '12' + '-' + '30')
            } else {
                $(".end_date").val(lessRYear + '-' + '12' + '-' + '29')
            }
        } else {
            var lessRDay = parseInt(returndate[2]) - 1
            if (lessRDay < 10) {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + '0' + lessRDay)
            } else {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + lessRDay)
            }
        }
    }
    var newdepartY = $(".start_date").val().split("-")[0];
    var newdepartM = $(".start_date").val().split("-")[1];
    var newdepartD = $(".start_date").val().split("-")[2];
    if (PcurrentY < newdepartY) {
        $(".form-search").submit();
    } else if (PcurrentY == newdepartY) {
        if (PcurrentM < newdepartM) {
            $(".form-search").submit();
        } else if (PcurrentM == newdepartM) {
            if (PcurrentD <= newdepartD) {
                $(".form-search").submit();
            }
        }
    }
}

function NextDate() {

    if ($(".checkinMdate").val() !== undefined && $(".checkinMdate").val() !== "") {
        var checkinMdate = $(".checkinMdate").val().split("-");
        var checkoutMdate = $(".checkoutMdate").val().split("-");

        if (checkinMdate[1] == 1 || checkinMdate[1] == 3 || checkinMdate[1] == 5 || checkinMdate[1] == 7 || checkinMdate[1] == 8 || checkinMdate[1] == 10) {
            if (checkinMdate[2] < 31) {
                var sumDepday = parseInt(checkinMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + sumDepday)
                }
            } else if (checkinMdate[2] = 31) {
                var sumDepMonth = parseInt(checkinMdate[1]) + 1
                if (sumDepMonth < 10) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
                } else {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + sumDepMonth + '-' + '01')
                }
            }
        } else if (checkinMdate[1] == 12) {
            var sumDepyear = parseInt(checkinMdate[0]) + 1
            $(".checkinMdate").val(sumDepyear + '-' + '01' + '-' + '01')
        } else if (checkinMdate[1] == 4 || checkinMdate[1] == 6 || checkinMdate[1] == 9 || checkinMdate[1] == 11) {
            if (checkinMdate[2] < 30) {
                var sumDepday = parseInt(checkinMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + sumDepday)
                }
            } else if (checkinMdate[2] = 30) {
                var sumDepMonth = parseInt(checkinMdate[1]) + 1
                if (sumDepMonth < 10) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
                } else {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + sumDepMonth + '-' + '01')
                }
            }
        } else if (checkinMdate[1] == 2) {
            if ((checkinMdate[0] % 4 == 0) && ((checkinMdate[0] % 100 != 0) || (checkinMdate[0] % 400 == 0))) {
                if (checkinMdate[2] < 29) {
                    var sumDepday = parseInt(checkinMdate[2]) + 1
                    if (sumDepday < 10) {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + '0' + sumDepday)
                    } else {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + sumDepday)
                    }
                } else if (checkinMdate[2] = 29) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + '03' + '-' + '01')
                }
            } else {
                if (checkinMdate[2] < 28) {
                    var sumDepday = parseInt(checkinMdate[2]) + 1
                    if (sumDepday < 10) {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + '0' + sumDepday)
                    } else {
                        $(".checkinMdate").val(checkinMdate[0] + '-' + checkinMdate[1] + '-' + sumDepday)
                    }
                } else if (checkinMdate[2] = 28) {
                    $(".checkinMdate").val(checkinMdate[0] + '-' + '03' + '-' + '01')
                }
            }
        }
        if (checkoutMdate[1] == 1 || checkoutMdate[1] == 3 || checkoutMdate[1] == 5 || checkoutMdate[1] == 7 || checkoutMdate[1] == 8 || checkoutMdate[1] == 10) {
            if (checkoutMdate[2] < 31) {
                var sumDepday = parseInt(checkoutMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + sumDepday)
                }
            } else if (checkoutMdate[2] = 31) {
                var sumDepMonth = parseInt(checkoutMdate[1]) + 1
                if (sumDepMonth < 10) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
                } else {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + sumDepMonth + '-' + '01')
                }
            }
        } else if (checkoutMdate[1] == 12) {
            var sumDepyear = parseInt(checkoutMdate[0]) + 1
            $(".checkoutMdate").val(sumDepyear + '-' + '01' + '-' + '01')
        } else if (checkoutMdate[1] == 4 || checkoutMdate[1] == 6 || checkoutMdate[1] == 9 || checkoutMdate[1] == 11) {
            if (checkoutMdate[2] < 30) {
                var sumDepday = parseInt(checkoutMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + sumDepday)
                }
            } else if (checkoutMdate[2] = 30) {
                var sumDepMonth = parseInt(checkoutMdate[1]) + 1
                if (sumDepMonth < 10) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
                } else {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + sumDepMonth + '-' + '01')
                }
            }
        } else if (checkoutMdate[1] == 2) {
            if ((checkoutMdate[0] % 4 == 0) && ((checkoutMdate[0] % 100 != 0) || (checkoutMdate[0] % 400 == 0))) {
                if (checkoutMdate[2] < 29) {
                    var sumDepday = parseInt(checkoutMdate[2]) + 1
                    if (sumDepday < 10) {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + '0' + sumDepday)
                    } else {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + sumDepday)
                    }
                } else if (checkoutMdate[2] = 29) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + '03' + '-' + '01')
                }
            } else {
                if (checkoutMdate[2] < 28) {
                    var sumDepday = parseInt(checkoutMdate[2]) + 1
                    if (sumDepday < 10) {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + '0' + sumDepday)
                    } else {
                        $(".checkoutMdate").val(checkoutMdate[0] + '-' + checkoutMdate[1] + '-' + sumDepday)
                    }
                } else if (checkoutMdate[2] = 28) {
                    $(".checkoutMdate").val(checkoutMdate[0] + '-' + '03' + '-' + '01')
                }
            }
        }

    }

    if ($(".checkindate").val() !== undefined && $(".checkindate").val() !== "") {
        var checkindate = $(".checkindate").val().split("-");
        var checkoutdate = $(".checkoutdate").val().split("-");
        if (checkindate[1] < 7) {
            if (checkindate[2] < 31) {
                var sumDepday = parseInt(checkindate[2]) + 1
                if (sumDepday < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + sumDepday)
                }
            } else if (checkindate[2] = 31) {
                var sumDepMonth = parseInt(checkindate[1]) + 1
                if (sumDepMonth < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + '0' + sumDepMonth + '-' + '01')
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + sumDepMonth + '-' + '01')
                }
            }
        } else if (checkindate[1] >= 7 && checkindate[1] != 12) {
            if (checkindate[2] < 30) {
                var sumDepday = parseInt(checkindate[2]) + 1
                if (sumDepday < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + sumDepday)
                }
            } else if (checkindate[2] = 30) {
                var sumDepMonth = parseInt(checkindate[1]) + 1
                if (sumDepMonth < 10) {
                    $(".checkindate").val(checkindate[0] + '-' + '0' + sumDepMonth + '-' + '01')
                } else {
                    $(".checkindate").val(checkindate[0] + '-' + sumDepMonth + '-' + '01')
                }
            }
        } else if (checkindate[1] == 12) {
            var yearcheck = parseInt(checkindate[0]) % parseInt(33)
            if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
                if (checkindate[2] < 30) {
                    var sumDepday = parseInt(checkindate[2]) + 1
                    if (sumDepday < 10) {
                        $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + '0' + sumDepday)
                    } else {
                        $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + sumDepday)
                    }
                } else if (checkindate[2] = 30) {
                    var sumDepyear = parseInt(checkindate[0]) + 1
                    $(".checkindate").val(sumDepyear + '-' + '01' + '-' + '01')
                }
            } else {
                if (checkindate[2] < 29) {
                    var sumDepday = parseInt(checkindate[2]) + 1
                    if (sumDepday < 10) {
                        $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + '0' + sumDepday)
                    } else {
                        $(".checkindate").val(checkindate[0] + '-' + checkindate[1] + '-' + sumDepday)
                    }
                } else if (checkindate[2] = 29) {
                    var sumDepyear = parseInt(checkindate[0]) + 1
                    $(".checkindate").val(sumDepyear + '-' + '01' + '-' + '01')
                }

            }
        }
        // next date for return date

        if (checkoutdate[1] < 7) {
            if (checkoutdate[2] < 31) {
                var sumRday = parseInt(checkoutdate[2]) + 1
                if (sumRday < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + '0' + sumRday)
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + sumRday)
                }
            } else if (checkoutdate[2] = 31) {
                var sumRMonth = parseInt(checkoutdate[1]) + 1
                if (sumRMonth < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + '0' + sumRMonth + '-' + '01')
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + sumRMonth + '-' + '01')
                }
            }
        } else if (checkoutdate[1] >= 7 && checkoutdate[1] != 12) {
            if (checkoutdate[2] < 30) {
                var sumRday = parseInt(checkoutdate[2]) + 1
                if (sumRday < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + '0' + sumRday)
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + sumRday)
                }
            } else if (checkoutdate[2] = 30) {
                var sumRMonth = parseInt(checkoutdate[1]) + 1
                if (sumRMonth < 10) {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + '0' + sumRMonth + '-' + '01')
                } else {
                    $(".checkoutdate").val(checkoutdate[0] + '-' + sumRMonth + '-' + '01')
                }
            }
        } else if (checkoutdate[1] == 12) {
            var yearcheck = parseInt(checkoutdate[0]) % parseInt(33)
            if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
                if (checkoutdate[2] < 30) {
                    var sumRday = parseInt(checkoutdate[2]) + 1
                    if (sumRday < 10) {
                        $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + '0' + sumRday)
                    } else {
                        $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + sumRday)
                    }
                } else if (checkoutdate[2] = 30) {
                    var sumRyear = parseInt(checkoutdate[0]) + 1
                    $(".checkoutdate").val(sumRyear + '-' + '01' + '-' + '01')
                }
            } else {
                if (checkoutdate[2] < 29) {
                    var sumRday = parseInt(checkoutdate[2]) + 1
                    if (sumRday < 10) {
                        $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + '0' + sumRday)
                    } else {
                        $(".checkoutdate").val(checkoutdate[0] + '-' + checkoutdate[1] + '-' + sumRday)
                    }
                } else if (checkoutdate[2] = 29) {
                    var sumRyear = parseInt(checkoutdate[0]) + 1
                    $(".checkoutdate").val(sumRyear + '-' + '01' + '-' + '01')
                }

            }
        }
    }

    var departdate = $(".start_date").val().split("-");
    var returndate = $(".end_date").val().split("-");

    var departMdate = $(".mstring_fdate").val().split("-");
    var returnMdate = $(".mstring_tdate").val().split("-");

    if (departMdate[1] == 1 || departMdate[1] == 3 || departMdate[1] == 5 || departMdate[1] == 7 || departMdate[1] == 8 || departMdate[1] == 10) {
        if (departMdate[2] < 31) {
            var sumDepday = parseInt(departMdate[2]) + 1
            if (sumDepday < 10) {
                $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + '0' + sumDepday)
            } else {
                $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + sumDepday)
            }
        } else if (departMdate[2] = 31) {
            var sumDepMonth = parseInt(departMdate[1]) + 1
            if (sumDepMonth < 10) {
                $(".mstring_fdate").val(departMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
            } else {
                $(".mstring_fdate").val(departMdate[0] + '-' + sumDepMonth + '-' + '01')
            }
        }
    } else if (departMdate[1] == 12) {
        var sumDepyear = parseInt(departMdate[0]) + 1
        $(".mstring_fdate").val(sumDepyear + '-' + '01' + '-' + '01')
    } else if (departMdate[1] == 4 || departMdate[1] == 6 || departMdate[1] == 9 || departMdate[1] == 11) {
        if (departMdate[2] < 30) {
            var sumDepday = parseInt(departMdate[2]) + 1
            if (sumDepday < 10) {
                $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + '0' + sumDepday)
            } else {
                $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + sumDepday)
            }
        } else if (departMdate[2] = 30) {
            var sumDepMonth = parseInt(departMdate[1]) + 1
            if (sumDepMonth < 10) {
                $(".mstring_fdate").val(departMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
            } else {
                $(".mstring_fdate").val(departMdate[0] + '-' + sumDepMonth + '-' + '01')
            }
        }
    } else if (departMdate[1] == 2) {
        if ((departMdate[0] % 4 == 0) && ((departMdate[0] % 100 != 0) || (departMdate[0] % 400 == 0))) {
            if (departMdate[2] < 29) {
                var sumDepday = parseInt(departMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + sumDepday)
                }
            } else if (departMdate[2] = 29) {
                $(".mstring_fdate").val(departMdate[0] + '-' + '03' + '-' + '01')
            }
        } else {
            if (departMdate[2] < 28) {
                var sumDepday = parseInt(departMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".mstring_fdate").val(departMdate[0] + '-' + departMdate[1] + '-' + sumDepday)
                }
            } else if (departMdate[2] = 28) {
                $(".mstring_fdate").val(departMdate[0] + '-' + '03' + '-' + '01')
            }
        }
    }

    if (departdate[1] < 7) {
        if (departdate[2] < 31) {
            var sumDepday = parseInt(departdate[2]) + 1
            if (sumDepday < 10) {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + '0' + sumDepday)
            } else {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + sumDepday)
            }
        } else if (departdate[2] = 31) {
            var sumDepMonth = parseInt(departdate[1]) + 1
            if (sumDepMonth < 10) {
                $(".start_date").val(departdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
            } else {
                $(".start_date").val(departdate[0] + '-' + sumDepMonth + '-' + '01')
            }
        }
    } else if (departdate[1] >= 7 && departdate[1] != 12) {
        if (departdate[2] < 30) {
            var sumDepday = parseInt(departdate[2]) + 1
            if (sumDepday < 10) {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + '0' + sumDepday)
            } else {
                $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + sumDepday)
            }
        } else if (departdate[2] = 30) {
            var sumDepMonth = parseInt(departdate[1]) + 1
            if (sumDepMonth < 10) {
                $(".start_date").val(departdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
            } else {
                $(".start_date").val(departdate[0] + '-' + sumDepMonth + '-' + '01')
            }
        }
    } else if (departdate[1] == 12) {
        var yearcheck = parseInt(departdate[0]) % parseInt(33)
        if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
            if (departdate[2] < 30) {
                var sumDepday = parseInt(departdate[2]) + 1
                if (sumDepday < 10) {
                    $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + sumDepday)
                }
            } else if (departdate[2] = 30) {
                var sumDepyear = parseInt(departdate[0]) + 1
                $(".start_date").val(sumDepyear + '-' + '01' + '-' + '01')
            }
        } else {
            if (departdate[2] < 29) {
                var sumDepday = parseInt(departdate[2]) + 1
                if (sumDepday < 10) {
                    $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".start_date").val(departdate[0] + '-' + departdate[1] + '-' + sumDepday)
                }
            } else if (departdate[2] = 29) {
                var sumDepyear = parseInt(departdate[0]) + 1
                $(".start_date").val(sumDepyear + '-' + '01' + '-' + '01')
            }

        }
    }
    // next date for return date

    if (returnMdate[1] == 1 || returnMdate[1] == 3 || returnMdate[1] == 5 || returnMdate[1] == 7 || returnMdate[1] == 8 || returnMdate[1] == 10) {
        if (returnMdate[2] < 31) {
            var sumDepday = parseInt(returnMdate[2]) + 1
            if (sumDepday < 10) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + '0' + sumDepday)
            } else {
                $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + sumDepday)
            }
        } else if (returnMdate[2] = 31) {
            var sumDepMonth = parseInt(returnMdate[1]) + 1
            if (sumDepMonth < 10) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
            } else {
                $(".mstring_tdate").val(returnMdate[0] + '-' + sumDepMonth + '-' + '01')
            }
        }
    } else if (returnMdate[1] == 12) {
        var sumDepyear = parseInt(returnMdate[0]) + 1
        $(".mstring_tdate").val(sumDepyear + '-' + '01' + '-' + '01')
    } else if (returnMdate[1] == 4 || returnMdate[1] == 6 || returnMdate[1] == 9 || returnMdate[1] == 11) {
        if (returnMdate[2] < 30) {
            var sumDepday = parseInt(returnMdate[2]) + 1
            if (sumDepday < 10) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + '0' + sumDepday)
            } else {
                $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + sumDepday)
            }
        } else if (returnMdate[2] = 30) {
            var sumDepMonth = parseInt(returnMdate[1]) + 1
            if (sumDepMonth < 10) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + '0' + sumDepMonth + '-' + '01')
            } else {
                $(".mstring_tdate").val(returnMdate[0] + '-' + sumDepMonth + '-' + '01')
            }
        }
    } else if (returnMdate[1] == 2) {
        if ((returnMdate[0] % 4 == 0) && ((returnMdate[0] % 100 != 0) || (returnMdate[0] % 400 == 0))) {
            if (returnMdate[2] < 29) {
                var sumDepday = parseInt(returnMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + sumDepday)
                }
            } else if (returnMdate[2] = 29) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + '03' + '-' + '01')
            }
        } else {
            if (returnMdate[2] < 28) {
                var sumDepday = parseInt(returnMdate[2]) + 1
                if (sumDepday < 10) {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + '0' + sumDepday)
                } else {
                    $(".mstring_tdate").val(returnMdate[0] + '-' + returnMdate[1] + '-' + sumDepday)
                }
            } else if (returnMdate[2] = 28) {
                $(".mstring_tdate").val(returnMdate[0] + '-' + '03' + '-' + '01')
            }
        }
    }

    if (returndate[1] < 7) {
        if (returndate[2] < 31) {
            var sumRday = parseInt(returndate[2]) + 1
            if (sumRday < 10) {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + '0' + sumRday)
            } else {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + sumRday)
            }
        } else if (returndate[2] = 31) {
            var sumRMonth = parseInt(returndate[1]) + 1
            if (sumRMonth < 10) {
                $(".end_date").val(returndate[0] + '-' + '0' + sumRMonth + '-' + '01')
            } else {
                $(".end_date").val(returndate[0] + '-' + sumRMonth + '-' + '01')
            }
        }
    } else if (returndate[1] >= 7 && returndate[1] != 12) {
        if (returndate[2] < 30) {
            var sumRday = parseInt(returndate[2]) + 1
            if (sumRday < 10) {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + '0' + sumRday)
            } else {
                $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + sumRday)
            }
        } else if (returndate[2] = 30) {
            var sumRMonth = parseInt(returndate[1]) + 1
            if (sumRMonth < 10) {
                $(".end_date").val(returndate[0] + '-' + '0' + sumRMonth + '-' + '01')
            } else {
                $(".end_date").val(returndate[0] + '-' + sumRMonth + '-' + '01')
            }
        }
    } else if (returndate[1] == 12) {
        var yearcheck = parseInt(returndate[0]) % parseInt(33)
        if (yearcheck == 13 || yearcheck == 17 || yearcheck == 22 || yearcheck == 26 || yearcheck == 30) {
            if (returndate[2] < 30) {
                var sumRday = parseInt(returndate[2]) + 1
                if (sumRday < 10) {
                    $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + '0' + sumRday)
                } else {
                    $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + sumRday)
                }
            } else if (returndate[2] = 30) {
                var sumRyear = parseInt(returndate[0]) + 1
                $(".end_date").val(sumRyear + '-' + '01' + '-' + '01')
            }
        } else {
            if (returndate[2] < 29) {
                var sumRday = parseInt(returndate[2]) + 1
                if (sumRday < 10) {
                    $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + '0' + sumRday)
                } else {
                    $(".end_date").val(returndate[0] + '-' + returndate[1] + '-' + sumRday)
                }
            } else if (returndate[2] = 29) {
                var sumRyear = parseInt(returndate[0]) + 1
                $(".end_date").val(sumRyear + '-' + '01' + '-' + '01')
            }

        }
    }
    $(".form-search").submit();
}
//<!----------------------------END JS CHANGE DATE ------------------------------>     
//----------------JS SHOW TODAY AND TOMRROW DATE IN SEARCH BOX----------------//
var persiancurrentTime = new Date()
var persiangregorian_month = persiancurrentTime.getMonth() + 1
var persiangregorian_day = persiancurrentTime.getDate()
var persiangregorian_year = persiancurrentTime.getFullYear()
var persiancurrent = persiandate(parseInt(persiangregorian_year), parseInt(persiangregorian_month), parseInt(persiangregorian_day))
$(".persiancurrent").val(persiancurrent)
var currentTime = new Date()
currentTime.setDate(currentTime.getDate() + 2);
var gregorian_month = currentTime.getMonth() + 1
var gregorian_day = currentTime.getDate()
var gregorian_year = currentTime.getFullYear()
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 4);
var gregorian_month_tomorrow = tomorrow.getMonth() + 1
var gregorian_day_tomorrow = tomorrow.getDate()
var gregorian_year_tomorrow = tomorrow.getFullYear()
$(".mstring_fdate").val(gregorian_year + "-" + gregorian_month + "-" + gregorian_day)
$(".mstring_tdate").val(gregorian_year_tomorrow + "-" + gregorian_month_tomorrow + "-" + gregorian_day_tomorrow)
var persian_today = persiandate(parseInt(gregorian_year), parseInt(gregorian_month), parseInt(gregorian_day))
var persian_tomorrow = persiandate(parseInt(gregorian_year_tomorrow), parseInt(gregorian_month_tomorrow), parseInt(
    gregorian_day_tomorrow))
var persian_today_split = persian_today.split("-")
var persian_tomorrow_split = persian_tomorrow.split("-")
var selected_month_today = "";
var selected_month_tomorrow = "";
var months = {
    "01": "فروردین",
    "02": "اردیبهشت",
    "03": "خرداد",
    "04": "تیر",
    "05": "مرداد",
    "06": "شهریور",
    "07": "مهر",
    "08": "آبان",
    "09": "آذر",
    "10": "دی",
    "11": "بهمن",
    "12": "اسفند"
};

$(".start_date").val(persian_today)
$(".start_date").closest("div").find(".selected-day").text(persian_today_split[2])
$(".start_date").closest("div").find(".selected-month").text(months[persian_today_split[1]])
$(".end_date").val(persian_tomorrow)
$(".end_date").closest("div").find(".selected-day").text(persian_tomorrow_split[2])
$(".end_date").closest("div").find(".selected-month").text(months[persian_tomorrow_split[1]])

// set basis min price
function fetchCalendarPrices() {
    document.querySelectorAll('.basis_min_price').forEach(e => {
        e.remove();
    })
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var payload = {
        "dmnid": document.querySelector(".search-nav").dataset.dmnid
    }
    var origin = document.querySelector('.co-id.FCDid1');
    if (origin && origin.value != '') {
        payload['origin'] = origin.value;
    }

    var destination = document.querySelector('.co-id.FCDid2');
    if (destination && destination.value != '') {
        payload['destination'] = destination.value;
    }

    var return_date = document.querySelector('.Basis_Date.end_date.nextCalOpening');
    if (!payload.origin || !payload.destination || return_date) {
        return;
    }
    const raw = JSON.stringify(payload);
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };
    var empty = false;
    fetch("https://basisfly.com/apihub/flight/calendarLookUp", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            if (!result) {
                empty = true;
            }
            const priceDivsToUpdate = []; // Store elements to update
            result.forEach(item => {
                document.querySelectorAll(".Basis_Calendar_Box").forEach(e => {
                    const element = e.querySelector(`td[data-information^="${item.date_id}"]`);
                    if (element) {
                        let priceDiv = element.querySelector('.basis_min_price');

                        if (priceDiv) {
                            // If it exists, update the content
                            priceDivsToUpdate.push({ div: priceDiv, price: Math.floor(item.min_price / 10000000 * 10) / 10 });
                        } else {
                            // If it doesn't exist, create a new div
                            priceDiv = document.createElement('div');
                            priceDiv.className = 'basis_min_price';

                            let displayPrice;
                            if (item.min_price > 9999) {
                                displayPrice = Math.floor(item.min_price / 10000000 * 10) / 10; // Divide by 100,000,000 and round to one decimal place
                            } else {
                                displayPrice = Math.floor(item.min_price / 10000 * 10) / 10; // Divide by 10,000 and round to one decimal place
                            }

                            priceDiv.textContent = displayPrice;
                            // Append the new div to the td element
                            element.appendChild(priceDiv);
                        }
                    }
                })

            });

            priceDivsToUpdate.forEach(({ div, price }) => {
                div.textContent = price;
            });
        })
        .catch((error) => {
            empty = true;
        });

    if (empty) {
        document.querySelectorAll('.basis_min_price').forEach(e => {
            e.remove();
        })
    }
}

