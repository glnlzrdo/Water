<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 

class Cart extends CI_Controller {

    public function __construct() {
        parent::__construct();
        
        // Load the todo model to make it available 
        // to *all* of the controller's actions 
        $this->load->model('cart_model');
    }

    public function index()
    {
        // 1. Load the data:
        $all_items = $this->cart_model->get_all_entries();
        // 2. Make the data available to the view
        $data = array();   
        $data['cart'] = $all_items;
        // 3. Render the view:
        $this->load->view('cart_view', $data);
    }

    public function update_completed() {
        // 1. Set all todos as *not* completed
        $update_not_completed = array('completed' => 0);
        $this->Todo_model->update_entries($update_not_completed);


        // 2. Update the designated todos as completed
        $completed_todos = $this->input->post('completed');
        foreach ($completed_todos as $todo_id) {
            $update_completed = array('completed' => 1);
            $update_criteria = array('id' => $todo_id);
            $this->Todo_model->update_entries($update_completed, $update_criteria);
        }


        // 3. Redirect back to our index page
        $this->load->helper('url');
        redirect('todos/index');
  }

}