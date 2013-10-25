<?php 

session_name('single');
session_start();

?>
<!DOCTYPE html>
<html>
<head>
	<title>Characters Seeking Design</title>
	<meta name="generator" content="TextMate http://macromates.com/">
	<meta name="author" content="Joseph Moore">
	<meta charset="utf-8">
	<!-- Date: 2013-02-25 -->
	<link rel="stylesheet" href="css/styles.css" type="text/css" media="all" />
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
<style>

body {
	font-family:"Helvetica", "Arial", sans-serif;
}

table {
	text-align:right;
	border-collapse:collapse;
	border:1px solid #ccc;
	margin:40px;
}

td, th {
	border:1px solid #ccc;
	padding:3px 5px;
}

th {
	background:#fefcf4;
}

td em {
	font-size:9px;
}

td:last-child {
	border-right:none;
}

.chart {
	display:inline;
	float:left;
}

.t {
	background:#eee;
}

.dataviz td {
	background:#eee;
}

.show-hide {
	background:#ccc;
	color:#000;
	font-size:18px;
	border:1px solid #000;
	float:left;
	margin-right:20px;
	cursor:pointer;
	width:28px;
}

ul, ol, dl {
	list-style:none;
}

.off {
	display:none !important;
}

</style>
<div id="wrapper">
	<h1>Thesis 1 - 2013</h1>
	<button class="off" id="run_me_again">Run me again!</button>
	
	<div class="all-students">
		<button class="show-hide" id="show_hide_students">+</button>
		<h1>Students</h1>
		<table class="students off">
			<thead>
			<tr class="header">
				<th>Student</th>
				<th>First Choice</th>
				<th>Second Choice</th>
				<th>Third Choice</th>
				<th>Friends</th>
				<th>Thesis Selection</th>
			</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	
	
	<div class="results">
		<ul>
			<li class="blank off">
				<h1>Results</h1>
				<table class="theses">
					<thead>
					<tr>
						<th>Teacher</th>
						<th># Students' 1st Choice</th>
						<th># Students' 2nd Choice</th>
						<th># Students' 3rd Choice</th>
						<th># Students Chose This For Something</th>
						<th># Students Did Not Choose This For Something</th>
						<th>Preferred Students</th>
						<th>Enrolled Students</th>
					</tr>
					</thead>
					<tbody>
					</tbody>
				</table>


				<table class="dataviz">
					<thead>
					<tr>
						<th>Number &amp; % of Students that got 1st Choice</th>
						<th>Number &amp; % of Students that got 2nd Choice</th>
						<th>Number &amp; % of Students that got 3rd Choice</th>
						<th>Number &amp; % of Students that got One of Their Choices</th>
						<th>Number &amp; % of Students that got none of their choices</th>
						<th>Number &amp; % of Students that got at least one of their friends in their section</th>
					</tr>
					</thead>
					<tbody>
					</tbody>
				</table>
				<div class="chart" id="chart_div1"></div>
				<div class="chart" id="chart_div2"></div>
				<div class="chart" id="chart_div3"></div>
			</li>
		</ul>
		<button id="export-csv">Export Results</button>
	</div>

	

</div>

	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/libs/jquery-1.7.1.min.js"><\/script>')</script>
	<!--Load the AJAX API-->
	    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
	    <?php 
			$results = ($_SESSION)?$_SESSION:NULL;
			if($results){ ?>
				<script>
					var results = <?= json_encode($results);?>;
					var students = results.students.students;
					var theses = results.theses;
					var set_id = results.id;
				</script>
				
		<?php } ?>

		<script type="text/javascript" src="single.js"></script>

  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
  <script>
    var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>

<?php
	
// After using this, destroy the session.
session_destroy();
	
?>