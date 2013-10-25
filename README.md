WOW
===

Writing on the Wall - Algorithm v.2

This is the process by which students will be placed in thesis sections. In the sample data I am generating, I am using a student set of 76 and a thesis section set of 6, as this reflects MFADT's actual composition and actual faculty assignment for Spring 2014.

We have developed a system where every student rates their top 3 choices for Thesis 1 next semester (Fall 2013) and picks the students s/he wants to be in the class with. Once you’ve done that, an algorithm will place students in their highest possible choice; teachers will also have some influence on who’s in their class. After the algorithm generates the initial results, (a) there will be a short period during which people can swap sections, and (b) there will be the normal add/drop process at the beginning of the semester.

This build includes a backend for Administration to use more easily (backend.php). Student and teacher choices are input through two CSVs, students.csv & teachers.csv, and imported into the system. Administration can then make any needed alterations to the data to make sure it accurately reflects the students desires. After the data is ingested, you can press the big red button and run the algorithm 25 times, storing the results in a log file. The backend then weights the different results set (% who got one of their choices=3, % got first choice=2, % with a peer=1) to display the best sets up top for the administration to examine more easily. You can examine each results set individually and from each set export it into its own labelled JSON file which can be easily converted to CSV for ingestion into a spreadsheet and distribution for action.

Steps for Placement (Algorithm Explanation)
===========================================

1. For each thesis section, if the number of first choices is less than or equal to the number of spots, accept those students. (Supply Greater than demand -> everyone gets what they want.)

2. If a thesis section has more interest than spots, that section is "contested". A contested section first checks the teacher's preferences to seed the class with the first accepted in.

3. If a student whose first choice is a contested section has been selected by the professor, that student is accepted immediately.

4. Of all the students already enrolled in a contested section, if any of their chosen peers also selected the section as a first choice, add them. 

5. Of all the students outside the section, if anyone who has this section as a first choice has a selected a peer who is already in the section, add that student.

6. Of all the students left, if there is space left in the contested section, add students who selected it as a first choice until it is full or there are no more students.

7. Repeat steps 2-6 for second and third choices in contested sections.

8. Whatever students haven't been placed, put them in the first section with space left.