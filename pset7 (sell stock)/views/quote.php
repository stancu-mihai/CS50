<form>
    <fieldset>
        <div class="form-group">
            <?php
                $s = lookup($_POST["symbol"]);
                if ($s)
                {
                    Print("<p>");
                    Print("Name: ".$s["name"]."</p><p>");
                    Print("Symbol: ".$s["symbol"]."</p><p>");
                    Print("Price: ".number_format($s["price"],2)."</p>");
                }
                else
                {
                    apologize("Symbol not found!");
                }
            ?>
        </div>
    </fieldset>
</form>
