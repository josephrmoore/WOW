jQuery(document).ready(function($){

	// Initialize global variables
	var students_left = [];
	var theses = generateTheses(7);
	var students = generateStudents(80);
	var dataviz;
	// This is the algorithm
	sausage_factory();
	
	// Get dataviz data
	 dataviz = dataviz();
	
	// Print to screen
	for(i=0;i<theses.length;i++){
		$('.theses tbody').append('<tr><td>'+theses[i].id+'</td><td>'+theses[i].teacher+'</td><td>'+theses[i].selections.first+'</td><td>'+theses[i].selections.second+'</td><td>'+theses[i].selections.third+'</td><td>'+theses[i].selections.chosen+'</td><td>'+theses[i].selections.not_chosen+'</td><td>'+theses[i].preferred_students+'</td><td>'+theses[i].enrolled_students+'</td></tr>');
	}

	for(i=0;i<students.length;i++){
		$('.students tbody').append('<tr><td>'+ students[i].id +'</td><td>'+ students[i].preferences.thesis_id[0] +' <em>'+theses[students[i].preferences.thesis_id[0]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[1] +' <em>'+theses[students[i].preferences.thesis_id[1]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[2] +' <em>'+theses[students[i].preferences.thesis_id[2]].teacher+'</em></td><td>'+ students[i].preferences.friend_id +'</td><td>'+students[i].enrolled_thesis+'</td><td>'+students[i].score+'</td></tr>');
	}
	
	// Useful Data/Statistics
	

	
	// Functions
	function generateStudents(total){
		var students = [];
		for(i=0;i<total;i++){
			var t = uniqueRandom(3, theses.length);
			var f = uniqueRandom(Math.floor(Math.random()*(total/8))+3, total);
			students[i] = {
				"id": i,
				"preferences" : {
					"thesis_id" : [
						t[0],t[1],t[2]
					],
					"friend_id": f
				},
				"enrolled_thesis" : -1,
				"score" : 0
			};
		}
		return students;
	}
	
	function generateTheses(total){
		var sections = [];
		for(i=0;i<total;i++){
			sections[i] = {
				"id": i,
				"teacher" : "TeachBot"+(1+i),
				"spaces" : {
					"total":14,
					"taken":0,
					"available":14,
				},
				"preferred_students" : [],
				"enrolled_students" : [],
				"selections" : {}
			};
		}
		return sections;
	}
	
	function uniqueRandom(count, bound){
		if(bound>=count){
			var set = [];
			for(j=0;j<count;j++){
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
		// Initialize student interest data
		for(i=0;i<theses.length;i++){
			var first = 0;
			var second = 0;
			var third = 0;
			var not_chosen = 0;
			var chosen = 0;
			var interested_students = [];

			for(j=0;j<students.length;j++){
				if(students[j].preferences.thesis_id[0] == i){
					first++;
					interested_students.push(students[j].id);
				}
				if(students[j].preferences.thesis_id[1] == i){
					second++;
					interested_students.push(students[j].id);
				}
				if(students[j].preferences.thesis_id[2] == i){
					third++;
					interested_students.push(students[j].id);
				}
				if(students[j].preferences.thesis_id[2] != i && students[j].preferences.thesis_id[1] != i && students[j].preferences.thesis_id[0] != i){
					not_chosen++;
				}
			}
			theses[i].selections.first = first;
			theses[i].selections.second = second;
			theses[i].selections.third = third;
			theses[i].selections.third = third;
			theses[i].selections.not_chosen = not_chosen;
			theses[i].selections.chosen = first+second+third;
		}

		// Initialize variables for runthrough
		var smallest = students.length;
		var highest_score = 0;
		var winner = [];

		// 3 = Number of choices a student can make, this loop runs through 1st, 2nd, & 3rd choices
		for(n=0;n<3;n++){
			// Calculate students scores
			for(i=0;i<students.length;i++){
				students_left.push(students[i].id);
				for(k=0;k<students[i].preferences.friend_id.length;k++){
					if(students[students[i].preferences.friend_id[k]].preferences.thesis_id[n] == students[i].preferences.thesis_id[n]){
						students[i].score++;
					}
				}
			}
			
			// Add students to non-contested sections 
			for(i=0;i<theses.length;i++){
				var choice = ['first','second','third'];
				// There are fewer total 1st choices than spots available in the section
				if(theses[i].selections[choice[n]] <= theses[i].spaces.total-theses[i].enrolled_students.length){
					for(j=0;j<students.length;j++){
						// This student's first choice is this section
						if(students[j].preferences.thesis_id[n] == i){
							// add student
							students[j].enrolled_thesis = i;
							theses[i].enrolled_students.push(j);
							// update who's left
							for(k=0;k<students_left.length;k++){
								if(students_left[k] == students[j].id){
									students_left.splice(k,1);
								}
							}
						}
					}
				}

				// Set students a professor prefers. The 5 is the number of students a teacher can put dibs on.
				var avail = uniqueRandom(Math.floor(Math.random()*5), Math.floor(Math.random()*interested_students.length));
				if(theses[i].enrolled_students.length == 0){
					for(j=0;j<avail.length;j++){
						theses[i].preferred_students.push(interested_students[avail[j]]);	
					}
				}

				// Add teacher preferred students to contested sections
				for(j=0;j<theses[i].preferred_students.length;j++){
					//
					if(students[theses[i].preferred_students[j]].preferences.thesis_id[n] == i){
						// add student
						students[theses[i].preferred_students[j]].enrolled_thesis = i;
						theses[i].enrolled_students.push(theses[i].preferred_students[j]);
						// update who's left
						for(k=0;k<students_left.length;k++){
							if(students_left[k] == students[theses[i].preferred_students[j]].id){
								students_left.splice(k,1);
							}
						}
					}
				}
			}
			
			for(j=0;j<students_left.length;j++){
				var student = students[students_left[j]];
				var friends = student.preferences.friend_id;
				for(k=0;k<friends.length;k++){
					if(n<2){
						var friend_id = friends[k];
						var friend = students[friend_id];
						var friend_thesis_id = friend.enrolled_thesis;
						var friend_thesis = theses[friend_thesis_id];
						if(friend_thesis_id != -1 && friend_thesis.enrolled_students.length<friend_thesis.spaces.total && student.preferences.thesis_id[n+1] == friend_thesis_id){
							student.enrolled_thesis = friend.enrolled_thesis;
							friend_thesis.enrolled_students.push(student.id);
							for(l=0;l<students_left.length;l++){
								if(students_left[l] == students_left[j]){
									students_left.splice(l,1);
								}
							}
						}
					}
				}
			}
		// 	
		// 	// Find out who has the highest score 
		// 	for(j=0;j<students_left.length;j++){
		// 		if(students[students_left[j]].score > highest_score){
		// 			highest_score = students[students_left[j]].score;
		// 		}
		// 	}
		// 	// Re-ordering students left by score
		// 	for(j=highest_score;j>=0;j--){
		// 		winner[j] = [];
		// 		for(k=0;k<students_left.length;k++){
		// 			if(students[students_left[k]].score == j){
		// 				winner[j].push(students[students_left[k]]);
		// 			}
		// 		}
		// 	}
		// 
		// 	// Add winners by highest scores first
		// 	for(i=winner.length-1;i>=0;i--){
		// 		for(j=0;j<winner[i].length;j++){
		// 			var friend_pool = [];
		// 			// Collect all that students' friends
		// 			for(k=0;k<winner[i][j].preferences.friend_id.length;k++){
		// 				if(students[winner[i][j].preferences.friend_id[k]].preferences.thesis_id[n] == winner[i][j].preferences.thesis_id[n] && students[winner[i][j].preferences.friend_id[k]].enrolled_thesis<0){
		// 					friend_pool.push(students[winner[i][j].preferences.friend_id[k]]);
		// 				}
		// 			}
		// 			// If there is space to add the student and all their friends, add them all
		// 			if(friend_pool.length<=theses[winner[i][j].preferences.thesis_id[n]].spaces.total-theses[winner[i][j].preferences.thesis_id[n]].enrolled_students.length){
		// 				for(k=0;k<friend_pool.length;k++){
		// 					// add student
		// 					friend_pool[k].enrolled_thesis = i;
		// 					theses[winner[i][j].preferences.thesis_id[n]].enrolled_students.push(friend_pool[k].id);
		// 					// update who's left
		// 					for(l=0;l<students_left.length;l++){
		// 						if(students_left[l].id == friend_pool[k].id){
		// 							students_left.splice(l,1);
		// 						}
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		}
		
		// "Else" condition for those not added after 1st, 2nd, & 3rd choices
		
		for(i=0;i<students.length;i++){
			var student = students[i];
			// Student not enrolled in a thesis
			if(student.enrolled_thesis == -1){
				// Student has friends
				var friends = student.preferences.friend_id;
				if(friends.length>0){
					// If room left in their friends' thesis sections, add them there
					for(j=0;j<friends.length;j++){
						var friend_id = friends[j];
						var friend = students[friend_id];
						var friend_thesis_id = friend.enrolled_thesis;
						if(friend_thesis_id != -1){
							var friend_thesis = theses[friend_thesis_id];
							console.log(friend_thesis);
							if(friend_thesis.enrolled_students.length<friend_thesis.spaces.total){
								student.enrolled_thesis = friend_thesis_id;
								friend_thesis.enrolled_students.push(student.id);
								for(l=0;l<students_left.length;l++){
									if(students_left[l].id == i){
										students_left.splice(l,1);
									}
								}
							}
						}
					}
				}
			}
			// If not added earlier, due to no friends or no space in friends' sections, put them in the first one with space left.
			if(students[i].enrolled_thesis == -1){
				for(j=0;j<theses.length;j++){
					if(theses[j].enrolled_students.length<theses[j].spaces.total){
						students[i].enrolled_thesis = j;
						theses[j].enrolled_students.push(students[i].id);
						for(l=0;l<students_left.length;l++){
							if(students_left[l].id == i){
								students_left.splice(l,1);
							}
						}
					}
				}
			}
		}
	}
	
	function dataviz(){
		var got_first = 0;
		var got_second = 0;
		var got_third = 0;
		var got_none = 0;
		var got_one = 0;
		var got_friends = 0;

		for(i=0;i<students.length;i++){
			if(students[i].preferences.thesis_id[0] == students[i].enrolled_thesis){
				got_first++;
			} else if (students[i].preferences.thesis_id[1] == students[i].enrolled_thesis){
				got_second++;
			} else if (students[i].preferences.thesis_id[2] == students[i].enrolled_thesis){
				got_third++
			} else {
				got_none++;
			}			
		}

		got_one = got_first+got_second+got_third;

		var dataviz = {
			"got_first" : got_first,
			"got_second" : got_second,
			"got_third" : got_third,
			"got_none" : got_none,
			"got_one" : got_one
		}

		

		$('.dataviz tbody').append('<tr><td>'+dataviz.got_first+' -> '+ (dataviz.got_first/students.length)*100 +'%</td><td>'+dataviz.got_second+' -> '+ (dataviz.got_second/students.length)*100+'%</td><td>'+dataviz.got_third+' -> '+ (dataviz.got_third/students.length)*100+'%</td><td>'+dataviz.got_one+' -> '+ (dataviz.got_one/students.length)*100+'%</td><td>'+dataviz.got_none+' -> '+ (dataviz.got_none/students.length)*100+'%</td><td></td></tr>');

	}
	
});