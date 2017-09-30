/*Draggable and Resizable Divisions */
/*source
https://jqueryui.com/draggable/
https://jqueryui.com/resizable/
*/

// document load function
$( function() {

    $("#right-side").load("site-navigation.html");

    // make divisions draggable and resizable
    $( ".feed" ).resizable().draggable({
        handle: ".title-bar"
    });
    $( ".leaderboard" ).resizable().draggable({
        handle: ".title-bar"
    });
    $( ".trends" ).resizable().draggable({
        handle: ".title-bar"
    });

    // clicking on a div brings it to front
    $(".feed").click(function(){
        $(this).parent().append(this);
    });
    $(".trends").click(function(){
        $(this).parent().append(this);
    });
    $(".leaderboard").click(function(){
        $(this).parent().append(this);
    });

    // register event listener to the minimize button
    $(".minimize").on("click", minimize);

    // Register the Restore event listener for either the "restore" button or by doubleclicking the 'title bar'
    $(".restore").on("click", {btnsrc: "restore"}, restore);
    $(".title-bar").on("dblclick", {btnsrc: "title-bar"}, restore);




    // Implementation of Minimize Action
    function minimize(){
        var minimize    = $(this);
        var parent      = $(this).parent().parent();
        var titleBar    = $(this).parent();
        var box         = parent.children().eq(1);
        console.log("minimizing '" + parent.attr("id") + "'");

        // hide the contents div (box)
        box.hide();
        // hide the '-' button
        minimize.hide();
        // disable resizable
        parent.resizable({disabled:true});

        // resize and reposition the parent to the bottom to become the title-bar
        parent.addClass("small-size");
        parent.removeAttr("style");  // if any style exists due to dragging

        if (parent.hasClass("trends")){
            parent.removeClass("trends");
            parent.addClass("minimized-trend");
        }else if (parent.hasClass("leaderboard")){
            parent.removeClass("leaderboard");
            parent.addClass("minimized-lb");
        }else if (parent.hasClass( "feed")){
            parent.removeClass("feed");
            parent.addClass("minimized-feed");
        }
    }


    // Restore Action
    function restore(event){
        if (event.data.btnsrc=="restore"){
            var parent      = $(this).parent().parent();
            var titleBar    = $(this).parent();
            var restore     = $(this);
            var minimize    = titleBar.children().eq(1);    // this needs to be modified if any other children are added to the parent div
            var box         = parent.children().eq(1);
        } else if (event.data.btnsrc =="title-bar"){
            var parent      = $(this).parent();
            var titleBar    = $(this);
            var restore     = $(this).children().eq(1);
            var minimize    = titleBar.children().children().eq(1);    // this needs to be modified if any other children are added to the parent div
            var box         = parent.children().children().eq(1);
        }


        // show the contents (box)
        box.show();
        // show the '-' button
        minimize.show();
        // enable resizable
        parent.resizable({disabled:false});

        // resize the div to its original/default size and position
        parent.removeClass("small-size");
        parent.removeAttr("style")  // if any style exists due to dragging

        if (parent.attr("id")=== "trends-div"){
            parent.removeClass("minimized-trend")
            parent.addClass("trends")
        }else if (parent.attr("id")=== "leaderboard-div"){
            parent.removeClass("minimized-lb")
            parent.addClass("leaderboard")
        }else if (parent.attr("id")=== "feeds-div"){
            parent.removeClass("minimized-feed")
            parent.addClass("feed")
        }
    }


    // Graph
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            },
            maintainAspectRatio: false
        }
    });

});