/*

GET - When you want to get some data from server.

POST - When you want to send and mutate some data in server.

PUT -

- Replaces the entire resource with a new version
- Requires sending the entire updated resource, even if only a few fields have changed
- Can be thought of as "update and replace"

Example: Updating a user's profile with new name, email, and address using PUT would require sending all three fields, even if only the name changed.

PATCH -

- Updates only the specified fields, leaving others unchanged
- Only requires sending the changed fields
- Can be thought of as "update and merge"

Example: Updating a user's profile with only a new name using PATCH would only require sending the new name, leaving the email and address unchanged.

DELETE - When you want to delete some data from server.

*/