<?php

    // configuration
    require("../includes/config.php");

    // Get current user id
    $id = $_SESSION["id"];
    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        // Check if any of password are blank
        if (($_POST["oldpassword"] == "") || ($_POST["password"] == "") || ($_POST["confirmation"] == ""))
        {
            apologize("All fields must be filled in!");
        }
        
        // Check if old password is the correct one
        $oldpwdhash = CS50::query("SELECT hash FROM users WHERE id=?",$id); 

        if (!password_verify($_POST["oldpassword"], $oldpwdhash[0]["hash"]))
        {
            apologize("Incorrect password!");
        }
        
        // Check if password is the same as confirmation
        if ($_POST["password"] != $_POST["confirmation"])
        {
            apologize("Passwords do not match!");
        }
        // Update database
        $result = CS50::query("UPDATE users SET hash=? WHERE id=?", password_hash($_POST["password"], PASSWORD_DEFAULT), $id);
        redirect("index.php");
    }
    else
    {
        render("chpwd_form.php", ["title" => "Change password"]);
    }
?>