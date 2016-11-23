<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class login_model extends CI_Model
{
     function __construct()
     {
          // Call the Model constructor
          parent::__construct();
     }

     //get the username & password from tbl_usrs
     function get_user($email, $pwd)
     {
          $sql = "select * from user where email = '" 
                . $email . "' and password = '" . md5($pwd) . "'";
          $query = $this->db->query($sql);
          //return $query->num_rows();
          return $query;
     }
}?>