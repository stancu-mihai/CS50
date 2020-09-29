<?php

    // configuration
    require("../includes/config.php");

    // if user reached page via GET (as by clicking a link or via redirect)
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        render("quote.php", ["title" => "Quote"]);
    }
    else
    {
        // else render form
        render("quote_form.php", ["title" => "Quote"]);
    }

?>