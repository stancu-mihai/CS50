<div class="form-group">
    <?Php
        $id = $_SESSION["id"];
        $rows = CS50::query("SELECT * FROM history WHERE user_id = ?", $id);
        $positions = [];
        foreach ($rows as $row)
        {
            $stock = lookup($row["symbol"]);
            if ($stock !== false)
            {
                $positions[] = [
                    "action" => $row["action"],
                    "symbol" => $row["symbol"],
                    "number" => $row["number"],
                    "price"  => $row["price"],
                    "datetime"  => $row["datetime"]
                ];
                }
            }
        ?>
    <table>
        <tr>
            <td>Action</td>
            <td>Symbol</td>
            <td>Number</td>
            <td>Price</td>
            <td>Date and Time</td>
        </tr>
        <?php foreach ($positions as $position): ?>
        <tr>
            <td><?= $position["action"] ?></td>
            <td><?= $position["symbol"] ?></td>
            <td><?= $position["number"] ?></td>
            <td><?= $position["price"] ?></td>
            <td><?= $position["datetime"] ?></td>
        </tr>
        <?php endforeach ?>
    </table>
</div>