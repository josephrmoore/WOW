<?php
	if(!empty($_POST)){
		$file = "students.json";
		$current = json_encode($_POST);
		file_put_contents($file, $current);
	}
	
?>