<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Water extends CI_Controller {
	public function __construct() {        
    	parent::__construct();
    	//$this->load->database();
    	$this->load->model('product_model');
	}
	
	public function index()
	{
		$this->load->view('index');
	}


	public function user() {
		$uid = $this->input->post('uid');
		
		$this->load->model('product_model');
		$query = $this->product_model->users($uid);
	
		echo json_encode($query->result());
	}

	public function users() {
		$uid = $this->input->post('uid');
		
		$this->load->model('product_model');
		$query = $this->product_model->users($uid);
	
		echo json_encode($query->result());
	}

	public function products()
	{

		$uid = $this->product_model->user();

		if ($uid != "" || $uid != null) {

			$this->load->helper('url');
			
			$list = $this->product_model->list_type();
			$data = array('list'=>$list->result());			
			$this->load->view('products',$data); 
		} else {
			echo "Access Denied!";
		}

	}


	public function purchases(){
		
		$pid = $this->input->post('pid');
		
		$this->load->model('product_model');
		$query = $this->product_model->purchases($pid);
	
		echo json_encode($query->result());
		
	}

	public function brands(){
		
		$tid = $this->input->post('tid');
		
		$this->load->model('product_model');
		$query = $this->product_model->brands($tid);
	
		echo json_encode($query->result());
		
	}

	public function checkout() {


		$qty = $this->input->post('qty');
		$pid = $this->input->post('pid');
		$uid = $this->input->post('uid');
		//echo $qty;

		// 1. Delete all entries on the cart database
		foreach ($pid as $p_id) {
			$this->product_model->clear_cart($p_id);
		}

		// 2. Re-insert updated entries from the cart table
        $count = count($pid);
		for ($i = 0; $i < $count; $i++) :
			$data = array(
				'uid' => $uid[$i],				
				'pid' => $pid[$i],
				'item' => $qty[$i]
			);
			$this->product_model->update_cart($data);	
		endfor;
		
        // 3. Redirect back to our index page
        $this->load->helper('url');
        redirect('cart/index');
  }
}
