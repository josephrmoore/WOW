var got_first = 0;
var got_second = 0;
var got_third = 0;
var got_none = 0;
var got_one = 0;
var got_peers = 0;
var ajaxed = false;

jQuery(document).ready(function($){
	var burroughs = [
		"Katherine Moriwaki",
		"John Sharp",
		"Coleen Macklin",
		"Melanie Creen",
		"Anthony Deen",
		"Marko Tendefelt"
	];
	var data;
	var students_left = [];
	var students = [];
	var teacher_chosen;
	var prefs = [];
	var student_data = [];


	$.ajax({
	  dataType: "json",
	  url: "students.json",
	  success: function(d){
	  	var counter = 0;
	  	for(N in d.students){
	  		console.log(d.students[N].choices[1]);
			var s = {
				"id": counter,
				"name": d.students[N].name,
				"current": d.students[N].current,
				"NetID": N,
				"choices" : [d.students[N].choices[0], d.students[N].choices[1], d.students[N].choices[2]],
				"peers": [], // this will be a problem. need to convert from email to N#
				"thesis" : -1
			}
			console.log(s);
			counter++;
			student_data.push(s);
		}
		$.ajax({
		  dataType: "json",
		  url: "teachers.json",
		  success: function(data){
		  	for(i=0;i<data.teachers.length;i++){
			  	if(data.teachers[i].name == "Moriwaki"){
				  	prefs[0] = [];
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
						  	if(choices[k] == student_data[j].NetID){
							  	prefs[0].push(j);
						  	}
					  	}
				  	}
			  	}
			  	if(data.teachers[i].name == "Sharp"){
				  	prefs[1] = [];
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
						  	if(choices[k] == student_data[j].NetID){
							  	prefs[1].push(j);
						  	}
					  	}
				  	}
			  	}
			  	if(data.teachers[i].name == "Macklin"){
				  	prefs[2] = [];	
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
						  	if(choices[k] == student_data[j].NetID){
							  	prefs[2].push(j);
						  	}
					  	}
				  	}		  	
			  	}
			  	if(data.teachers[i].name == "Creen"){
				  	prefs[3] = [];
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
						  	if(choices[k] == student_data[j].NetID){
							  	prefs[3].push(j);
						  	}
					  	}
				  	}
			  	}
			  	if(data.teachers[i].name == "Deen"){
				  	prefs[4] = [];
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
						  	if(choices[k] == student_data[j].NetID){
							  	prefs[4].push(j);
						  	}
					  	}
				  	}
			  	}
			  	if(data.teachers[i].name == "Tandefelt"){
				  	prefs[5] = [];
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
						  	if(choices[k] == student_data[j].NetID){
							  	prefs[5].push(j);
						  	}
					  	}
				  	}
			  	}
		  	}
			// Initialize global variables - generateThesis ***MUST*** always be before generateStudents
			var unshuffled_students = generateStudents(student_data);		
			var shuffled_ids = uniqueRandom(unshuffled_students.length, unshuffled_students.length);
			var theses = generateTheses(6);
			console.log(theses);
			getThesisInterest();
			for(var i=0;i<unshuffled_students.length;i++){
				// students[i] = unshuffled_students[i];
				students[i] = unshuffled_students[shuffled_ids[i]];
			}
			// This is the algorithm
			sausage_factory();
			for(var i=0;i<students.length;i++){
				var fr = '';
				for(var j=0;j<students[i].peers.length;j++){
					fr += characters[students[i].peers[j]];
					fr += ', ';
				}
				fr = fr.substr(0, fr.length-2);
				$('.students tbody').append('<tr><td>'+ characters[students[i].id] +'</td><td class="t">'+ burroughs[students[i].choices[0]] +'</td><td class="t">'+ burroughs[students[i].choices[1]] +'</td><td class="t">'+ burroughs[students[i].choices[2]] +'</td><td>'+ fr +'</td><td class="t">'+burroughs[students[i].thesis]+'</td></tr>');
			}
			// Get dataviz data
			var dataviz = dataviz();
	
		  	ajaxed = true;
		  		// Functions
			function generateTheses(total){
				var sections = [];
				for(var i=0;i<total;i++){
					if(!prefs[i]){
						p = [];
					} else {
						p = prefs[i];
					}
					sections[i] =  {
						"id": i,
						"teacher" : burroughs[i],
						"total" : 14,
						"enrolled":[],
						"teacher_pref": p,
						"choices" : [],
						"not_chosen":0,
						"chosen":0,
						"totalinterest":[]
					};
				}
				return sections;
			}
		
			function getThesisInterest(){
				for(var i=0;i<theses.length;i++){
					var interest = [];
					var pref = [];
					for(var j=0;j<students.length;j++){
						for(var k=0;k<students[j].choices.length;k++){
							if(students[j].choices[k] == i){
								interest.push(j);
							}
						}
					}
					theses[i].totalinterest = interest;
				}
			}
		
			function generateStudents(student_data){
				var students = [];
				for(var i=0;i<student_data.length;i++){
					students[i] = student_data[i];
					students_left.push(students[i].id);	
				}
				return students;
			}
		
	
		
			function uniqueRandom(count, bound){
				if(bound>=count){
					var set = [];
					for(var j=0;j<count;j++){
						if(j==0){
							set[j] = Math.floor(Math.random()*bound);
						} else {
							set[j] = Math.floor(Math.random()*bound);
							for(k=0;k<j;k++){
								if(set[j] == set[k]){
									set[j] = checkRepeat(set[k], set[j], bound);
									k = -1;
								}
							}
						}
					}
					return set;
				} else {
					return false;
				}
			}
		
			function checkRepeat(n1, n2, total){
				if(n1 == n2){
					n2 = Math.floor(Math.random()*total);
					return checkRepeat(n1, n2, total);
				} else {
					return n2;
				}
			}
		
			function sausage_factory(){
				
				iteration++;		
				// Initialize student interest data
				for(var i=0;i<theses.length;i++){
					var first = 0;
					var second = 0;
					var third = 0;
					var not_chosen = 0;
					var chosen = 0;
					var interested_students = [];
		
					for(var j=0;j<students.length;j++){
						if(students[j].choices[0] == i){
							first++;
							interested_students.push(students[j].id);
						}
						if(students[j].choices[1] == i){
							second++;
							interested_students.push(students[j].id);
						}
						if(students[j].choices[2] == i){
							third++;
							interested_students.push(students[j].id);
						}
						if(students[j].choices[2] != i && students[j].choices[1] != i && students[j].choices[0] != i){
							not_chosen++;
						}
					}
					theses[i].choices[0] = first;
					theses[i].choices[1] = second;
					theses[i].choices[2] = third;
					theses[i].not_chosen = not_chosen;
					theses[i].chosen = first+second+third;
				}
				
			// Pre-Iteration
				// For each section...
				for(var i=0;i<theses.length;i++){
					// See how many people picked it as their first choice. i=thesis section, 0=1st choice
					var choosers = getChoice(i, 0);
					// If the number of 1st choice students is less than the total allowable students for that section...
					if(choosers.length<=theses[i].total){
						// Add them all to that section
						for(var j=0;j<choosers.length;j++){
							addStudent(students[choosers[j]],i);					
						}
					}
				}
		
				
			// The remaining sections are contested
			// Iterations (x3) 1st, 2nd, & 3rd choices for thesis
				for(var n=0;n<3;n++){			
					// For each section...
					for(var i=0;i<theses.length;i++){				
						// Find out which students selected that section as this iteration's choice (1st, 2nd, or 3rd). i=thesis section, n=choice, 1-3
						var choosers = getChoice(i, n);
						teacher_chosen = 0;
						teacherChoice(i, choosers);
						if(teacher_chosen>0){
							friendIn(n, i);
							friendOut(n, i);
						}
						oneAttaTime(n, i);
					}
					// Repeat for 2nd & 3rd choices...
				}
				anyLeft();
				printResults();
			}
		
		
		
	// ************************** FUNCTION DECLARATIONS ************************** //
		
		
		
		
			function printResults(){
				var c = $('li.blank').clone();
				c.removeClass('blank');
				c.removeClass('off');
				c.addClass('i-'+iteration);
				// c.find('h1').html('Iteration '+iteration);
				$('li.blank').before(c);
				
				// Print to screen
				for(var i=0;i<theses.length;i++){
					var pr = '';
					var en = '';
					for(var j=0;j<theses[i].teacher_pref.length;j++){
						pr += characters[theses[i].teacher_pref[j]];
						pr += ', ';
					}
					for(var j=0;j<theses[i].enrolled.length;j++){
						en += characters[theses[i].enrolled[j]];
						en += ', ';
					}
					pr = pr.substr(0, pr.length-2);
					en = en.substr(0, en.length-2);
					$('.i-' + iteration + ' .theses tbody').append('<tr><td>'+burroughs[i]+'</td><td>'+theses[i].choices[0]+'</td><td>'+theses[i].choices[1]+'</td><td>'+theses[i].choices[2]+'</td><td>'+theses[i].chosen+'</td><td>'+theses[i].not_chosen+'</td><td>'+pr+'</td><td>'+en+'</td></tr>');
				}
			}
			
			
			function oneAttaTime(n, i){
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are not enrolled in this section and want to be...
					if(students[j].choices[n] == i && students[j].thesis == -1){
						// If there's still room...
						if(theses[i].enrolled.length<theses[i].total){
							// That student is enrolled in the section
							addStudent(students[j],i);
							friendIn(n, i);
							friendOut(n, i);
						}
					}
				}
			}
			
			
			function teacherChoice(i, choosers){
				for(var j=0;j<theses[i].teacher_pref.length;j++){
					for(var k=0;k<choosers.length;k++){
						// If the teacher selected any of those students... 
						if(choosers[k] == theses[i].teacher_pref[j]){
							// Add them to that section
							addStudent(students[choosers[k]], i);
							teacher_chosen++;
						}
					}
				}
			}
			
			
			
			function friendIn(n, i){
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are now enrolled in this section...
					if(students[j].thesis == i){
						for(var k=0;k<students[j].peers.length;k++){
							// If any of their peers selected this section as this iteration's choice (1st, 2nd, 3rd) and there's still room...
							if(students[students[j].peers[k]].choices[n] == i && theses[i].enrolled.length<theses[i].total){
								// The peer is enrolled in the section
								addStudent(students[students[j].peers[k]], i);
							}
						}
					}
				}
			}
			
			function friendOut(n, i){
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are not enrolled in this section and want to be...
					if(students[j].choices[n] == i && students[j].thesis == -1){
						for(var k=0;k<students[j].peers.length;k++){
							// If any of their peers are already enrolled in the section and there's still room...
							if(students[students[j].peers[k]].thesis == i && theses[i].enrolled.length<theses[i].total){
								// That student is enrolled in the section
								addStudent(students[j],i);
							}
						}
					}
				}
			}
			
			function spaceLeft(n, i){
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are not enrolled in this section and want to be...
					if(students[j].choices[n] == i && students[j].thesis == -1){
						// If there's still room...
						if(theses[i].enrolled.length<theses[i].total){
							// That student is enrolled in the section
							addStudent(students[j],i);
						}
					}
				}
			}
			
			function anyLeft(){
				// For each section...
				for(var j=0;j<students.length;j++){
					if(students[j].thesis == -1){
						for(var k=0;k<theses.length;k++){
							// If there is space left
							if(theses[k].enrolled.length<theses[k].total){
								// Add that student
								addStudent(students[j], k);
							}
						}
					}
				}
				
				var postdata = {
					'results': [
						theses, students, unshuffled_students
					]
				};
				$.ajax({
					url: "savelog.php",
					type:"POST",
					data: postdata,
					success: function(result){
						console.log(postdata);
						console.log("success! " + result);
						window.close();
					}
				});			
		
			}
			
			
			function getChoice(section, choice){
				var choosers = [];
				for(var i=0;i<students.length;i++){
					if(students[i].choices[choice] == section){
						choosers.push(i);
					}
				}
				return choosers;
			}
			
			function addStudent(student, section){
				if(student.thesis == -1){
					student.thesis = section;
					theses[section].enrolled.push(student.id);
				}
			}
			
			function studentsLeft(){
				var sl = [];
				for(var i=0;i<students.length;i++){
					if(students[i].thesis == -1){
						sl.push(i);
					}
				}
				return sl;
			}
			
			function dataviz(){
		
				for(var i=0;i<students.length;i++){
					if(students[i].choices[0] == students[i].thesis){
						got_first++;
					} else if (students[i].choices[1] == students[i].thesis){
						got_second++;
					} else if (students[i].choices[2] == students[i].thesis){
						got_third++
					} else {
						got_none++;
					}
					var peers = students[i].peers;
					var flag = false;
					for(var j=0;j<peers.length;j++){
						var peer_id = peers[j];
						var peer = students[peer_id];
						if(peer.thesis == students[i].thesis){
							flag = true;
						}
					}
					if(flag){
						got_peers++;
					}
				}
		
				got_one = got_first+got_second+got_third;
		
				var dataviz = {
					"got_first" : got_first,
					"got_second" : got_second,
					"got_third" : got_third,
					"got_none" : got_none,
					"got_one" : got_one,
					"got_peers" : got_peers
				}
		
				
		
				$('.dataviz tbody').append('<tr><td>'+dataviz.got_first+' -> '+ (dataviz.got_first/students.length)*100 +'%</td><td>'+dataviz.got_second+' -> '+ (dataviz.got_second/students.length)*100+'%</td><td>'+dataviz.got_third+' -> '+ (dataviz.got_third/students.length)*100+'%</td><td>'+dataviz.got_one+' -> '+ (dataviz.got_one/students.length)*100+'%</td><td>'+dataviz.got_none+' -> '+ (dataviz.got_none/students.length)*100+'%</td><td>'+dataviz.got_peers+' -> '+ (dataviz.got_peers/students.length)*100 +'%</td></tr>');
		
		
			}
			
			$('#run_me_again').click(function(){
				got_first = 0;
				got_second = 0;
				got_third = 0;
				got_none = 0;
				got_one = 0;
				got_peers = 0;
				students_left = [];
				theses = generateTheses(6);
				unshuffled_students = generateStudents(student_data);
				shuffled_ids = uniqueRandom(unshuffled_students.length, unshuffled_students.length);
				students = [];
				for(var i=0;i<unshuffled_students.length;i++){
					students[i] = unshuffled_students[shuffled_ids[i]];
				}
				// This is the algorithm
				sausage_factory();
			});
			
			$('#show_hide_students').click(function(){
				if($('table.students').hasClass('off')){
					$('table.students').removeClass('off');
					$('#show_hide_students').html('-');
				} else {
					$('table.students').addClass('off');
					$('#show_hide_students').html('+');
				}
			});
		  }
		});
	  }
	});
	
	var iteration = 0;



	var characters = [
		'Larry Stooge',
		'Moe Stooge',
		'Curly Stooge',
		'Bugs Bunny',
		'Elmer Fudd',
		'Daffy Duck',
		'Foghorn Leghorn',
		'Sylvester',
		'Tweety Bird',
		'Marvin Martian',
		'Wile E. Coyote',
		'Road Runner',
		'Speedy Gonzales',
		'Pepe Le Pew',
		'Petunia Pig',
		'Yosemite Sam',
		'Tasmanian Devil',
		'Tasmanian She-Devil',
		'Mickey Mouse',
		'Pluto',
		'Sluggo',
		'Nancy',
		'Charlie Brown',
		'Linus',
		'Lucy',
		'Pigpen',
		'Snoopy',
		'Woodstock',
		'Doctor Jekyll',
		'Mister Hyde',
		'Huey',
		'Dewey',
		'Louie',
		'Pee-Wee Herman',
		'Cowboy Curtis',
		'Miss Yvonne',
		'Globey',
		'Randy',
		'Pterri',
		'Clockey',
		'Floory',
		'Dog Chair',
		'Conky 2000',
		'Jambi',
		'Chairry',
		'Mario',
		'Luigi',
		'Princess Peach',
		'Toad',
		'Bowser',
		'Yoshi',
		'Wario',
		'Wa-Luigi',
		'Donkey Kong',
		'Diddy Kong',
		'Dixie Kong',
		'Cranky Kong',
		'Candy Kong',
		'Funky Kong',
		'Maxwell Smart',
		'Agent 99',
		'Chief',
		'Agent 13',
		'Batman',
		'Robin',
		'Superman',
		'Captain Marvel',
		'Wonder Woman',
		'Batgirl',
		'Catwoman',
		'Green Lantern',
		'Flash',
		'Daredevil',
		'Invisible Woman',
		'The Hulk',
		'The Thing',
		'Thor',
		'Iron Man',
		'Captain Kirk',
		'Scotty',
		'Bones',
		'Spock',
		'Jim',
		'Uhura',
		'Sulu'
	];
	
});

// Load the Visualization API and the piechart package.
  google.load('visualization', '1.0', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
function drawChart(){
	var i = setInterval(function(){
		if(ajaxed){
			drawChart1();
			drawChart2();
			drawChart3();
		}
	}, 100);
}
  function drawChart1() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choice');
    data.addColumn('number', 'Students');
    data.addRows([
      ['1st Choice', got_first],
      ['2nd Choice', got_second],
      ['3rd Choice', got_third],
      ['No choice', got_none],
    ]);

    // Set chart options
    var options = {'title':'Students by choice',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div1'));
    chart.draw(data, options);
  }

  function drawChart2() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choice');
    data.addColumn('number', 'Students');
    data.addRows([
      ['Got one of their choices', got_one],
      ['Didn\'t get any of their choices', got_none],
    ]);

    // Set chart options
    var options = {'title':'Got One vs. Got None',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
    chart.draw(data, options);
  }

  function drawChart3() {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Choice');
    data.addColumn('number', 'Students');
    data.addRows([
      ['In a section with a peer', got_peers],
      ['In a section with no peers', (80-got_peers)]
    ]);

    // Set chart options
    var options = {'title':'Students by peers',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div3'));
    chart.draw(data, options);
  }