<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Products</title>
	<link rel="stylesheet" type="text/css" href="<?php echo base_url().'resources/css/bootstrap.min.css' ?>" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url().'resources/css/index.css' ?>" />
	<link rel="stylesheet" type="text/css" href="<?php echo base_url().'resources/css/heroes.css' ?>" />
	<script src="<?php echo base_url().'resources/js/jquery-2.1.0.min.js' ?>" /></script>
	<script src="<?php echo base_url().'resources/js/bootstrap.min.js' ?>" /></script>
	<script src="<?php echo base_url().'resources/js/index.js' ?>" /></script>
	<script type="text/javascript">
		var base_url = "<?php echo base_url(); ?>";
	</script>
</head>
<body>
	<div class="product-top">
		<h1>Water</h1>

		<select id="water-type">
				<option value="0">All</option>;
			<?php foreach ($list as $row)
				{ 
    				echo '<option value="'.$row->tid.'">'.$row->name.'</option>';
				}
			?>
		</select>
		<button type="button" class="btn btn-primary product-button" id="search"> Search </button>
	</div>

	<div class="content">
		<div class="ajax-gif"></div>
		<div class="left-container">
			<div class="left"></div>
		</div>



		<div class="right">
			<div class="content-right-one">Your Shopping Cart</div>
			<div class="counter"><span id="num-item">0</span> item(s)</div>
			<table class="purchase">
				<tr>
					<th>&nbsp&nbsp&nbsp</th>
					<th class="qty">Qty</th>
					<th>Brand</th>
					<th>Price</th>
				</tr>
			

			</table>
			<div class="total">Total: Php&nbsp<span id="total-price">0.00</span></div>
			<div class="check-out">
				<button type="button" class="btn btn-default product-button" id="checkout-button"> Checkout </button>				
			</div>
			<br />
		</div>

	</div>



</body>
</html>