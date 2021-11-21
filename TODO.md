<h1>TODO LIST HW4</h1>

- [x] <strong>User Login</strong> - when a user creates a new account it automatically logs the user in and sends them to the home screen. Note that there is no mechanism for users to login if they already have an account. Add a Loginmenu item option above Create New Account in the menu that brings the user to a login screen using a login route. Your login screen should look like Figure 1 below. To get it to look like this, you should find the suitable Material UI Template.

- [x] Account Error Modals - when a user tries to create a new account or tries to login to an existing account, should they provides inadequate or erroneous information your application should open a Material UI Modal that should contain a Material UI Alert with a warning message and a single Material UI Button to close the modal. You may style the modal as you like but make sure it looks nice.

- [x] User Initials - once a user logs in their the initials for their first and last name should be shown in the accounts menu as in Figure 2.

- [x] User Logout - once the user logs in the menu should only have one option, Logout. Clicking on it should log the user out and return them to the splash screen.

- [x] User-Owned Lists Only - currently, when the user logs in all the lists in the database are shown on the home page. Change this so that each list is owned by a single user. Ownership should be assigned when the list is created. Only the lists owned by the logged in user should be shown on the home screen. So, each user will see a different listing of lists (i.e. the ones they own).

- [x] User Loading, Editing and Deleting Owned Lists - don't let users load, edit, or delete lists that do not belong to them. You should test this by trying out routes using lists belonging to other users.

- [x] List Deletion - the list has a button for deleting each list, but it doesn't work. Correct this. Make sure list deletion works as it did in HW 3 but this time with a Material UI Modal that asks for verification before actually deleting the list. Such a modal must provide Confirm/Cancel options to the user just like in HW 3.

- [x] Item Editing - currently list items can be dragged but their text cannot be edited. Fix this, and make sure all edits (dragging and text) can be undone and redone. Note that you should use Material UI textfields such that they look approximately like the ones used for editing list names with the heading and outline.

- [x] List Saving - remember that after every single edit, data should be saved to the database.

- [x] Foolproof Design - make sure the undo, redo, and close buttons are only enabled when they are usable.

- [x] Version Control - make sure you use Git for the full duration of the project. Make commits at least for each completed task. You should be ready to show the TA a commit for each task you wish to receive points for.


<h1>Question</h1>
- [ ] Ask why at the start of the app, it behaves in a weird way
