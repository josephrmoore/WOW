<?php
	
	$student_file = "students.json";
	$students_string = file_get_contents($student_file);
	$students_obj = json_decode($students_string);

	$teacher_file = "teachers.json";
	$teachers_string = file_get_contents($teacher_file);
	$teachers_obj = json_decode($teachers_string);
	
	$teachers = $teachers_obj->teachers;
	$students = $students_obj->students;

	$teacher_count = 0;
	$student_count = 0;
?>
<!DOCTYPE html>
<html>
<head>
	<title>Algorithm Control</title>
	<meta name="generator" content="TextMate http://macromates.com/">
	<meta name="author" content="Joseph Moore">
	<meta charset="utf-8">
	<!-- Date: 2013-03-02 -->
	<link rel="stylesheet" href="css/styles.css" type="text/css" media="all" />
	<link href='http://fonts.googleapis.com/css?family=VT323' rel='stylesheet' type='text/css'>
	<!-- Mobile viewport optimized: h5bp.com/viewport -->
  	<meta name="viewport" content="width=device-width">
	<!--[if lt IE 9]>
		<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>
<body>
  <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
       chromium.org/developers/how-tos/chrome-frame-getting-started -->
  <!--[if lte IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

<div id="wrapper">
	<h1>Algorithm Control</h1>		
	<section class="students">
		<h2>Students</h2>
		<ul>
			<?php foreach($students as $n => $student){ ?>
				<li><span class="n-number">N-number: <?=$n?></span><span class="fn"><?=$student?></span></li>
				<?php $student_count++; ?>
			<?php } ?>
		</ul>
	</section>
	<section class="teachers">
		<h2>Teachers</h2>
		<ul>
			<?php foreach($teachers as $class => $teacher){ ?>
				<li><span class="class">Class: <?=$class?></span><span class="fn"><?=$teacher?></span></li>
				<?php $teacher_count++; ?>
			<?php } ?>
		</ul>
	</section>
	<section class="attributes">
		<div><span>Number of Sections</span><span><?=$teacher_count?></span></div>
		<div><span>Number of Students</span><span><?=$student_count?></span></div>
		<div><span>Lowest possible cap</span><span><?php echo ceil($student_count/$teacher_count); ?></span></div>
	</section>
	<form action="">
		<h2>Run <input id="times" type="number" value="100" /> Times</h2>
		<input type="submit" value="Run the Algorithm" />
	</form>
</div>



	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
  	<script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
       <script>
	jQuery(document).ready(function($){
		$('form').submit(function(){
			// send teacher and student data to overwrite JSON files
			// run algorithm
			var times = $('#times').val();
			runAlgorithm(times);
			return false;
		});
		function runAlgorithm(times){
			for(i=0;i<times;i++){
				wow();
			}
		}
		function wow(){
			window.open("index.php", "_blank", "width=100,height=100");
		}
	});
</script>
<script>

var burroughs = [<?php foreach($teachers as $n => $teacher){
	$this_teacher = "'".$teacher."',";
	$teacher_text .= $this_teacher;
} ?>
<?=substr($teacher_text, 0, -1)?>
];

var characters = [<?php foreach($students as $n => $student){
	$this_student = "'".$student."',";
	$text .= $this_student;
} ?>
<?=substr($text, 0, -1)?>
];
</script>
  <script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>