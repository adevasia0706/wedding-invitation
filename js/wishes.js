$(document).ready(function () {
    // Form validation
    $("#whishForm").on("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission
        $('#whishBtn').text('Sending...');
        // Clear any previous error messages
        $(".error-message").remove();

        // Initialize validation state
        let isValid = true;

        // Validate name
        if ($("#name").val().trim() === "") {
            isValid = false;
            $("#name").after('<span class="error-message" style="color:red;">Name is required.</span>');
        }

        // Validate email (optional â€” only checked if the guest entered one)
        const email = $("#email").val().trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (email !== "" && !emailPattern.test(email)) {
            isValid = false;
            $("#email").after('<span class="error-message" style="color:red;">Please enter a valid email address.</span>');
        }

        // Validate mobile
        // if ($("#mobile").val().trim() === "") {
        //     isValid = false;
        //     $("#mobile").after('<span class="error-message" style="color:red;">Mobile number is required.</span>');
        // }

        // Validate message
        if ($("#message").val().trim() === "") {
            isValid = false;
            $("#message").after('<span class="error-message" style="color:red;">Message is required.</span>');
        }

        // If form is valid, submit via AJAX
        if (isValid) {
            $.ajax({
                url: $('#invitation_url').val(), // Replace with your server URL
                type: "POST",
                data: $(this).serialize(), // Serialize form data
                beforeSend: function() {
                    // Optional: Show a loader or disable submit button
                    $("#whishForm button[type=submit]").prop("disabled", true);
                },
                success: function (response) {
                    $('#whishBtn').text('Send Wish');
                    // Handle the response from the server
                    // You can show a success message here if needed
                    if(response.status) {
                        $('#success_alert').text(response.message);
                        $('#success_alert').show();
                        $('#error_alert').hide();
                        $("#whishForm")[0].reset(); // Reset the form fields
                        setTimeout(function() {
                            $('#whishModal').modal('hide'); // Close the modal  
                        }, 3000);
                    } else {
                        $('#error_alert').text(response.message);
                        $('#error_alert').show();
                        $('#success_alert').hide();
                    }
                
                },
                error: function (xhr, status, error) {
                    $('#whishBtn').text('Send Wish');
                    // Handle any errors
                    // Display a general error message if needed
                    $('#error_alert').text('Something went wrong. Please try again later.');
                    $('#error_alert').show();
                    $('#success_alert').hide();
                },
                complete: function() {
                    $('#whishBtn').text('Send Wish');
                    // Optional: Re-enable the submit button
                    $("#whishForm button[type=submit]").prop("disabled", false);
                }
            });
        } else {
            $('#whishBtn').text('Send Wish');
        }
    });

    // Clear error messages on input change
    $("#name, #email, #mobile, #message").on("input", function() {
        $(this).next(".error-message").remove();
    });
});



$(document).ready(function() {
   
    function isInViewport(element) {
        if (!element || element.length === 0) {
            return false;
        }
        var offset = $(element).offset();
        if (!offset) {
            return false;
        }
        var elementTop = offset.top;
        var elementBottom = elementTop + $(element).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        return elementBottom <= viewportBottom;
    }

    $(window).on('scroll', function() {
        if ($("#wishes").length && isInViewport($('#wishes'))) {
            $('#whishModal').modal('show');
            $(window).off('scroll');
        } else if (isInViewport($('#lastDiv'))) {
            $('#whishModal').modal('show');
            $(window).off('scroll');
        }
    });
});
