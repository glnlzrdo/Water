<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class Product_model extends CI_Model {

	public function __construct()
	{

		parent::__construct();

	}

	public function list_type()
	{
		$query = $this->db->get('type');

		return $query;

	}

	public function brands($tid)
	{
		$this->db->select('product.pid, 
		                   product.brand, 
		                   product.price, 
		                   product.src,  
		                   type.name');
		$this->db->from('product');
		$this->db->join('type', 'product.tid= type.tid');


		if($tid!=0)
			$this->db->where('product.tid', $tid);

		$query = $this->db->get();

				
		return $query;

	}





 
 
 
 
   
}
