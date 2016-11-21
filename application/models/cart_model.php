<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 


class Cart_model extends CI_Model {


    function __construct() {
        parent::__construct();
    } 

    function get_all_entries() {
        $query = $this->db->get('cart');
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
        $this->db->update('todos', $update_info, $update_criteria);
    }

}