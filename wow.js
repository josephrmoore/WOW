jQuery(document).ready(function($){

	var students_left = [];
	var theses = generateTheses(7);
	var students = generateStudents(80);
	// console.log(students);
	// console.log(theses);
	
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
	
	var smallest = students.length;
	var highest_score = 0;
	var winner = [];

	for(n=0;n<3;n++){
		for(i=0;i<students.length;i++){
			students_left.push(students[i].id);
			for(k=0;k<students[i].preferences.friend_id.length;k++){
				if(students[students[i].preferences.friend_id[k]].preferences.thesis_id[n] == students[i].preferences.thesis_id[n]){
					students[i].score++;
				}
			}
		}

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
		
			// Add teacher preferred students
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
			if(students[students_left[j]].score > highest_score){
				highest_score = students[students_left[j]].score;
			}
		}
		for(j=highest_score;j>=0;j--){
			winner[j] = [];
			for(k=0;k<students_left.length;k++){
				if(students[students_left[k]].score == j){
					winner[j].push(students[students_left[k]]);
				}
			}
		}
		// console.log(winner);

		for(i=winner.length-1;i>=0;i--){
			// console.log("i " + i);
			for(j=0;j<winner[i].length;j++){
				// console.log("j " + j);
				var friend_pool = [];
				for(k=0;k<winner[i][j].preferences.friend_id.length;k++){
					// console.log("k " + k);
					if(students[winner[i][j].preferences.friend_id[k]].preferences.thesis_id[n] == winner[i][j].preferences.thesis_id[n] && students[winner[i][j].preferences.friend_id[k]].enrolled_thesis<0){
						// console.log(winner[i][j]);
						friend_pool.push(students[winner[i][j].preferences.friend_id[k]]);
					}
				}
				if(friend_pool.length<=theses[winner[i][j].preferences.thesis_id[n]].spaces.total-theses[winner[i][j].preferences.thesis_id[n]].enrolled_students.length){
					for(k=0;k<friend_pool.length;k++){
						// add student
						friend_pool[k].enrolled_thesis = i;
						theses[winner[i][j].preferences.thesis_id[n]].enrolled_students.push(friend_pool[k].id);
						// update who's left
						for(l=0;l<students_left.length;l++){
							if(students_left[l].id == friend_pool[k].id){
								students_left.splice(l,1);
							}
						}
					}
				}
				// console.log(friend_pool);
			}
		}
	}
	
	for(i=0;i<students.length;i++){
		if(students[i].enrolled_thesis == -1){
			console.log("not enrolled");
			if(students[i].preferences.friend_id.length>0){
				console.log("has friends");
				for(j=0;j<students[i].preferences.friend_id.length;j++){
					if(theses[students[students[i].preferences.friend_id[j]].enrolled_thesis].enrolled_students.length<theses[students[students[i].preferences.friend_id[j]].enrolled_thesis].spaces.total){
						console.log("friends' section");
						students[i].enrolled_thesis = students[students[i].preferences.friend_id[j]].enrolled_thesis;
						theses[students[students[i].preferences.friend_id[j]].enrolled_thesis].enrolled_students.push(students[i].id);
						for(l=0;l<students_left.length;l++){
							if(students_left[l].id == i){
								students_left.splice(l,1);
							}
						}
					}
				}
			}
		}
		if(students[i].enrolled_thesis == -1){
			console.log("not enrolled");
			for(j=0;j<theses.length;j++){
				console.log(theses[j].enrolled_students);
				if(theses[j].enrolled_students.length<theses[j].spaces.total){
					console.log("space available");
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
	
		for(i=0;i<theses.length;i++){
			$('.theses tbody').append('<tr><td>'+theses[i].id+'</td><td>'+theses[i].teacher+'</td><td>'+theses[i].selections.first+'</td><td>'+theses[i].selections.second+'</td><td>'+theses[i].selections.third+'</td><td>'+theses[i].selections.chosen+'</td><td>'+theses[i].selections.not_chosen+'</td><td>'+theses[i].preferred_students+'</td><td>'+theses[i].enrolled_students+'</td></tr>');
		}
	
		for(i=0;i<students.length;i++){
			$('.students tbody').append('<tr><td>'+ students[i].id +'</td><td>'+ students[i].preferences.thesis_id[0] +' <em>'+theses[students[i].preferences.thesis_id[0]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[1] +' <em>'+theses[students[i].preferences.thesis_id[1]].teacher+'</em></td><td>'+ students[i].preferences.thesis_id[2] +' <em>'+theses[students[i].preferences.thesis_id[2]].teacher+'</em></td><td>'+ students[i].preferences.friend_id +'</td><td>'+students[i].enrolled_thesis+'</td><td>'+students[i].score+'</td></tr>');
		}
	
	
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

	}
	
});