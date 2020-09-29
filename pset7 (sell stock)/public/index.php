<?php

    // configuration
    require("../includes/config.php"); 

    $id = $_SESSION["id"];
    $rows = CS50::query("SELECT * FROM shares WHERE user_id = ?", $id);
    $balance= CS50::query("SELECT cash FROM users WHERE id = ?", $id);
    $balance = $balance[0]["cash"];

    $positions = [];
    foreach ($rows as $row)
    {
        $stock = lookup($row["symbol"]);
        if ($stock !== false)
        {
            $positions[] = [
                "name" => $stock["name"],
                "price" => $stock["price"],
                "shares" => $row["shares"],
                "symbol" => $row["symbol"]
            ];
        }
    }

    // render portfolio with positions array
    render("portfolio.php", ["positions" => $positions,"balance" => $balance, "title" => "Portfolio"]);

?>
