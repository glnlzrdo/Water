<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 


class Cart_model extends CI_Model {


    function __construct() {
        parent::__construct();
    } 

    function get_all_entries() {
        $uid = $this->session->userdata('user_id');

        $this->db->select('cart.item, product.pid, 
		                   product.brand, 
		                   product.price, 
		                   product.src, type.name');
        $this->db->from('cart'); 
        $this->db->join('product', 'product.pid= cart.pid');
        $this->db->join('type', 'product.tid= type.tid');
        $this->db->where('uid', $uid);
        

        $query = $this->db->get(); 

        $results = array(); 
        foreach ($query->result() as $result) {
            $results[] = $result; 
        }
        return $results;
    }

    function update_entries($update_info, $update_criteria = array()) {
        //
        // Update the entries in the todos table:
        //
        // 1. only update the entries that match
        //    the specifications in $update_criteria
        //    (or if $update_criteria is an empty array, update ALL entries)
        //
        // 2. and update only the fields designated in $update_info
        //
        $this->db->update('cart', $update_info, $update_criteria);
    }

}