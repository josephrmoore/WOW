<?php
$file =($_GET['file'])? $_GET['file'] : NULL;

if($file){

	$csv = file_get_contents($file);
	$csv = str_replace('"', '', $csv);
	$csv = str_replace("'", '', $csv);
	$array = array_map('str_getcsv', explode("\n", $csv));
	$json = json_encode($array);	
	if($file == "students.csv"){ ?>
	
{
    "students": {

<?php for ($i=1; $i<count($array); $i++) { ?>
        "<?=$array[$i][7]?>": {
            "name": "<?=$array[$i][6]?>",
            "choices": [
                "<?=$array[$i][1]?>",
                "<?=$array[$i][2]?>",
                "<?=$array[$i][3]?>"
            ],
            "peers": "<?=$array[$i][4]?>",
            "current": "<?=$array[$i][5]?>",
            "thesis" : "-1",
            "choice_recieved": "-1",
            "peers_inclass": "",
            "professor_preferred": false
        }<?php if($i<count($array)-1){echo ",";} ?>
<?php } ?>
    }
}

	<?php } else { ?>

{
    "teachers": [

<?php for ($i=1; $i<count($array); $i++) { ?>
			{
		        "name": "<?=$array[$i][1]?>",
				"choices": "<?=$array[$i][2]?>"
			}<?php if($i<count($array)-1){echo ",";} ?>
<?php } ?>

	]

}

	<?php } ?>
<?php } ?>