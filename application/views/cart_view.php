<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Simple CodeIgniter App - Todos</title>
  <link rel="stylesheet"
href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
</head>
<body>

  <div class="container">
    <?php echo form_open('todos/update_completed'); ?>
    <h1>Todos</h1>

    <div class="list-group">
      <?php foreach ($todos as $todo) { ?>
        <div class="list-group-item clearfix">
            <?php                
                echo form_checkbox('completed[]', $todo->id, $todo->completed);
            ?>
            <?php echo $todo->task; ?>
        </div>
      <?php } ?>
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
        <?php echo form_close(); ?>
  </div><!-- /.container -->

</body>
</html>