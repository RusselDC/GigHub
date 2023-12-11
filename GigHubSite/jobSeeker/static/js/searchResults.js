$(document).ready(function () {
  

 

  $(".close_msg").on("click", function () {
    // Set the display property of the parent element with class message_cont to 'none'
    $(this).closest(".message_cont").css("display", "none");
    // $("content").css("overflow-y", "auto");
  });
  $(".filter_clear").click(function () {
    $(".column_filter, .filter_clear").removeClass("selected");
    $("#status").val("");
    dataTable.search("").columns().search("").draw();
  });

  $("#company").on("click", function () {
    $(".column_filter").not(this).removeClass("selected");
    $(this).toggleClass("selected");
    if ($(this).hasClass("selected")) {
      $.fn.dataTable.ext.search.push(function (
        settings,
        searchData,
        index,
        rowData,
        counter
      ) {
        if ($("#company").hasClass("selected")) {
          return rowData[1]
            .toLowerCase()
            .includes(settings.oPreviousSearch.sSearch.toLowerCase());
        } else {
          return true;
        }
      });
    } else {
      $.fn.dataTable.ext.search.pop();
    }
    dataTable.draw();
  });

  $("table tr").each(function () {
    var status = $(this).find("td:nth-last-of-type(2)").text().trim();
    switch (status) {
      case "Hired":
        $(this).find("td:nth-last-of-type(2)").css("color", "black");
        break;
      case "In Progress":
        $(this).find("td:nth-last-of-type(2)").css("color", "#F0C427");
        break;
      case "Applied":
        $(this).find("td:nth-last-of-type(2)").css("color", "#2F88DA");
        break;
      case "Rejected":
        $(this).find("td:nth-last-of-type(2)").css("color", "#ED3D25");
        break;
    }
  });

  $(".ddown_opt").click(function () {
    var selectedValue = $(this).text();
    $("#status").val(selectedValue);
    $(".ddown_options").toggle();
    dataTable.column(3).search(selectedValue).draw();
  });

  $(".ddown").click(function () {
    $(".ddown_options").toggle();
  });

  $(document.body).click(function (event) {
    if (!$(event.target).closest(".ddown_options, .ddown").length) {
      $(".ddown_options").hide();
    }
  });

  $("#jobTable").DataTable({
    paging: true,
    lengthChange: false,
    searching: true,
    ordering: true,
    info: true,
    autoWidth: false,
    pageLength: 5,
  });
  var dataTable = $("#jobTable").DataTable();

  $.fn.dataTable.ext.search.push(function (
    settings,
    searchData,
    index,
    rowData,
    counter
  ) {
    if ($("#jobTitle").hasClass("selected")) {
      return rowData[0]
        .toLowerCase()
        .includes(settings.oPreviousSearch.sSearch.toLowerCase());
    } else {
      return true;
    }
  });

  $(".dataTables_wrapper .dataTables_filter input").on("keyup", function () {
    dataTable.draw();
  });

  $("#jobTitle").on("click", function () {
    $(this).toggleClass("selected");
    $(".column_filter").not(this).removeClass("selected");
    dataTable.draw();
  });
});
