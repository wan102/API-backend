module.exports = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "id": "/comment",
    "title": "Comment",
    "description": "An comment",
    "type": "object",
    "properties": {
      "user_name": {
        "description": "Name of user",
        "type": "string"
      },
      "comment": {
        "description": "comment",
        "type": "string"
      },
      "animal_id": {
        "description": "ID of the animal",
        "type": "integer"
      },
    },
    "required": ["user_name", "comment", "animal_id"]
  }
  