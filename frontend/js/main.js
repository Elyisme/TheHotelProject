/*  ---------------------------------------------------
    Template Name: Hotel Template
    Description: Hotel HTML Template
    Author: colorlib
    Author URI: https://www.colorlib.com/
    Version: 1.0
    Created: colorlib
---------------------------------------------------------  */

"use strict";

(function ($) {
  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    $(".loader").fadeOut();
    $("#preloder").delay(200).fadeOut("slow");
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true,
  });

  /*------------------
		Date Picker
	--------------------*/
  $(".datepicker-1").datepicker();
  $(".datepicker-2").datepicker();

  /*------------------
		Nice Selector
	--------------------*/
  $(".suit-select").niceSelect();

  /*------------------
        Room Pic Slider
    --------------------*/
  $(".room-pic-slider").owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    items: 1,
    dots: false,
    navText: [
      '<i class="lnr lnr-arrow-left"></i>',
      '<i class="lnr lnr-arrow-right"></i>',
    ],
    smartSpeed: 800,
    autoplay: false,
  });

  /*-------------------
		Quantity change
	--------------------- */
  var proQty = $(".pro-qty");
  proQty.prepend('<span class="dec qtybtn">-</span>');
  proQty.append('<span class="inc qtybtn">+</span>');
  proQty.on("click", ".qtybtn", function () {
    var $button = $(this);
    var oldValue = $button.parent().find("input").val();
    if ($button.hasClass("inc")) {
      var newVal = parseFloat(oldValue) + 1;
    } else {
      // Don't allow decrementing below zero
      if (oldValue > 0) {
        var newVal = parseFloat(oldValue) - 1;
      } else {
        newVal = 0;
      }
    }
    $button.parent().find("input").val(newVal);
  });

  /*------------------
        Magnific Popup
    --------------------*/
  $(".pop-up").magnificPopup({
    type: "iframe",
  });

  
/*------------------
    Check Availability Button Redirect
--------------------*/
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("checkAvailabilityBtn").addEventListener("click", async function () {
    // Redirect to the registration page
    window.location.href = "register.html"; // Redirects to the registration page

    // This part handles the room booking logic
    const roomNumber = 101; // Example room number, this can be dynamic based on user input
    const customerName = "John Doe"; // You may want to get this from an input field
    const bookingDate = new Date().toISOString(); // Example date, replace with actual date input from user

    // Make the API call to book the room
    try {
      const response = await fetch("/api/book-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomNumber, customerName, bookingDate }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      alert(result.message); // Alerts "Booking successful!" if booking was successful
    } catch (error) {
      console.error("Error booking room:", error);
      alert("There was an error booking the room. Please try again.");
    }
  });
});
