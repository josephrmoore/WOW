<?php
		$file = "log.txt";
		$current = file_get_contents($file);
		if(!empty($current)){
			// separate each results set into an array
			// foreach in the array, get student & teacher vars
			$arr = explode("\n\n\n", $current);
			
			
			
			$results = array();
			foreach($arr as $set){
				$result = json_decode($set);
			}
/* 			var_dump($arr); */
?>


{
	"allresults" : [
	<?php foreach($arr as $i=>$set){ ?>
		<?php if($i>0){ ?>
			<?=$set?><?php if($i<count($arr)-1){echo ",";} ?>
		<?php } ?>
	<?php } ?>
	]
}

<?php } ?>