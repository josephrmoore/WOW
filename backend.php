<?php 
	$teacher_file = "professors.json";
	$teachers_string = file_get_contents($teacher_file);
	$teachers_obj = json_decode($teachers_string);
	$teachers = $teachers_obj->teachers;
?>

<!DOCTYPE html>
<html>
<head>
	<title>Algorithm Central</title>
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
	<h1>Algorithm Control Panel</h1>
	<div class="status">
		<ol>
			<li>
				<ul>
					<li class="incomplete">Student Data</li>
					<li class="incomplete">Teacher Data</li>
				</ul>
			</li>
			<li class="incomplete">
				Run the Algorithm
			</li>
		</ol>
	</div>
	<section class="students">
		<button id="import-students">Import Student Data CSV</button>
		<div class="off">
			<h2>Students</h2>
			<table>
			<thead>
				<th class="n-number">N-Number</th>
				<th class="name">Name</th>
				<th class="email">Email</th>
				<th class="choice-1">Choice 1</th>
				<th class="choice-2">Choice 2</th>
				<th class="choice-3">Choice 3</th>
				<th class="peers">Peers</th>
				<th class="professor-preferred">Professor Preferred</th>
				<th class="current-thesis">Current Thesis</th>
			</thead>
			<tbody>
				<tr class="template off">
					<td class="n-number" contenteditable="true"></td>
					<td class="name" contenteditable="true"></td>
					<td class="email" contenteditable="true"></td>
					<td class="choice-1" contenteditable="true"></td>
					<td class="choice-2" contenteditable="true"></td>
					<td class="choice-3" contenteditable="true"></td>
					<td class="peers" contenteditable="true"></td>
					<td class="professor-preferred" contenteditable="true"></td>
					<td class="current-thesis" contenteditable="true"></td>
				</tr>
			</tbody>
			</table>
		</div>
		<button id="students-ok">All the Student Data is OK!</button>
	</section>
	<section class="teachers">
		<h2>Teachers</h2>
		<ul>
			<?php foreach($teachers as $teacher => $preferences){ ?>
			<li>
				<span class="name" contenteditable="true"><?=$teacher?></span>
				<textarea class="preferred-students" contenteditable="true"><?=$preferences?></textarea>
			</li>
			<?php } ?>
		</ul>
		<button id="teachers-ok">All the Teacher Data is OK!</button>
	</section>
	
	<section class="run off">
		<form action="">
			<h2>Run <input id="times" type="number" value="100" /> Times</h2>
			<input type="submit" value="Run the Algorithm" />
		</form>
		<div class="attributes">
			<div class="number-sections">
				<span class="label">Number of Sections</span>
				<span class="number"></span>
			</div>
			<div class="number-students">
				<span class="label">Number of Students</span>
				<span class="number"></span>
			</div>
			<div class="cap">
				<span class="label">Lowest possible cap</span>
				<span class="number"></span>
			</div>
		</div>
	</section>
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
				window.open("index.php", "_blank", "width=100,height=100");
			}
		}
	});
</script>
  <script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>