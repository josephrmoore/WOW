WOW
===

Writing on the Wall - Algorithm

This is the process by which students will be placed in thesis sections. In the sample data I am generating, I am using a student set of 80 and a thesis section set of 6, as this reflects MFADT's actual composition.

We have developed a system where every student rates their top 3 choices for Thesis 1 next semester (Fall 2013) and picks the students s/he wants to be in the class with. Once you’ve done that, an algorithm will place students in their highest possible choice; teachers will also have some influence on who’s in their class. After the algorithm generates the initial results, (a) there will be a short period during which people can swap sections, and (b) there will be the normal add/drop process at the beginning of the semester.

Steps for Placement (M&Ms not included)
=======================================

1. For each thesis section, if the number of first choices is less than or equal to the number of spots, accept those students.
2. If a thesis section has more interest than spots, the teacher's preferences are collected between all "interested students". Those who indicated that thesis as either a 1st, 2nd, or 3rd choice.
3. If a student whose first choice is a contested section has been selected by the professor, that student is accepted.
4. Of all the students already enrolled in a contested section, if any of their chosen friends also selected the section as a first choice, add them. 
5. Of all the students left, if anyone who has this section as a first choice has a selected friend already in the section, add the student.
6. Of all the students left, if there is space left in the contested section, add students who selected it as a first choice until it is full or there are no more students.
7. Repeat steps 2-6 for second and third choices in contested sections.
8. Whatever students haven't been placed, put them in the first section with space left.