<div>
    <p>
    Current balance:  <?php print(number_format($balance,2)); ?>

    Portfolio:
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
</div>
