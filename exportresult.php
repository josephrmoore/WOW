<?php
	if(!empty($_POST)){
		$current = json_encode($_POST);
		// transate $current from json to csv
		$file = "finalresult_". $_POST['id'] .".csv";
		file_put_contents($file, $current);	
?>
		
<p class="success">File exported!</p>		
		
<?php } ?>