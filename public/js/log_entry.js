
// Add todays date to the form
todaysDate = new Date().toISOString().split('T')[0]
$("[name=date]").val(todaysDate)

$(document).ready(() =>{
    $("#optional-data-button").click( (e) => {
        console.log('options button was clicked')
        if($(".optional-data").first().is(":hidden")) {
            $(".optional-data").slideDown(200)
        } else {
            $(".optional-data").slideUp(200)
        }
    })
})
 /* DROPDOWN SEARCH FUNCTIONALITY */
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
// function myFunction() {
//     document.getElementById("myDropdown").classList.toggle("show");
//   }

$("#myInput").click((e) => {
    e.stopPropagation()
    $("#myDropdown > option").css("display","")
    $("#myDropdown").addClass('show')
    console.log(e.target)
})
  
function filterFunction() {
  var input, filter, ul, li, a, i;
  // Get the input from search
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  //  get all the anchors in the 
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("option");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
  //   If there is a match between the text of the anchor and the filter
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

$("#myDropdown > option").click((event) => {
  event.preventDefault();
  var targetText = event.target.innerText;
  $('#myInput').val(targetText);
  $("#myDropdown").removeClass('show')
  $(document).click((e) => {
    $("#myDropdown > option").css("display","none")
})
  console.log(targetText);
})

