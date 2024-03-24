# Happy Campers (frontend) - Project Four (GA)

This was a project with a Django/Pyhton backend, SQL database and REACT frontend. For this project, I decided to create a tool that was based on something that would’ve been useful as a tool for my previous job. It is a web application where parents can register their kids for the available Holiday Camps, and Staff members can see these registrations and information about the kids.


![app-screenshot](https://i.imgur.com/QWCE8pv.png)

## Deployment

The app has been deployed and is available [here](https://happy-campers.netlify.app/).

## Getting started

This project is separated into two repos, frontend and [backend](https://github.com/mafventura/happycampers-backend). 

1. Access the source code via the 'Clone or download' button 
2. In CLI, run `npm i` on the root level to install dependencies
3. Run `npm start` to run the program in your local environment


## Goal and timeframe:
This was a solo project and we had a week to code it.


## Technologies used:
* Django
* Django REST framework
* PostgreSQL
* Python
* JavaScript
* React.js
* HTML
* CSS
* Sass
* Axios
* GitHub
* react-bootstrap
* jwt-decode
* react-icons
* react-router-dom


## Brief:
☐ Be a full-stack **Django/React** application.

☐ Connect to and perform data operations on a **PostgreSQL** database (the default SQLLite3 database is not acceptable).

☐ If consuming an API (OPTIONAL), have at least **one data entity** (Model) in addition to the built-in User model. The related entity can be either a **one-to-many (1:M) or a many-to-many (M:M)** relationship.  

☐ If not consuming an API, have at least **two data entities** (Models) in addition to the built-in User model. It is preferable to have at least **one one-to-many (1:M) and one many-to-many (M:M)** relationship between entities/models.  

☐ Have **full-CRUD data operations** across any combination of the app's models (excluding the User model). For example, creating/reading/updating posts and creating/deleting comments qualifies as full-CRUD data operations. 

☐ **Authenticate users using Django's built-in authentication**.

☐ **Implement authorization by restricting access to the Creation, Updating & Deletion of data resources** using the `login_required` decorator in the case of view functions; or, in the case of class-based views, inheriting from the `LoginRequiredMixin` class.

☐ Be **deployed online** using **Railway**. Presentations must use the deployed application.


## Planning:
I created an excalidraw with the colour scheme to be used and with the initial ideas of how the app should work and feel. Most important was the ERD to organize the project models and how they would connect to each other.

![planning-screenshot](https://i.imgur.com/24su2tN.png)
![planning-screenshot](https://i.imgur.com/cMVOQ9k.png)


## Process
Day 1:
- Created the Django and React Skeletons
- Set up Django as a Rest API
- Created the initial serialises, models and views

Day 2:
- Started the long battle with Auth. After a lot of research, I was able to build it with the simplejwt, creating tokens and refreshing tokens that get stored in local storage and removing them in logout.
- Added some initial styling to the frontend (I know it was early, but I can’t help myself 😅)
- In the intervals of my long battle with the Auth, I took little breaks to figure out how to work with Sass and Bootstrap to have the primary, secondary etc colours match my chosen theme.
- After the Login and Logout battle, I wasn’t strong enough to tackle the Sign Up so I created some basic GET routes, so I could show the data in the database to the front end. For the kids, I had to create two views, one for the user (Parent) where they can only see their own kids and a different one for the Staff that can see all kids in the database


```python
class KidViewSet(viewsets.ModelViewSet):
   serializer_class = KidSerializer
   permission_classes = [IsAuthenticated]


   def get_queryset(self):
       return Kid.objects.filter(user=self.request.user)
  
   @action(detail=False, methods=['get'])
   def list_all(self, request):
       queryset = Kid.objects.all()
       serializer = self.get_serializer(queryset, many=True)
       return Response(serializer.data)
  
   @action(detail=True, methods=['get'])
   def list_one(self, request, pk=None):
       try:
           kid = Kid.objects.get(id=pk)
           serializer = self.get_serializer(kid)
           return Response(serializer.data)
       except Kid.DoesNotExist:
           return Response({"error": "Kid not found"}, status=status.HTTP_404_NOT_FOUND)
```
On the frontend they are structured the same:

```javascript
function getKids() {
       axios.get(`${process.env.REACT_APP_BACKEND_URL}/kids`,
       {
           headers: {
               'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
               'Content-Type': 'application/json'
           }
       })
       .then((response) => {
           setKids(response.data)
           console.log("RESPONSE.DATA", response.data);
       })
       .catch(error => console.error("Error fetching kids", error))
   }
  
   function getAllKids() {
       axios.get(`${process.env.REACT_APP_BACKEND_URL}/kids/list_all`,
       {
           headers: {
               'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
               'Content-Type': 'application/json'
           }
       })
       .then((response) => {
           setKids(response.data)
       })
       .catch(error => console.error("Error fetching kids", error))
   }
```
- Tried to tackle adding new data to the Kid model. It did not go well, so I decided to call it a day and try again tomorrow.

Day 3:
- With some help, I tackled the Signup part of the project and was able to implement it. It was good to get it done because it helped me figure out the structure for the other functions.
- Created the necessary functions to finally be able to add a new kid to my database! Woo-hoo! Progress!

```python
def post(self, request, *args, **kwargs):
       user = request.user
       data = request.data


       try:
           new_kid = Kid.objects.create(
               name=data.get("name"),
               dob=data.get("dob"),
               school=data.get("school"),
               allergies=data.get("allergies"),
               emergency_contact=data.get("emergency_contact"),
               leaving_permissions=data.get("leaving_permissions"),
               user=user
           )
           return Response(status=status.HTTP_201_CREATED, data=self.get_serializer(new_kid).data)
       except ValidationError as ve:
           return Response({"error": str(ve)}, status=status.HTTP_400_BAD_REQUEST)
       except Exception as e:
           return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
```
Figured out I had to pay close attention to the data I was sending because Django can be peculiar in what it is receiving!
- Started the process of differing the users between staff and normal users, by calling the native is_staff field from Django and sending it to the frontend. By decoding the token I was able to get the necessary information to create a function that allows my frontend to know if the user is staff or not.

- Started reformulating my NavBar to show different options for the different types of users.
- Whenever I need a break from the mess of code, I always find the time to add some more styling to my app 😊 (I can’t help it, I just love styling okay?)
- Uh oh, I realised that I haven’t been very good with saving any changes to GitHub. It was time to fix it!
- I called it a day while on a win!

Day 4:
- It was CRUD day! I went model by model and started getting all the functionality in. Created the Edit and Delete functionalities for the Kids Model and duplicated them for the other models.
- Created the functionality to Add Staff Members if connected with another Staff Account.
- I had to rearrange my models a bit, to make the weeks be the point of connection between the kids and the Camps. Now the Kids are registered for certain weeks, which are then associated with a Camp. For this, I had to add a Many to Many relationship between the Kids and Weeks.

Day 5:
- It’s crunch time! Had to rearrange a lot of styling, added different colours to differentiate the normal user and staff user.
- Tackled the big monster that was connecting all the information so that on the detail page of a kid you can see the weeks they are registered to, on the Camps you can see the weeks that are available and add new weeks.
- Created the register to camp function:

```javascript
function handleKidChange(e) {
       setKidToRegister(e.target.value);
   }
```
Made it possible to change the kid from a dropdown selection and set its value to be the one to register.
```javascript
function handleCheckboxChange(weekId) {
       // Check if weekId is already in selectedWeeks
       const index = weeksToRegister.indexOf(weekId);


       if (index === -1) {
           // If not in selectedWeeks, add it
           setWeeksToRegister([...weeksToRegister, weekId]);
       } else {
           // If already in selectedWeeks, remove it
           const updatedWeeks = [...weeksToRegister];
           updatedWeeks.splice(index, 1);
           setWeeksToRegister(updatedWeeks);
       }
   }
```
From the list of weeks available for that specific camp, you can choose the ones you want and they’ll be added to the list/array.
```javascript
function handleSubmit(e) {
       e.preventDefault();


       if (!kidToRegister || weeksToRegister.length === 0) {
           return;
       }


       weeksToRegister.forEach((week) => {
           const data = {
               week_id: week,
               kid_id: parseInt(kidToRegister),
           };


           axios
               .put(`${process.env.REACT_APP_BACKEND_URL}/weeks/register_kid/`, data)
               .then((response) => {
                   console.log("Kid registered successfully:", response.data);
               })
               .then(navigate(`/kids`))
               .catch((error) => {
                   console.error("Error registering kid:", error);
               });
       });
   }
```
Finally it was a matter of sending the information to the backend/database.

### Challenges
The main challenge was figuring out how to connect the Django REST framework to the React.js frontend and how they communicate with each other since this was not something we covered during the classes. After that, it was just a matter of trial and error and learning with all the logs and errors which were mostly caused by the specificity of how Django wants the information to be delivered to add/change/delete it from the database, and how to send that data from React with axios.

### Wins
My biggest win was how independent I was able to be in this project, solving the errors and logs by myself, while only asking for some guidance at certain times. On top of that being able to create an entire workable project with a new language was amazing.

## Key learnings
Certainly, the biggest learning and takeaway was learning and being able to work with Django REST framework and a relational database with PostgreSQL which was new to this project.

## Known errors or bugs
* When loading the kids' details and camps details, the weeks do not show the first time, you have to leave and come back and then they show.

## Future improvements
* Fixing the weeks only appearing on the second time we visit the page.
* Trying to make some of the filtering on the backend instead of the frontend, which I think will make the app smoother.
* Delete and Edit function to the weeks.
* For the staff members to be able to add or edit kids or at least be able to make notes on the existing kids.

