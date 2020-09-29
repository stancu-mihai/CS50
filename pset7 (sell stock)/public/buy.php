<?php

    // configuration
    require("../includes/config.php");

    // Get current balance and user id
    $id = $_SESSION["id"];
    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        if (preg_match("/^\d+$/", $_POST["buyquantity"]))
        {
            $buysymbol = $_POST["buysymbol"]; //string
            //echo $_POST["buysymbol"];
            $buyquantity = (int) $_POST["buyquantity"]; 
            $s = lookup($buysymbol); //array
            $balance= CS50::query("SELECT cash FROM users WHERE id = ?", $id);
            $balance = (int) $balance[0]["cash"];
            // Subtract cash from user balance
            $subtractcash = $s["price"] * $buyquantity;
            if ($balance >= $subtractcash)
            {
                $rows = CS50::query("UPDATE users SET cash = ".($balance - $subtractcash)." WHERE id = ".$id);
                // Add stock to db
                CS50::query("INSERT INTO shares (user_id, symbol, shares) VALUES(".$id.", '".strtoupper($buysymbol)."', ".$buyquantity.") ON DUPLICATE KEY UPDATE shares = shares + VALUES(shares)");
                // Remember this in history
                CS50::query("INSERT INTO history (user_id, action, symbol, number, price, datetime) VALUES(".$id.",'bought','".strtoupper($buysymbol)."',".$buyquantity.",".$s["price"].",NOW())");
                redirect("index.php");
            }
            else
            {
                apologize("You have insuficient funds for this operation!");
            }
        }
        else
        {
            apologize("Quantity must be a pozitive ingeger!");
        }
    }
    else
    {
        render("buy_form.php", ["title" => "Buy"]);
    }
?>