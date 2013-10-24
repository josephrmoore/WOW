<?php
	if(!empty($_POST)){
		$current = json_encode($_POST);
		// transate $current from json to csv
		file_put_contents("finalresult.csv", $current);	
?>
		
<p class="success">File exported!</p>		
		
<?php } ?>