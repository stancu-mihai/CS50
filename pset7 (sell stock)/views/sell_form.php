<form action="sell.php" method="post">
    <fieldset>
        <div style=overflow-x:auto class="form-group">
            <?Php
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
                ?>
            <table>
                <tr>
                    <td>Symbol</td>
                    <td>Shares</td>
                    <td>Price</td>
                </tr>
                <?php foreach ($positions as $position): ?>
                <tr>
                    <td><?= $position["symbol"] ?></td>
                    <td><?= $position["shares"] ?></td>
                    <td><?= number_format($position["price"],2) ?></td>
                </tr>
                <?php endforeach ?>
            </table>
            <p></p>
            <div class="form-group">
            <input autocomplete="off" autofocus class="form-control" name="sellsymbol" placeholder="Sell Stock" type="text"/>
            </div>
            <button class="btn btn-default" type="submit">
                <span aria-hidden="true" class="glyphicon glyphicon-log-in"></span>
                Sell
            </button>
        </div>
    </fieldset>
</form>
