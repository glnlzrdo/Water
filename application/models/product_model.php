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


	public function user() {

		$uid = 0;
        $this->db->select('*');
		$this->db->from('user');
		$this->db->where('email', $this->session->userdata('email'));
        $query = $this->db->get();

        $results = array(); 
        foreach ($query->result() as $result) {
            $results[] = $result; 
            $uid = $result->uid;  
        }

		return $uid; 
	}

	public function users() {

		$uid = 0;
        $this->db->select('*');
		$this->db->from('user');
		$this->db->where('email', $this->session->userdata('email'));
        $query = $this->db->get();
/*
        $results = array(); 
        foreach ($query->result() as $result) {
            $results[] = $result; 
            $uid = $result->uid;  
        }

		$query = $this->db->get();
*/
				
		return $query;
	}

	public function purchases($pid) {

		$uid = 0;
        $this->db->select('*');
		$this->db->from('user');
		$this->db->where('email', $this->session->userdata('email'));
        $query = $this->db->get();

        $results = array(); 
        foreach ($query->result() as $result) {
            $results[] = $result; 
            $uid = $result->uid;  
        }

		$this->db->select('cart.item, product.pid, 
		                   product.brand, 
		                   product.price');
        $this->db->from('cart'); 
        $this->db->join('product', 'product.pid= cart.pid');
        $this->db->join('user', 'user.uid=' . $uid);


		return $query = $this->db->get(); 

	}

	public function brands($tid)
	{
		$this->db->select('product.pid, 
		                   product.brand, 
		                   product.price, 
		                   product.src,  
		                   type.name,');
		$this->db->from('product');
		$this->db->join('type', 'product.tid= type.tid');

		if($tid!=0)
			$this->db->where('product.tid', $tid);

		$query = $this->db->get();

				
		return $query;

	}

	function clear_cart($p_id) {
		//$this->db->delete('*');
		//$this->db->from('cart');
		
		//$this->db->where('pid', $p_id);
		//$this->db->delete('cart');
		$this->db->empty_table('cart'); 
	}

	
	function update_cart($data) {
		$this->db->insert('cart', $data);

		
    }
 
   
}
