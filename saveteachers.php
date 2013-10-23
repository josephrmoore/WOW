<?php
	if(!empty($_POST)){
		$file = "teachers.json";
		$current = json_encode($_POST);
		file_put_contents($file, $current);
	}
	
?>