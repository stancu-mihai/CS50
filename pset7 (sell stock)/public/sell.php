<?php

    // configuration
    require("../includes/config.php");

    // Get current balance and user id
    $id = $_SESSION["id"];
    
    if ($_SERVER["REQUEST_METHOD"] == "POST")
    {
        $sellsymbol = $_POST["sellsymbol"]; //string
        $s = lookup($sellsymbol); //array
        $balance= CS50::query("SELECT cash FROM users WHERE id = ?", $id);
        $balance = (int) $balance[0]["cash"];
        // Add cash from user balance
        $quantity= CS50::query("SELECT shares FROM shares WHERE user_id = ? AND symbol = ?", $id, $s["symbol"]);
        $quantity = (int) $quantity[0]["shares"];
        $addcash = $s["price"] * $quantity;
        $rows = CS50::query("UPDATE users SET cash = ".($balance + $addcash)." WHERE id = ".$id);
        // Delete stock from db
        CS50::query("DELETE FROM shares WHERE user_id = " . $id . " AND symbol = '".$sellsymbol."'");
        // Remember this in history
        CS50::query("INSERT INTO history (user_id, action, symbol, number, price, datetime) VALUES(".$id.",'sold','".strtoupper($sellsymbol)."',".$quantity.",".$s["price"].",NOW())");
        redirect("index.php");
    }
    else
    {
        $list= CS50::query("SELECT shares FROM shares WHERE id = ?", $id);
        render("sell_form.php", ["title" => "Sell", "list" => $list]);
    }
?>