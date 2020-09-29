<form action="chpwd.php" method="post">
    <fieldset>
        <div class="form-group">
            <input class="form-control" name="oldpassword" placeholder="Old Password" type="password"/>
            <input class="form-control" name="password" placeholder="New Password" type="password"/>
            <input class="form-control" name="confirmation" placeholder="Verify New Password" type="password"/>
        </div>
        <div class="form-group">
            <button class="btn btn-default" type="submit">
                <span aria-hidden="true" class="glyphicon glyphicon-log-in"></span>
                Change
            </button>
        </div>
    </fieldset>
</form>
