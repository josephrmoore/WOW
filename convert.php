<?php
$file = "survey.csv";
$csv = file_get_contents($file);
$array = array_map("str_getcsv", explode("\n", $csv));
/* $json = json_encode($array); */
?>

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
            "peers": [
                "<?=$array[$i][4]?>"
            ],
            "current": "<?=$array[$i][5]?>",
            "thesis" : "-1",
            "choice_recieved": "-1", // 0-2 is 1st-3rd choices, -1 is no choice
            "peers_inclass": [],
            "professor_preferred": false
        }<?php if($i<count($array)-1){echo ",";} ?>
<?php } ?>
    }
}
