<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Water extends CI_Controller {
	public function __construct() {        
    	parent::__construct();
    	$this->load->database();
    	$this->load->model('product_model');
	}
	
	public function index()
	{
		$this->load->view('products');
	}



	public function products()
	{

		$this->load->helper('url');
		
		$list = $this->product_model->list_type();
		$data = array('list'=>$list->result());
		$this->load->view('products',$data);

	}




	public function brands(){
		
		$tid = $this->input->post('tid');
		
		$this->load->model('product_model');
		$query = $this->product_model->brands($tid);
	
		echo json_encode($query->result());
		
	}
}
