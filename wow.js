// this runs algorithm
// attached to index.php
// runs when popups open (25 times)
// each time gets saved to log.txt
// backend lets user see results of log.txt

var got_first = 0;
var got_second = 0;
var got_third = 0;
var got_none = 0;
var got_one = 0;
var got_peers = 0;
var ajaxed = false;
var numstudents = 0;

jQuery(document).ready(function($){
	// list of teachers
	var burroughs = [
		"David Carroll",
		"Anezka Sebek",
		"Colleen Macklin",
		"Melanie Crean",
		"Anthony Deen",
		"Marko Tandefelt",
		"Scott Pobiner"
	];
	// unknown
	var data;
	// temporarily stores remaining students before they're placed in a thesis section
	var students_left = [];
	// container for json.students data
	var students = [];
	// unknown
	var teacher_chosen;
	// empty array to store teacher student preferences?
	var prefs = [];
	// variable for processed data after ajax loads students.json
	var student_data = [];


	$.ajax({
	  dataType: "json",
	  url: "students.json",
	  success: function(d){
	  	// maybe not used
	  	var counter = 0;
	  	for(N in d.students){
	  		var peers = d.students[N].peers;
	  		// split string of peers into array
	  		var arr = (true) ? peers.split(" ") : "";
	  		// array index in student object of each peer
	  		var counter2 = 0;
	  		for(N2 in d.students){
	  			// loop through students second time
		  		for(i=0;i<arr.length;i++){
		  			// store peer as an array index number instead of an N number
			  		if(N2 == arr[i]){
				  		arr[i] = counter2;
			  		}
		  		}
		  		counter2++;
	  		}
	  		// single processed student gets pushed to student_data array
			var s = {
				"id": counter, // maybe not used
				"name": d.students[N].name, // students name
				"current": d.students[N].current, // current thesis teacher
				"NetID": N, // their N number
				"choices" : [d.students[N].choices[0], d.students[N].choices[1], d.students[N].choices[2]],
				"peers": arr, //  this will be a problem. need to convert from email to N#
				"thesis" : -1 // their array, -1 means hasn't been sorted
			}
			counter++;
			student_data.push(s);
		}
		$.ajax({
		  dataType: "json",
		  url: "teachers.json",
		  success: function(data){
		  	for(i=0;i<data.teachers.length;i++){
			  	if(data.teachers[i].name == "Carroll"){
			  		// all section preferences
			  		// student indices not n numbers
				  	prefs[0] = [];
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
					  		// if professor's n number choice matches student's N number
						  	if(choices[k] == student_data[j].NetID){
						  		// each array has an index
						  		// add array index of student from student_data to prefs 0 array 
							  	prefs[0].push(j);
						  	}
					  	}
				  	}
			  	}
			  	// repeat with next ... teachers
			  	if(data.teachers[i].name == "Sebek"){
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
			  	if(data.teachers[i].name == "Crean"){
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
			  	if(data.teachers[i].name == "Pobiner"){
				  	prefs[6] = [];
				  	choices = data.teachers[i].choices.split(" ");
				  	for(j=0;j<student_data.length;j++){
					  	for(k=0; k<choices.length; k++){
						  	if(choices[k] == student_data[j].NetID){
							  	prefs[6].push(j);
						  	}
					  	}
				  	}
			  	}
		  	}
			// Initialize global variables - generateThesis ***MUST*** always be before generateStudents
			// create AJAX SCOPE STUDENT ARRAY!
			var students = generateStudents(student_data);
			// get number of students
			numstudents = students.length;
			// take students array and create a new array of all index number shuffled in a new order
			var shuffled_ids = uniqueRandom(students.length, students.length);
			var theses = generateTheses(7);
			getThesisInterest();
/*
			for(var i=0;i<unshuffled_students.length;i++){
				// students[i] = unshuffled_students[i];
				students[i] = unshuffled_students[shuffled_ids[i]];
			}
*/
			// This is the algorithm
			sausage_factory();

			// after algorithm runs, show stuff in results (single.php)
			for(var i=0;i<students.length;i++){
				var fr = '';
				for(var j=0;j<students[students[i].id].peers.length;j++){
					fr += students[students[students[i].id].peers[j]].name;
					fr += ', ';
				}
				fr = fr.substr(0, fr.length-2);
				$('.students tbody').append('<tr><td>'+ students[students[i].id].name +'</td><td class="t">'+ burroughs[students[students[i].id].choices[0]] +'</td><td class="t">'+ burroughs[students[students[i].id].choices[1]] +'</td><td class="t">'+ burroughs[students[students[i].id].choices[2]] +'</td><td>'+ fr +'</td><td class="t">'+burroughs[students[students[i].id].thesis]+'</td></tr>');
			}
			// Get dataviz data
			var dataviz = dataviz();
	
		  	ajaxed = true;
		  		// Functions
			function generateTheses(total){
				var sections = [];
				for(var i=0;i<total;i++){
					// if teacher doesn't have a student preference(?) add a blank array
					if(!prefs[i]){
						p = [];
					} else {
						// otherwise make p their set of preferences
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
				// add student to total interest array to keep track of all students interested in each section / teacher
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
				// move contents from student_data into new students array
				// push every student id into students_left
				var students = [];
				for(var i=0;i<student_data.length;i++){
					students[i] = student_data[i];
					students_left.push(students[i].id);	
				}
				return students;
			}
		
	
		
			function uniqueRandom(count, bound){
				// has to do with shuffling student's order
				// count = array length
				// bound = range of data
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
				// after thesis object created
				// data viz using google forms
				iteration++;		
				// Initialize student interest data
				for(var i=0;i<theses.length;i++){
					// totals for how many people want each teacher's thesis section 
					var first = 0;
					var second = 0;
					var third = 0;
					// how many students didn't pick them at all
					var not_chosen = 0;
					// total amount of people that picked them
					var chosen = 0;
					// all the students interested in a given section 
					var interested_students = [];
		
					for(var j=0;j<students.length;j++){
						if(students[shuffled_ids[j]].choices[0] == i){
							first++;
							interested_students.push(students[shuffled_ids[j]].id);
						}
						if(students[shuffled_ids[j]].choices[1] == i){
							second++;
							interested_students.push(students[shuffled_ids[j]].id);
						}
						if(students[shuffled_ids[j]].choices[2] == i){
							third++;
							interested_students.push(students[shuffled_ids[j]].id);
						}
						if(students[shuffled_ids[j]].choices[2] != i && students[shuffled_ids[j]].choices[1] != i && students[shuffled_ids[j]].choices[0] != i){
							not_chosen++;
						}
					}
					theses[i].choices[0] = first;
					theses[i].choices[1] = second;
					theses[i].choices[2] = third;
					theses[i].not_chosen = not_chosen;
					theses[i].chosen = first+second+third;
				}
				
				// Pre-Iteration (uncontested sections)
				// For each section...
				for(var i=0;i<theses.length;i++){
					// See how many people picked it as their first choice. i=thesis section, 0=1st choice
					var choosers = getChoice(i, 0);
					// If the number of 1st choice students is less than the total allowable students for that section...
					if(choosers.length<=theses[i].total){
						// Add them all to that section
						for(var j=0;j<choosers.length;j++){
							// add student to thesis without any other checks
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
				students_small = {
					"students" : []
				};
				for(i=0;i<students.length;i++){
					var s = {
						"id": students[i].id,
						"NetID": students[i].NetID,
						"choices": students[i].choices,
						"thesis": students[i].thesis,
						"current": students[i].current,
						"name": students[i].name
					}
					students_small.students.push(s);
				}
				var postdata = {
					'theses' : theses,
					'students': students_small
				};
				$.ajax({
					url: "savelog.php",
					type:"POST",
					data: postdata,
					success: function(result){
						console.log("success! " + result);
						window.close();
					}
				});	
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
						pr += students[theses[i].teacher_pref[j]].name;
						pr += ', ';
					}
					for(var j=0;j<theses[i].enrolled.length;j++){
						en += students[theses[i].enrolled[j]].name;
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
					if(students[shuffled_ids[j]].choices[n] == i && students[shuffled_ids[j]].thesis == -1){
						// If there's still room...
						if(theses[i].enrolled.length<theses[i].total){
							// That student is enrolled in the section
							addStudent(students[shuffled_ids[j]],i);
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
					if(students[shuffled_ids[j]].thesis == i){
						for(var k=0;k<students[shuffled_ids[j]].peers.length;k++){
							// console.log(students[shuffled_ids[j]].peers[k]);
							if(students[shuffled_ids[j]].peers.length > 0 && students[shuffled_ids[j]].peers[k] !== undefined){
								// If any of their peers selected this section as this iteration's choice (1st, 2nd, 3rd) and there's still room...
								if(students[students[shuffled_ids[j]].peers[k]] !== undefined && students[students[shuffled_ids[j]].peers[k]].choices[n] !== undefined && students[students[shuffled_ids[j]].peers[k]].choices[n] == i && theses[i].enrolled.length<theses[i].total){
									// The peer is enrolled in the section
									addStudent(students[students[shuffled_ids[j]].peers[k]], i);
								}
							}
						}
					}
				}
			}
			
			function friendOut(n, i){
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are not enrolled in this section and want to be...
					if(students[shuffled_ids[j]].choices[n] == i && students[shuffled_ids[j]].thesis == -1){
						for(var k=0;k<students[shuffled_ids[j]].peers.length;k++){
							// If any of their peers are already enrolled in the section and there's still room...
							if(students[students[shuffled_ids[j]].peers[k]].thesis == i && theses[i].enrolled.length<theses[i].total){
								// That student is enrolled in the section
								addStudent(students[shuffled_ids[j]],i);
							}
						}
					}
				}
			}
			
			function spaceLeft(n, i){
				// For all the students...
				for(var j=0;j<students.length;j++){
					// If they are not enrolled in this section and want to be...
					if(students[shuffled_ids[j]].choices[n] == i && students[shuffled_ids[j]].thesis == -1){
						// If there's still room...
						if(theses[i].enrolled.length<theses[i].total){
							// That student is enrolled in the section
							addStudent(students[shuffled_ids[j]],i);
						}
					}
				}
			}
			
			function anyLeft(){
				// For each section...
				for(var j=0;j<students.length;j++){
					if(students[shuffled_ids[j]].thesis == -1){
						for(var k=0;k<theses.length;k++){
							// If there is space left
							if(theses[k].enrolled.length<theses[k].total){
								// Add that student
								addStudent(students[shuffled_ids[j]], k);
							}
						}
					}
				}		
			}
			
			
			function getChoice(section, choice){
				var choosers = [];
				for(var i=0;i<students.length;i++){
					if(students[shuffled_ids[i]].choices[choice] == section){
						choosers.push(shuffled_ids[i]);
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
					if(students[shuffled_ids[i]].thesis == -1){
						sl.push(shuffled_ids[i]);
					}
				}
				return sl;
			}
			
			function dataviz(){
		
				for(var i=0;i<students.length;i++){
					if(students[shuffled_ids[i]].choices[0] == students[shuffled_ids[i]].thesis){
						got_first++;
					} else if (students[shuffled_ids[i]].choices[1] == students[shuffled_ids[i]].thesis){
						got_second++;
					} else if (students[shuffled_ids[i]].choices[2] == students[shuffled_ids[i]].thesis){
						got_third++
					} else {
						got_none++;
					}
					var peers = students[shuffled_ids[i]].peers;
					var flag = false;
					for(var j=0;j<peers.length;j++){
						var peer_id = peers[j];
						var peer = students[peer_id];
						if(peer.thesis == students[shuffled_ids[i]].thesis){
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
      ['In a section with no peers', (numstudents-got_peers)]
    ]);

    // Set chart options
    var options = {'title':'Students by peers',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div3'));
    chart.draw(data, options);
  }