<?php
	if(!empty($_POST)){
		$file = "log.txt";
		$current = file_get_contents($file);
		$current .= "\n\n\n";
		$current .= json_encode($_POST);
		file_put_contents($file, $current);
	} else {
		$file = "nolog.txt";
		file_put_contents($file, "");
	}
	
?>