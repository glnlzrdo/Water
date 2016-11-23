<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Water Shop</title>
  <link rel="stylesheet"
href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="<?php echo base_url().'resources/css/index.css' ?>" />
</head>
<body>

  <div class="container">
    <?php echo form_open('water/products'); 
        $totalAmount = 0;
    ?>
    
    <h1>Welcome back, <?php echo $this->session->userdata('name')?></h1>
    <h3>Items inside your Cart:</h3>

    <div class="list-group">
      <?php foreach ($cart as $carts) { ?>
        <div class="list-group-item clearfix cart-item-row">
            <?php echo '<img src="' . base_url() . 'resources/img/' . $carts->src . '" height="70" width="<7></7>0" class="cart-item-img">'; ?>
            <div class="cart-group">
              <label>Brand: &nbsp</label>
              <?php 
                echo "<span>" . $carts->brand . "</span>";
                ?>
            </div>
            <div class="cart-group">            
              <label>Type: &nbsp</label>
              <?php 
                echo "<span>" . $carts->name . "</span>";
                ?>
            </div>
            <div class="cart-group">
              <label>Price: &nbsp</label>
              <?php 
                echo "<span>" . "Php " . $carts->price . ".00" . "</span>";
                ?>
            </div>

            <div class="cart-subtotal">
              <label>Subtotal: &nbsp</label>
              <?php 
                echo "<span>" . "Php " . ($carts->item * $carts->price) . ".00" . "</span>";
                $totalAmount += ($carts->item * $carts->price);
                ?>
            </div>

            <div class="cart-group">
              <label>Quantity: &nbsp</label>
              <?php 
                echo "<span>" . $carts->item . " Pcs" . "</span>";
                ?>
            </div>            
        </div>
      <?php } ?>
      <div class="list-group-item clearfix cart-item-row">
        <h2 class="cart-total"><?php echo "Php " . $totalAmount . ".00"; ?></h2>
        <h2>Total Amount:&nbsp</h2>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Update Cart</button>
        <?php echo form_close(); ?>
  </div><!-- /.container -->

</body>
</html>